export type User = {
    email: string;
    password: string;
    name: string;
    uniqueId: string;
};

// In-Memory User Store with global persistence for dev
const globalForUsers = globalThis as unknown as { users: User[] };

const users: User[] = globalForUsers.users || [
    {
        email: 'demo@example.com',
        password: 'password123',
        name: 'Demo User',
        uniqueId: 'DEMO-1234-5678'
    }
];

if (process.env.NODE_ENV !== 'production') globalForUsers.users = users;

export async function getUser(email: string) {
    return users.find((u) => u.email === email);
}

export async function createUser(email: string, password: string, name: string) {
    const existing = users.find((u) => u.email === email);
    if (existing) throw new Error('User already exists');

    // Generate a random unique ID for the ephemeral session
    const uniqueId = 'USR-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const newUser = { email, password, name, uniqueId };
    users.push(newUser);
    return newUser;
}

export async function updateUser(email: string, updates: Partial<User>) {
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) throw new Error('User not found');

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    return updatedUser;
}
