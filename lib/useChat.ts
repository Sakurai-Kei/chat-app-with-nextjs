import useSWR from "swr";

export function useChatGroup(_id: string) {
  const { data: group, mutate: mutateGroup } = useSWR(
    "/api/groups/instance/" + _id
  );

  return { group, mutateGroup };
}

export function useChatInstance(_id: string) {
  const { data: instance, mutate: mutateInstance } = useSWR(
    "/api/room-instances/instance/" + _id
  );

  return { instance, mutateInstance };
}
