import useSWR from "swr";

export default function useChatGroup(_id: string) {
  const { data: group, mutate: mutateGroup } = useSWR(
    "/api/groups/instance/" + _id
  );

  return { group, mutateGroup };
}
