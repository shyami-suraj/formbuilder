import axiosInstance from "../axiosInstances"; 

export default function fetcher(url: string) {
  return axiosInstance.get(url).then((res) => res.data);
}

 