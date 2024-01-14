import SignInPage from "@/components/Page/SignInPage";
import RedirectIfAuthenticated from "@/app/(website)/auth/_components/RedirectIfAuthenticated";

export default async function LoginPage() {
    return (
        <RedirectIfAuthenticated>
            <SignInPage />
        </RedirectIfAuthenticated>
    );
}
