import { useQuery } from "@tanstack/react-query";
import Day from "../entities/day";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";

const useDay = (quarterId: string, lessonId: string, dayId: string) => {
  const language = useLangQueryStore((state) => state.language);
  const apiClient = new APIClient<Day>(
    `/${language}/quarterlies/${quarterId}/lessons/${lessonId}/days`
  );
  return useQuery({
    queryKey: [language, quarterId, lessonId, dayId],
    queryFn: () => apiClient.get(`${dayId}/read/index.json` as string),
  });
};

export default useDay;
