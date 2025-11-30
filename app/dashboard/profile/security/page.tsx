import { SecuritySection } from '@/components/Profile/MyProfile/Security/Security';
import { getSession } from '@/app/actions/auth';

export default async function SecurityPage() {
    const session = await getSession();
    return <SecuritySection user={session} />;
}
