import React, {useReducer, useEffect, useContext} from "react";
import cartReducer from './cartReducer'


// IT IS RECOMMENDED TO PLACE ALL CONTEXT RELATED CODE
// IN THE SAME FILE FOR EASIER ACCESSIBILITY

// DECLARING THE CONTEXT
// the default value would apply if a component tries consuming
// the context without a provider in a parent.
const CartContext = React.createContext(null);

let initialCart;
try{
  // nullish coalescing operator '??'
  // if the left-hand side is null or undefined, use the value on the right
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
}catch(e){
  console.error(e);
  initialCart = [];
}

export function CartProvider(props){
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    // anytime the cart changes, store it in the localStorage as a 
    // JSON string. Use 'cart' as the key
    useEffect(()=>{localStorage.setItem('cart',JSON.stringify(cart))}, [cart]);
    const contextValue = {
        cart,
        dispatch
    }
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error");
    }
    return context;
}