import RedirectIfNotAuthenticated from "@/app/(website)/auth/_components/RedirectIfNotAuthenticated";
import ProfileSettingsPage from "@/app/profile/_views/ProfileSettingsPage";

export default async function Profile() {

    return (
        <RedirectIfNotAuthenticated>
            <ProfileSettingsPage />
        </RedirectIfNotAuthenticated>
    );
}
