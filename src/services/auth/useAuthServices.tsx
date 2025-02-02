import { useMutation } from "@tanstack/react-query";

import mutator from "../mutator";
import useMisc from "../../hooks/useMisc";
import { handleSuccess } from "../../utils/handler/success";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/auth";

export function useRegister() {
  return <div>useAuthServices</div>;
}

export function useLogin() {
  const { authRefetch } = useMisc();

  return useMutation({
    mutationFn: (data) => mutator("POST", "/auth/login", data),
    onSuccess: (data) => {
      if (data?.data?.accessToken) {
        setAccessToken(data.data.accessToken);
      }
      if (data?.data?.refreshToken) {
        setRefreshToken(data.data.refreshToken);
      }
      authRefetch();
    },
  });
}

export function useResendVerifyCode() {
  return useMutation({
    mutationFn: (data) =>
      mutator("POST", "/auth/resend-verification-mail", data),

    onSuccess: (data) => handleSuccess(data),
  });
}

export function useVerifyContact() {
  return useMutation(   
    { mutationFn:(data) => mutator("POST", "/auth/verify-email", data), 
    onSuccess: (data) => handleSuccess(data),
  });
}

export function useForgetPassword() {
  return useMutation(
    
    {
      mutationFn:(data) => mutator("POST", "/auth/forgot-password", data), 
    onSuccess: (data) => handleSuccess(data),
  });
}

export function useVerifyOtpReset() {
  return useMutation(
    {
    mutationFn:(data) => mutator("POST", "/auth/check-reset-password-code", data),
      onSuccess: (data) => handleSuccess(data),
    }
  );
}

export function useResetPassword() {
  return useMutation(
    {
    mutationFn:(data) => mutator("POST", "/auth/update-password-with-code", data),
      onSuccess: (data) => handleSuccess(data),
    }
  );
}

export function useChangePassword() {
  return useMutation(
    {
    mutationFn:(data: any) => mutator("POST", "/auth/change-password", data),
      onSuccess: (data) => handleSuccess(data),
    }
  );
}
