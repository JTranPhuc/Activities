import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

axios.defaults.baseURL = "http://localhost:5000/api";
// axios.interceptors.response.use(async (res) => {
//   try {
//     await sleep(1000);
//     return res;
//   } catch (err) {
//     console.log(err);
//     return await Promise.reject(err);
//   }
// });

const responseBody = <T>(res: AxiosResponse<T>) => res.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`activities/${id}`),
  create: (activity: Activity) => request.post<void>("/activities", activity),
  update: (activity: Activity) =>
    request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`),
};

const agent = {
  activities,
};

export default agent;
