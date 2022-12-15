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
		removeFromCart(state,action){
			const nextCartItems = state.cartItems.filter(
				cartItems=> cartItems._id !== action.payload._id
			)
			state.cartItems = nextCartItems;
			localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
			toast.error(`${action.payload.productName} Removed from cart`,{
				autoClose: 2500,
			});
		},
		decreaseCart(state,action){
			const itemIndex = state.cartItems.findIndex(
				cartItems => cartItems._id === action.payload._id
			)
			if(state.cartItems[itemIndex].cartQuantity>1){
				state.cartItems[itemIndex].cartQuantity -=1
				toast.info(`Decreased ${action.payload.productName} cart quantity`,{
					autoClose: 2500,
				});
			} else if(state.cartItems[itemIndex].cartQuantity==1){
				const nextCartItems = state.cartItems.filter(
					cartItems=> cartItems._id !== action.payload._id
				)
				state.cartItems = nextCartItems;
				toast.error(`${action.payload.productName} Removed from cart`,{
					autoClose: 2500,
				});
			}
			localStorage.setItem("cartItems",JSON.stringify(state.cartItems));

		},

	clearCart(state,action){
		state.cartItems = [];
		toast.error(`Cart Cleared`,{
			autoClose: 2500,
		});
		localStorage.setItem("cartItems",JSON.stringify(state.cartItems));

	},

	getTotals(state,action){
	let {total,quantity} =	state.cartItems.reduce((cartTotal,cartItems)=>{
			const {productPrice,cartQuantity} = cartItems;
			const itemTotal=productPrice*cartQuantity;
			cartTotal.total += itemTotal
			cartTotal.quantity += cartQuantity
			return cartTotal;
		},{
		total:0,
		quantity:0
	});
	state.cartTotalQuantity = quantity;
	state.cartTotalAmount = total;
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

export const { addItemToCart,removeFromCart,decreaseCart,clearCart,getTotals } = CartSlice.actions;
export default CartSlice.reducer;
