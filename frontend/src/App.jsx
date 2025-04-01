import './App.css';
import React, { useState } from 'react';
//import { useEffect } from 'react';

const entities = [
  { id: 1, name: "Entity 1" },
  { id: 2, name: "Entity 2" },
  { id: 3, name: "Entity 3" },
  { id: 4, name: "Entity 4" },
  { id: 5, name: "Entity 5" },]

const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  { id: 4, name: "Product 4" },
  { id: 5, name: "Product 5" },]

const App = () => {
  const [EntityId,setEntityId] = useState("");
  const [productId,setProductId] = useState("");
  const [delegates,setDelegates] = useState(0);
  const [fullycovered,setFullycovered] = useState(null);
  const [showCalculations,setShowCalculations] = useState(false);

  const DELEGATE_FEE = 500; // Hardcoded delegate fee (USD)
  const FLIGHT_FEE = null;  // Hardcoded flight fee (USD) - can be null

  const handleEntityChange = (e) => {
    const selectedEntity = entities.find(entity => entity.name === e.target.value);
    if (selectedEntity) {
      setEntityId(selectedEntity.id);  
    } else {
      setEntityId(0);  
    }
  };

  const handleProductChange = (p) => {
    const selectedProduct = products.find(prod => prod.name === p.target.value);
    if (selectedProduct) {
      setProductId(selectedProduct.id);  
    } else {
      setProductId(0);  
    }
  };

  const handleCalculate = () => {
    if(!EntityId|| !productId ||delegates===""||fullycovered==="null"){
      alert("All fields required!");
      return;
    }
    setShowCalculations(true);
  };

  return (
    <div className="home-page">
      <div className="user-input">
        {/* Input entity using dropdown */}
        <label htmlFor="entity">Entity: 
        <select value={EntityId ? entities.find(e => e.id === EntityId)?.name || "" : ""} onChange={handleEntityChange}>
            <option value = "">Select Entity</option>
            {entities.map((entity)=> (
              <option key = {entity.id} value={entity.name}>
                {entity.name}
              </option>
            ))}   
          </select>
          </label> 


        {/* Input number of delegates */}
        <label htmlFor="delegates">Number of delegates:
          <input 
            type="text" 
            value={delegates} 
            onChange={(e)=>{
              const value = e.target.value.replace(/\s/g, '');
              if (!isNaN(value) && value !== "" ) {
                setDelegates(parseInt(value,10));
              }else{
                setDelegates(0);
              }
            }} 
            //min = "0"
            placeholder='Enter number of delegates'></input>
        </label>

        {/* Input product using dropdown */}
        <label htmlFor="product">Product:
        <select value={productId ? products.find(p => p.id === productId)?.name || "" : ""} onChange={handleProductChange}>
            <option value = "">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        {/* Input fully covered or not*/}
        <label htmlFor='fullycovered'>
          <input 
            type="radio" 
            name="fullycovered"
            value="true"
            checked={fullycovered === true} 
            onChange={() => setFullycovered(true)}/>
            Fully Covered
        </label>
        <label htmlFor='fullycovered'>
          <input 
            type="radio" 
            name="fullycovered"
            value="false"
            checked={fullycovered === false} 
            onChange={() => setFullycovered(false)}/>
            Only Delegate Fee Covered
        </label>

        {/* Button to submit the form */}
        <div className='button-container'>
          <button className="button"onClick={handleCalculate}>Calculate</button>
        </div>

      </div>

      {/* Display the selected entity and product */}
      {(showCalculations &&
      <div className="calculations">
      <h3>Calculation Summary</h3>
          <p>Delegate Fee: ${DELEGATE_FEE}</p>
          <p>Flight Fee: {FLIGHT_FEE !== null ? `$${FLIGHT_FEE}` : "N/A"}</p>
          <p>Total Cost: ${DELEGATE_FEE + (FLIGHT_FEE || 0)}</p>
          <p>Product 1 Count: 10</p>
          <p>Product 2 Count: 10</p>
      </div>
      )}
    </div>
  );
}

export default App;
