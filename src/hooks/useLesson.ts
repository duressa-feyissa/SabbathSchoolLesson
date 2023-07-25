import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Lesson from '../entities/Lesson';

const useLesson = (lang: string, quarterId: string, lessonId: string) => {
    const apiClient = new APIClient<Lesson>(`/v1/${lang}/quarters/${quarterId}/lessons`);
    return useQuery({
        queryKey: [ lang, quarterId,'lessons', lessonId],
        queryFn: () => apiClient.get(lessonId)
      });
}

export default useLesson;

