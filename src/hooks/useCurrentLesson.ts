import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Lesson from '../entities/Lesson';
import { useLangQueryStore } from "../store";

const useCurrentLesson = () => {
    const language = useLangQueryStore((state)=>state.language);
    const apiClient = new APIClient<Lesson>(`/v1/${language}`);
    return useQuery({
        queryKey: [ language, 'current-lesson'],
        queryFn: () => apiClient.get('current-lesson')
      });
}

export default useCurrentLesson;

