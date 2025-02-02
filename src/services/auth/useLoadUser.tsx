import { useQuery } from "@tanstack/react-query";

import fetcher from "../feature";
import { getAccessToken } from "../../utils/auth";
import queryKey from "../../constants/reactQuery";

export default function useLoadUser() {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: [queryKey?.auth?.user],
    queryFn: () => fetcher(`/auth/my-profile`),
    enabled: !!accessToken,
  });
}
