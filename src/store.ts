import { create } from "zustand";

interface QuarterQuery {
  sortOrder?: string;
  searchText?: string;
}

interface QuarterQueryStore {
  quarterQuery: QuarterQuery;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  getSearchedText: () => string | undefined;
  getSortOrder: () => string | undefined;
}

interface LanguageQueryStore {
  language: string;
  setLanguageQuery: (lang: string) => void;
}

export const useLangQueryStore = create<LanguageQueryStore>((set) => ({
  language: (localStorage.getItem("lang") as string) || "am",
  setLanguageQuery: (lang) => set({ language: lang }),
}));

export const useQuarterQueryStore = create<QuarterQueryStore>((set, get) => ({
  quarterQuery: {},
  setSearchText: (searchText) =>
    set((store) => ({
      quarterQuery: {
        ...store.quarterQuery,
        searchText,
      },
    })),
  setSortOrder: (sortOrder) =>
    set((store) => ({
      quarterQuery: {
        ...store.quarterQuery,
        sortOrder,
      },
    })),
  getSortOrder: () => {
    return get().quarterQuery.sortOrder;
  },
  getSearchedText: () => {
    return get().quarterQuery.searchText;
  },
}));
