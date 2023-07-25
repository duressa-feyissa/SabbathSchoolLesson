import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Quarter from "../entities/Quarter";

const useQuarter = (lang: string, quarterId: string) => {
    const apiClient = new APIClient<Quarter>(`/v1/${lang}/quarters`);
    return useQuery({
        queryKey: ['quarters', quarterId],
        queryFn: () => apiClient.get(quarterId as string)
      });
}

export default useQuarter;
