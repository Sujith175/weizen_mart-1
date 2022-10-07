import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
const initialState = {
	cartItems: localStorage.getItem("cartItems") 
	? JSON.parse(localStorage.getItem("cartItems")):[],
	loading: "idle",
	cartTotalQuantity:0,
	cartTotalAmount:0, 
};

// export const fetchUserById = createAsyncThunk(
// 	"users/fetchByIdStatus",
// 	async (userId, thunkAPI) => {
// 		try {
// 			console.log(curState.counter.value);
// 			return 10;
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue("err");
// 		}
// 	}
// );

const CartSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addItemToCart(state, action) {
			const itemIndex = state.cartItems.findIndex(
				(item)=>item._id === action.payload._id);
				if(itemIndex>=0){
					state.cartItems[itemIndex].cartQuantity += 1;
					toast.info(`Increased ${action.payload.productName} Quantity`,{
						autoClose: 2500,
					});
				}else{
			const tempProduct = {...action.payload,cartQuantity:1};
			state.cartItems.push(tempProduct);
			toast.success(`${action.payload.productName} Added to cart`,{
				autoClose: 2500,
			});
		}
		localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
		},
	},

	// extraReducers: (builder) => {
	// 	// Add reducers for additional action types here, and handle loading state as needed
	// 	builder
	// 		.addCase(fetchUserById.pending, (state, action) => {
	// 			// Add user to the state array
	// 			state.loading = "pending";
	// 		})
	// 		.addCase(fetchUserById.rejected, (state, action) => {
	// 			// Add user to the state array
	// 			state.loading = "failed";
	// 		})
	// 		.addCase(fetchUserById.fulfilled, (state, action) => {
	// 			// Add user to the state array
	// 			state.loading = "succeeded";
	// 			state.entities = action.payload;
	// 		});
	// },
});

export const { addItemToCart } = CartSlice.actions;
export default CartSlice.reducer;
