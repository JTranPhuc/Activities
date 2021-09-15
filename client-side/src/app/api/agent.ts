import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../store/store";

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

axios.defaults.baseURL = "http://localhost:5000/api";
axios.interceptors.response.use(
  async (res) => {
    return res;
  },
  (err: AxiosError) => {
    const { data, status, config } = err.response!;
    console.log(err.response);
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        const modalStateErrors = [];
        if (data.errors) {
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        // toast.error("Not found");
        history.push("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

const responseBody = <T>(res: AxiosResponse<T>) => res.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`activities/${id}`),
  create: (activity: Activity) => request.post<void>("/activities", activity),
  update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`),
};

const agent = {
  activities,
};

export default agent;
