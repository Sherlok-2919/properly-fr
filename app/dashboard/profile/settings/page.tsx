import { SettingsSection } from '@/components/Profile/MyProfile/Settings/settings';
import { getSession } from '@/app/actions/auth';

export default async function SettingsPage() {
    const session = await getSession();
    return <SettingsSection user={session} />;
}
