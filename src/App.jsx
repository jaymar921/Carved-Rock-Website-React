import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Routes, Route} from 'react-router-dom';
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState(() => {
    try{
      // nullish coalescing operator '??'
      // if the left-hand side is null or undefined, use the value on the right
      return JSON.parse(localStorage.getItem('cart')) ?? [];
    }catch(e){
      console.error(e);
      return [];
    }
  });

  // anytime the cart changes, store it in the localStorage as a 
  // JSON string. Use 'cart' as the key
  useEffect(()=>{localStorage.setItem('cart',JSON.stringify(cart))}, [cart]);

  function addToCart(id, sku){
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);

      //itemInCart.quantity++; // DONT DO THIS; WILL CAUSE BUGS
      if(itemInCart){
        // return new array with the mmatching item replaced
        return items.map( (i) => 
        i.sku === sku ? {...i, quantity: i.quantity + 1} : i);
      }else{
        // return new array with the new item appended
        return [...items, { id, sku, quantity: 1}];
      }
    })
  }

  function updateQuantity(sku, quantity){
    setCart((items) => {
     return (quantity === 0) 
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? {...i, quantity} : i));
    });
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Detail addToCart={addToCart} />} />
            <Route path='/cart' element={<Cart cart={cart} updateQuantity={updateQuantity}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
