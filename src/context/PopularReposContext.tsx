import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Repo } from "../types";
import { fetchPopularRepos } from "../api";
type State = {
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  repos: Repo[];
  selectedLanguage: string;
};
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_REPOS"; payload: Repo[] }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_LANGUAGE"; payload: string };
type ContextTypes = {
  getPopularRepos: () => Promise<void>;
  state: State;
  dispatch: Dispatch<Action>;
};
const INITIAL_STATE = {
  loading: true,
  error: "",
  page: 1,
  totalPages: 1,
  repos: [],
  selectedLanguage: "",
};
export const PopularReposContext = createContext<ContextTypes | undefined>(
  undefined
);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_REPOS":
      return { ...state, repos: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    case "SET_LANGUAGE":
      return { ...state, selectedLanguage: action.payload, page: 1 };
    default:
      return state;
  }
}

export const PopularReposContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { page, selectedLanguage } = state;
  const getPopularRepos = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      const response = await fetchPopularRepos(page, selectedLanguage);
      dispatch({ type: "SET_REPOS", payload: response.data.items });
      const totalPages = Math.ceil(response.data.total_count / 30);
      if (totalPages) {
        dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error getting trending repositories",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  return (
    <PopularReposContext.Provider
      value={{
        getPopularRepos,
        state,
        dispatch,
      }}
    >
      {children}
    </PopularReposContext.Provider>
  );
};
