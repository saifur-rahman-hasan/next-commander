"use client";

import useAuth from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import useUserManagerStore from "@/services/UserManager/Hooks/useUserManagerStore";
import Dump from "@/components/utils/Dump";

const HomePage = () => {
  const { user } = useAuth();
  const {isAdmin} = useUserManagerStore()

  return (
    <div>
      <h1>Home Page</h1>

        <Dump data={isAdmin} />

      {user?.name ? (
        <>
          <p>
            Hello, <strong>{user.name}</strong>!
          </p>
          <p>
            You are logged in with <strong>{user.email}</strong>.
          </p>
          <p>
            You are a <strong>{user.role}</strong>.
          </p>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default HomePage;
