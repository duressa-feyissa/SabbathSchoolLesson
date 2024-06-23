import { useQuery } from "@tanstack/react-query";
import { LessonDetails } from "../entities/Lesson";
import APIClient from "../services/apiClinetAPI";
import { useLangQueryStore } from "../store";

const useLesson = (quarterId: string, lessonId: string) => {
  const lang = useLangQueryStore((state) => state.language);
  const apiClient = new APIClient<LessonDetails>(
    `/${lang}/quarterlies/${quarterId}/lessons`
  );
  return useQuery({
    queryKey: [lang, quarterId, "lessons", lessonId],
    queryFn: () => apiClient.get(`${lessonId}/index.json` as string),
  });
};

export default useLesson;
