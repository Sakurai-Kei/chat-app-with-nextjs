import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { UserCookie } from "./withSession";
import fetchJson from "./fetchJson";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<UserCookie>(
    "/api/auth-state",
    fetchJson,
    { revalidateOnMount: true }
  );

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
