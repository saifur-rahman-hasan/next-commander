// hooks/useAuth.ts
import axios from "@/lib/axios";
import {signOut, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  user: any; // Consider replacing 'any' with the actual expected user object shape
  accessToken: string | null;
  loading: boolean;
}

const useAuth = (): UseAuthReturn => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [authUserData, setAuthUserData] = useState<any>(null);

  const { data: session, status } = useSession();

  // TODO:
  //@ts-ignore
  const user = session?.user ? session.user : session?.data.session;

  const loading = status === "loading";

  useEffect(() => {
    // If session changes, we either fetch the new access token or clear the existing one
    if (session) {
      // console.log("session: ", session.session?.user);
      // @ts-ignore
      const token = session.accessToken as string; // Assuming the token is stored here, might depend on your auth provider
      setAccessToken(token);

      // Here, you'd also make the verification request using the token,
      // if necessary (e.g., by calling an API route or external service).
      // This example doesn't perform an actual request, but you'd include your logic.
      // If the token is verified, nothing happens; if not, the user is logged out.

      // For demonstration, let's assume we have a function 'verifyToken' that returns a promise that resolves to 'true' if the token is valid.
      const verifyToken = async (token: string) => {
        try {
          const authUserData: any = await axios
            .get("/auth/user")
            .then((res) => res.data.data);

          // debugLog('authUserData', authUserData)

          const isVerified = !!authUserData?.id;

          setAuthUserData(authUserData);

          return Promise.resolve(isVerified);
        } catch (e) {
          return Promise.resolve(false); // Placeholder for demonstration
        }

        // Call your API or external service here for actual verification
        // return await someApi.verifyToken(token);
      };

      verifyToken(token).then((isValid) => {
        if (!isValid) {
          signOut({
          	callbackUrl: "/auth/login",
          }); // signs the user out if the token is invalid

        } else {
        }
        // if token is valid, we are good to go
      });
    } else {
      setAccessToken(null); // Clear access token if session is not available
    }
  }, [router, session]);

  return {
    user: authUserData,
    accessToken,
    loading,
  };
};

export default useAuth;
