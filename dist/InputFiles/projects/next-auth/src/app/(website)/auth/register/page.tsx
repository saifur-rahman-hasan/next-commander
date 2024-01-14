import SignUpPage from "@/components/Page/SignUpPage";
import RedirectIfAuthenticated from "@/app/(website)/auth/_components/RedirectIfAuthenticated";

export default function RegisterPage() {
  return (
    <RedirectIfAuthenticated>
        <SignUpPage />
    </RedirectIfAuthenticated>
  );
}

