import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { UserCookie } from "./withSession";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } =
    useSWR<UserCookie>("/api/auth-state");

  useEffect(() => {
    if (!redirectTo || !user) return;
    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
