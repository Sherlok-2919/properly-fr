import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getUser } from './db';

export { getUser, createUser } from './db';

// Use a fixed secret so Middleware (Edge) and Server Actions (Node) share it.
// In a real app, this should be in .env
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

// Used by Server Components/Actions (Node.js) - Checks DB
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
