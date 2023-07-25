import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Lesson from '../entities/Lesson';
import { useLangQueryStore } from "../store";

const useLessons = () => {
  const {quarterId} = useParams<{quarterId: string}>();
    const language = useLangQueryStore((state) => state.language); 
    const apiClient = new APIClient<Lesson>(`/v1/${language}/quarters/${quarterId}/lessons`);
    return useQuery({
        queryKey: [ language, quarterId,'lessons'],
        queryFn: apiClient.getAll
      });
}

export default useLessons;

