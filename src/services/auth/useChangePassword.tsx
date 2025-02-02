import { useMutation } from "@tanstack/react-query";

import mutator from "../mutator";
import { handleSuccess } from "../../utils/handler/success";

export default function useChangePassword() {
  return useMutation(
    (data: any) => mutator("POST", "/auth/change-password", data),
    {
      onSuccess: (data) => handleSuccess(data),
    }
  );
}
