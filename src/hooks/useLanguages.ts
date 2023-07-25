import { useQuery } from "@tanstack/react-query";
import Language from "../entities/Language";
import APIClient from "../services/apiClinetAPI";

const apiClient = new APIClient<Language>('/v1');

const useLanguages = () =>
  useQuery({
    queryKey: ['language'],
    queryFn: apiClient.getAll
  });

export default useLanguages;
