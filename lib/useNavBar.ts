import useSWR from "swr";
import { IUser } from "../interfaces/models";
import fetchJson from "./fetchJson";

export default function useNavBar(userId: string) {
  const { data: user, mutate: mutateUser } = useSWR<IUser>(
    "/api/v2/users/" + userId,
    fetchJson,
    { refreshInterval: 10000 }
  );

  return { user, mutateUser };
}
