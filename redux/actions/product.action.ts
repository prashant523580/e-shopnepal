import { getProducts } from "../reducers/product.reducer";
import { AppDispatch } from "../store";
import { productConstants } from "./constant";
interface GetAllProductTypes {
    type: typeof productConstants.GET_ALL_PRODUCTS,
    payload: any
}
export const getAllProducts  = () => {

    return async (dispatch: AppDispatch) =>{
        let res = await fetch(`/api/products`);
        let data = await res.json();
        // console.log(data)
        dispatch(getProducts(data.products))
    }
}