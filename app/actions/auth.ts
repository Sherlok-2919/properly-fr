'use server';

import { createUser, getUser, updateUser } from '@/lib/db';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'ephemeral-session-secret-key-1234567890'
);

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 3600
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const email = payload.email as string;

    // Verify user exists in memory (enforces ephemeral nature)
    const user = await getUser(email);
    if (!user) return null;

    return {
      email,
      name: user.name,
      uniqueId: user.uniqueId
    };
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const user = await getUser(email);
  if (!user || user.password !== password) {
    return { error: 'Invalid email or password' };
  }

  await createSession(email);
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    return { error: 'Name, email, and password are required' };
  }

  try {
    await createUser(email, password, name);
    await createSession(email);
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : 'An error occurred' };
  }

  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/auth/login');
}

export async function getSessionAction() {
  return await getSession();
}

export async function updateProfileAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Not authenticated' };

  const name = formData.get('firstName') as string + ' ' + formData.get('lastName') as string;
  const email = formData.get('email') as string;

  // Clean up name (remove ' null' if only one name provided or handle splitting properly)
  // The form has firstName and lastName. The DB has 'name'.
  // I'll just join them.
  const fullName = `${formData.get('firstName')} ${formData.get('lastName')}`.trim();

  try {
    await updateUser(session.email, { name: fullName, email });

    // If email changed, update session
    if (email !== session.email) {
      await createSession(email);
    }

    revalidatePath('/dashboard/profile', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update profile' };
  }
}