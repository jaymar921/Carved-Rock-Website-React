import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Routes, Route} from 'react-router-dom';
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

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
/*
  Custom useContext hook benefits:
  1. Easier to consume
  2. Protects the context
  3. Can display helpful errors if misused
*/

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route path='/:category/:id' element={<Detail/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/checkout' element={<Checkout/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
