import useSWR from "swr";
import { IGroup, IRoomInstance, IUser } from "../interfaces/models";
import fetchJson from "./fetchJson";

export default function useNavBar(_id: string) {
  const { data: user, mutate: mutateUser } = useSWR<IUser>(
    "/api/users/" + _id,
    fetchJson,
    { refreshInterval: 10000 }
  );
  const { data: roomInstances, mutate: mutateRoomInstances } = useSWR<
    IRoomInstance[]
  >("/api/room-instances/" + _id, fetchJson, { refreshInterval: 10000 });
  const { data: groups, mutate: mutateGroups } = useSWR<IGroup[]>(
    "/api/groups/" + _id,
    fetchJson,
    { refreshInterval: 10000 }
  );

  const navBar = {
    user,
    roomInstances,
    groups,
  };

  const mutateNavBar = {
    mutateUser,
    mutateRoomInstances,
    mutateGroups,
  };

  return { navBar, mutateNavBar };
}
