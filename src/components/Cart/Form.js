import React from "react";
import "./form.css";
import useInput from "./input hooks/use-input";

function Form(props) {
  const {
    value: name,
    handleEnteredData: handleName,
    isValid: nameIsValid,
    onBlurChangeHandler: onNameBlurChangeHandler,
    reset: resetName,
    hasError : nameIsInvalid
  } = useInput((value) => value !== "");

  const {
    value: enteredStreet,
    handleEnteredData: handleStreet,  
    isValid: streetIsValid,
    onBlurChangeHandler: onStreetBlurChangeHandler,
    reset: resetStreet,
    hasError : streetIsInvalid
  } = useInput((value) => value !== ""  );

  const {
    value: enteredPostalCode,
    handleEnteredData: handlePostalCode,
    isValid: postalCodeIsValid,
    onBlurChangeHandler: onPostalCodeBlurChangeHandler,
    reset: resetPostalCode,
    hasError : postalCodeIsInvalid
  } = useInput((value) => value !== ""  );

  const {
    value: enteredCity,
    handleEnteredData: handleCity,
    isValid: cityIsValid,
    onBlurChangeHandler: onCityBlurChangeHandler,
    reset: resetCity,
    hasError : cityIsInvalid
  } = useInput((value) => value !== ""  );


  const onSubmitHandler = (event) => {
    event.preventDefault();
    onNameBlurChangeHandler();
    onStreetBlurChangeHandler();
    onCityBlurChangeHandler();
    onPostalCodeBlurChangeHandler();
    if (!nameIsValid) {
      return;
    }
    if (!streetIsValid){
      return
    }
    if(!cityIsValid){
      return
    }
    if(!postalCodeIsValid){
      return
    }
    resetName();
    resetStreet();
    resetCity();
    resetPostalCode(); 
    props.onConfirmOrder({
    name : name,
    city : enteredCity,
    postal : enteredPostalCode,
    street : enteredStreet
  })
  };


  return (
   
      <form onSubmit={onSubmitHandler} className='checkout-form'>
        <div className="checkout-field">
          <label htmlFor="address">Your Name</label>
          <input
            type="text"
            id="address"
            onChange={handleName}
            onBlur={onNameBlurChangeHandler}
            value={name}
          />
          {nameIsInvalid && (
            <p style={{ color: "red", fontSize : "12px" }}>Name cannot be empty</p>
          )}
        </div>
        <div className="checkout-field">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            onChange={handleStreet}
            onBlur={onStreetBlurChangeHandler}
            value={enteredStreet}
          />
          {streetIsInvalid && (
            <p style={{ color: "red",fontSize : "12px" }}>Sorry street is invalid</p>
          )}
        </div>
        <div className="checkout-field">
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            onChange={handlePostalCode}
            onBlur={onPostalCodeBlurChangeHandler}
            value={enteredPostalCode}
          />
          {postalCodeIsInvalid && (
            <p style={{ color: "red",fontSize : "12px" }}>Sorry postal code is invalid</p>
          )}
        </div>

        <div className="checkout-field">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            onChange={handleCity}
            onBlur={onCityBlurChangeHandler}
            value={enteredCity}
          />
          {cityIsInvalid && (
            <p style={{ color: "red",fontSize : "12px" }}>Sorry City is invalid</p>
          )}
        </div>
        <div className="checkout-button-container">
        <button className="submit-btn">Confirm</button>
        <button className="submit-btn" onClick={props.onClose}>Cancel</button>
        </div>
      </form>
    
  );
}

export default Form;
