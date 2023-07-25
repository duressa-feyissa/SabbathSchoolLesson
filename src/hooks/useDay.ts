import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Day from '../entities/day';
import { useLangQueryStore } from "../store";



const useDay = (quarterId:string, lessonId:string, dayId: string) => {
    const language = useLangQueryStore((state) => state.language); 
    const apiClient = new APIClient<Day>(`/v1/${language}/quarters/${quarterId}/lessons/${lessonId}/days`);
    return useQuery({
        queryKey: [ language, quarterId,'lessons', lessonId,'days', dayId],
        queryFn: () => apiClient.get(dayId as string)
      });
}

export default useDay;

