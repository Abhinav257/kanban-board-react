import React, { createContext, useContext, useReducer, useEffect } from "react";

const GlobalStateContext = createContext();
const GlobalStateDispatchContext = createContext();

const initialState = {
  data: [],
  viewType: localStorage.getItem("viewType") || "status",
  isLoading: true
};

const FETCH_DATA = "FETCH_DATA";
const SET_LOADING = "SET_LOADING";
const SET_VIEW = "SET_VIEW";

function globalStateReducer(state, action) {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, data: action.payload, isLoading: false };
    case SET_VIEW:
      return { ...state, viewType: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true });

    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_DATA, payload: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function useGlobalDispatch() {
  return useContext(GlobalStateDispatchContext);
}
