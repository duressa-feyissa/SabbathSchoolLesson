import { useQuery } from "@tanstack/react-query";
import Quarter from "../entities/Quarter";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";

const useQuarters = () => {
  const language = useLangQueryStore((state) => state.language);
  let path = `/${language}/quarterlies/index.json`;
  const apiClient = new APIClient<Quarter>(path);
  return useQuery({
    queryKey: ["quarters", language],
    queryFn: apiClient.getAll,
  });
};

export default useQuarters;
