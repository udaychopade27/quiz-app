import { toast } from "react-toastify";
import { toastifyConfig } from "./config";

export function errorHandler({ error }: { error: any; }): void {
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message, toastifyConfig);
  } else {
    toast.error("Something went wrong", toastifyConfig);
  }
}
