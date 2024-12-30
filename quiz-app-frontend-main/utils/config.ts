import { ToastOptions } from "react-toastify";

 const toastifyConfig: ToastOptions<{}> = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
 const toastifyConfigPlay: ToastOptions<{}> = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

let api_url_base = "https://quiz-express-production.up.railway.app"
let api_url = api_url_base + "/api/v1"

// api_url="http://localhost:4343"

export { toastifyConfig, api_url , api_url_base, toastifyConfigPlay}