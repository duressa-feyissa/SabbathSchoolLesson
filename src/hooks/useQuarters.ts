import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClinetAPI";
import Quarter from "../entities/Quarter";
import { useLangQueryStore, useQuarterQueryStore } from "../store";

const useQuarters = () => {
    const language = useLangQueryStore((state) => state.language);
    const quarterQuery = useQuarterQueryStore((state) => state.quarterQuery);
    const sortOrder = quarterQuery.sortOrder ?  quarterQuery.sortOrder : 'desc';
    let path = `/v1/${language}/quarters?sortOrder=${sortOrder}`;
    if (quarterQuery.searchText)
      path += `&search=${quarterQuery.searchText}`;
    const apiClient = new APIClient<Quarter>(path);
    return useQuery({
        queryKey: ['quarters', quarterQuery],
        queryFn: apiClient.getAll
      });
}

export default useQuarters;
