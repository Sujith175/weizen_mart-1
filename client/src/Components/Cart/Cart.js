import React,{useReducer,useContext,createContext} from "react";

const cartstateContext = createContext()
const CartDispatchContext = createContext()
const reducer = (state,action)=>{
    switch(action.type){
        default:
            throw new Error(`unknown action ${action.type}`)
    }
}


export const CartProvider = ({childern})=>{
    const [state,dispatch]=useReducer(reducer,[]);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <cartstateContext.Provider value={state}>
                {childern}
            </cartstateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart=()=>useContext(cartstateContext)
export const useDispatchCart=()=>useContext(CartDispatchContext)