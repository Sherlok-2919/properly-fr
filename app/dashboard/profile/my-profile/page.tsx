import { DashboardContent } from "@/components/Profile/MyProfile/MyProfile"
import { getSession } from "@/app/actions/auth"

export default async function MyProfilePage() {
    const session = await getSession()
    return <DashboardContent activeSection="profile" user={session || undefined} />
}
