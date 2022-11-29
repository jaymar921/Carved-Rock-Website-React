import React, {useReducer, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Routes, Route} from 'react-router-dom';
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

/*

   useState (Good default) |  useReducer (Switch to as needed)
      - Easy to impelement |    More scalable for complex scenarios
       for most scenarios  |   - Many complex state transitions
      - Easy to learn      |   - Multiple sub-values
                           |   - Next state depends on the previous one
                           |   - Reason about the state in isolation
                           |   - Testable in isolation
                           |   - Reusable
*/
let initialCart;
try{
  // nullish coalescing operator '??'
  // if the left-hand side is null or undefined, use the value on the right
  initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
}catch(e){
  console.error(e);
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // anytime the cart changes, store it in the localStorage as a 
  // JSON string. Use 'cart' as the key
  useEffect(()=>{localStorage.setItem('cart',JSON.stringify(cart))}, [cart]);

  

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Detail dispatch={dispatch} />} />
            <Route path='/cart' element={<Cart cart={cart} dispatch={dispatch}/>} />
            <Route path='/checkout' element={<Checkout cart={cart} dispatch={dispatch}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
