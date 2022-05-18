import useSWR from "swr";
import { IGroup, IRoomInstance, IUser } from "../interfaces/models";

export default function useNavBar(_id: string) {
  const { data: user, mutate: mutateUser } = useSWR<IUser>("/api/users/" + _id);
  const { data: roomInstances, mutate: mutateRoomInstances } = useSWR<
    IRoomInstance[]
  >("/api/room-instances/" + _id);
  const { data: groups, mutate: mutateGroups } = useSWR<IGroup[]>(
    "/api/groups/" + _id
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
