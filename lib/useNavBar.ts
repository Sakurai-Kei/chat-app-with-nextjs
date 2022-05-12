import useSWR from "swr";

export default function useNavBar(_id: string) {
  const { data: user, mutate: mutateUser } = useSWR("/api/users/" + _id);
  const { data: roomInstances, mutate: mutateRoomInstances } = useSWR(
    "/api/room-instances/" + _id
  );
  const { data: groups, mutate: mutateGroups } = useSWR("/api/groups/" + _id);

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
