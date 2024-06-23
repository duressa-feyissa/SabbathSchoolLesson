import { useQuery } from "@tanstack/react-query";
import { CustomQuarter } from "../entities/Quarter";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";

const useQuarter = (lang: string, quarterId: string) => {
  const apiClient = new APIClient<CustomQuarter>(`/${lang}/quarterlies`);
  const language = useLangQueryStore((state) => state.language);
  return useQuery({
    queryKey: ["quarters", quarterId, language],
    queryFn: () => apiClient.get(`${quarterId}/index.json` as string),
  });
};

export default useQuarter;
