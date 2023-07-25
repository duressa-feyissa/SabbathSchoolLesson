import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sabbathschool.duresa.com.et/api/",
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
});

interface Response<T> {
  data: T;
  status: number;
}

const token = {
  "x-auth-token": <string>localStorage.getItem("token") || "",
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((response) => response.data);
  };

  get = (path: string) => {
    return axiosInstance.get<T>(`${this.endpoint}/${path}`).then((response) => response.data);
  };

  post = (data: T) => {
    return axiosInstance
      .post<Response<T>>(this.endpoint, data, {headers: token})
      .then((response) => {return {data: response.data, status: response.status} })
      .catch((error) => {
        const response = error.response as Response<string>;
        return {data: response.data, status: response.status};
      });
  };

  put = (path: string, data: T) => {
    return axiosInstance
      .put<Response<T>>(`${this.endpoint}/${path}`, data, {headers: token})
      .then((response) => {return {data: response.data, status: response.status} })
      .catch((error) => {
        const response = error.response as Response<string>;
        return {data: response.data, status: response.status};
      });
  };

  delete = (path: string) => {
    return axiosInstance
      .delete<Response<T>>(`${this.endpoint}/${path}`, {headers: token})
      .then((response) => {return {data: response.data, status: response.status} })
      .catch((error) => {
        const response = error.response as Response<string>;
        return {data: response.data, status: response.status};
      });
  };

}

export default APIClient;
