import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import rootReducers, { RootState } from "./reducers/index.reducer";


export const store = configureStore({
    reducer: rootReducers,
    middleware: [thunk]
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector