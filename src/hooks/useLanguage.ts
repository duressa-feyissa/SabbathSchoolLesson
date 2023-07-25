import { useQuery } from "@tanstack/react-query";
import Language from "../entities/Language";
import APIClient from "../services/apiClinetAPI";


const apiClient = new APIClient<Language>(`/v1`);
const useLanguage = (lang: string) =>
{
  return useQuery({
    queryKey: ['language', lang],
    queryFn: () => apiClient.get(lang)
  });
}

export default useLanguage;
