import React, { useState } from "react";
import { saveShippingAddress } from "./services/shippingService";

const STATUS = {
  IDLE: 'IDLE',
  SUBMITTED: 'SUBMITTED',
  SUBMITTING: 'SUBMITTING',
  COMPLETED: 'COMPLETED'
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout({ cart, emptyCart }) {
  // States
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);
  const [touched, setTouched] = useState({});

  // Derived State
  const errors = getErrors(address);
   // if errors is an empty object, then the form is valid
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    e.persist(); // persist the event
    setAddress((currentAddress) => {
      return {
        ...currentAddress,
        // set the address to a copy of the current address.
        // use the input's id to determine which property to set 
        // (using the computed property syntax)
        [e.target.id]: e.target.value
      }
    })
  }

  function handleBlur(event) {
    event.persist(); // persist the event
    setTouched((current) => {
      return {...current, [event.target.id]:true}
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if(isValid){
      try{
        await saveShippingAddress(address);
        emptyCart();
        setStatus(STATUS.COMPLETED);
      }catch(e){
        setSaveError(e);
      }
    }else{
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address){
    const result = {};
    if(!address.city) result.city = 'City is required';
    if(!address.country) result.country = 'Country is required';
    return result;
  }

  if(saveError) throw saveError;
  if(status === STATUS.COMPLETED){
    return <h1>Thanks for shopping!</h1>
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key)=>{
              return <li key={key}>{errors[key]}</li>
            })}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Philippines">Philippines</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status===STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
