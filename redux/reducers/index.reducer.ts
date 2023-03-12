import { combineReducers } from "redux";
import productReducer from "./product.reducer";

const rootReducers =combineReducers({
    products: productReducer
})

export type RootState =  ReturnType<typeof rootReducers>
export default rootReducers;