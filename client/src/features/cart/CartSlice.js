import {  createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import {toast} from "react-toastify";
let initialState = {
	cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
	loading: "idle",
	cartTotalQuantity:0,
	cartTotalAmount:0, 
};



// fetch("http://localhost:5000/getcartdetails/"+localStorage.getItem('user._id'), {
// 	method: "get",
// 	headers: {
// 	  "Content-Type": "application/json",
// 	},
//   }).then((response) => response.json())
//   .then((json) => {
// 	initialState = {
// 		cartItems: json.cart,
// 		loading: "idle",
// 		cartTotalQuantity:0,
// 		cartTotalAmount:0, 
// 	};
//   });

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
					
				}else{
			const tempProduct = {...action.payload,cartQuantity:1};
			state.cartItems.push(tempProduct);
			
		}
		localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
		},
		removeFromCart(state,action){
			const nextCartItems = state.cartItems.filter(
				cartItems=> cartItems._id !== action.payload._id
			)
			state.cartItems = nextCartItems;
			localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
			
		},
		decreaseCart(state,action){
			const itemIndex = state.cartItems.findIndex(
				cartItems => cartItems._id === action.payload._id
			)
			if(state.cartItems[itemIndex].producttQuantity>1){
				state.cartItems[itemIndex].productQuantity -=1
				
			} else if(state.cartItems[itemIndex].cartQuantity===1){
				const nextCartItems = state.cartItems.filter(
					cartItems=> cartItems._id !== action.payload._id
				)
				state.cartItems = nextCartItems;
				
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

export const { addItemToCart,removeFromCart,decreaseCart,clearCart,getTotals ,getItems} = CartSlice.actions;
export default CartSlice.reducer;
