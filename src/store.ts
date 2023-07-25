import { create } from "zustand";

interface QuarterQuery {
    sortOrder?: string;
    searchText?: string;
}

interface QuarterQueryStore {
    quarterQuery: QuarterQuery;
    setSortOrder: (sortOrder: string) => void;
    setSearchText: (searchText: string) => void;
}

interface LanguageQueryStore {
    language: string
    setLanguageQuery: (lang: string) => void;
}


export const useLangQueryStore = create<LanguageQueryStore> ((set) => ({
    language: localStorage.getItem('lang') as string || 'am' as string,
    setLanguageQuery: (lang) => set({ language: lang })

}));

export const useQuarterQueryStore = create<QuarterQueryStore> ((set) => ({
    quarterQuery: {},
    setSearchText: (searchText) => set({quarterQuery: { searchText }}),
    setSortOrder: (sortOrder) => set( store => ({quarterQuery: {
        ...store.quarterQuery, sortOrder
    }}))
}));
