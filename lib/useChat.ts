import useSWR from "swr";
import { IGroup, IRoomInstance } from "../interfaces/models";
import fetchJson from "./fetchJson";

export function useChatGroup(_id: string) {
  const { data: group, mutate: mutateGroup } = useSWR<IGroup>(
    "/api/v2/groups/" + _id,
    fetchJson,
    { refreshInterval: 0 }
  );

  return { group, mutateGroup };
}

export function useChatInstance(_id: string) {
  const { data: instance, mutate: mutateInstance } = useSWR<IRoomInstance>(
    "/api/v2/room-instances?instanceId=" + _id,
    fetchJson,
    { refreshInterval: 0 }
  );

  return { instance, mutateInstance };
}
