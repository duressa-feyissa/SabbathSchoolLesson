import { useQuery } from '@tanstack/react-query';
import Quarter from '../entities/Quarter';
import APIClient from '../services/apiClinetAPI';
import { useLangQueryStore } from '../store';


const useCurrentQuarter = ()  => {
    const language = useLangQueryStore((state) => state.language); 
    const apiClient = new APIClient<Quarter>(`/v1/${language}/quarters`);
    return useQuery({
        queryKey: [ language, 'current', 'quarter'],
        queryFn: () => apiClient.get('current' as string)
      });
};

export default useCurrentQuarter ;

