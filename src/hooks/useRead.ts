import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Read from "../entities/read";


const useRead = (lang: string, quarterId: string, lessonId: string, dayId: string) => {
    const apiClient = new APIClient<Read>(`/v1/${lang}/quarters/${quarterId}/lessons/${lessonId}/days`);
    return useQuery({
        queryKey: ['read', quarterId, lessonId, dayId],
        queryFn: () => apiClient.get(`${dayId}/read` as string)
      });
}

export default useRead;
