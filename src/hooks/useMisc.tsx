import { useOutletContext } from "react-router-dom";
import { ADMIN } from "../constants/useRoles";

type Role =  typeof ADMIN 
type OutletContextType = {
  authLoading: boolean;
  authFetchStatus: "fetching" | "paused" | "idle";
  authRefetch: () => void;
  authData:
    | undefined
    | {
        title: string;
        message: string;
        data: {
          _id: string;
          email: string;
          contactNumber: string;
          fullName: string;
          status: string; 
          image: string; 
          userType:Role;
        };
      };
  authLogout: () => void;
  isNotificationOpen: boolean;
  openNotification: () => void;
  closeNotification: () => void;
};

export default function useMisc() {
  return useOutletContext<OutletContextType>();
}
