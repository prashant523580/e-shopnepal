
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductTypes } from "../../interface/productInterface";
interface StateTypes{
    products: any
}
const initialState : StateTypes = {
   products  : {}
}
const productReducer = createSlice({
    name:"poroducts",
    initialState,
    reducers:{
        getProducts(state,action: PayloadAction){
                state.products = action.payload
        }
    },
})

export const {getProducts} = productReducer.actions
export default productReducer.reducer;