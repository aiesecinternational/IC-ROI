import './index.css';
import './tailwind.css'
import React, { useState } from 'react';
import entities from './IR_List'
import IC_Visual  from './assets/IC_Visual.png';
import Inside from './assets/Frame 366.png';
//import { useEffect } from 'react';

const products = [
  { id: 1, name: "iGV" },
  { id: 2, name: "iGT" },
  { id: 3, name: "oGV" },
  { id: 4, name: "oGTa" },
  { id: 5, name: "oGTe" },]

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
    
    <div className="home-page min-h-screen p-6 font-inter bg-gray-50 flex flex-col md:flex-row gap-6">
      {/* Left: Form Section */}

      <div className="user-input grid grid-cols-2 gap-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 font-kalam">IC Calculator</h2>

      {/* Entity Input - Left Side */}
        <div className="flex flex-col gap-2">
        <label htmlFor="entity" className="text-[#717171] text-lg font-medium ">Entity:</label>
        <select
          id="entity"
          value={EntityId ? entities.find((e) => e.id === EntityId)?.name || "" : ""}
          onChange={handleEntityChange}
          className="bg-white text-gray-900 border border-[#d0eaf4] rounded-lg p-2 shadow-md w-full focus:outline-none focus:ring-2 focus:ring-[#d0eaf4]"
        >
        <option value="">Select Entity</option>
        {entities.map((entity) => (
          <option key={entity.id} value={entity.name}>
            {entity.name}
        </option>
        ))}
        </select>
      </div>

      {/* Number of Delegates Input - Right Side */}
      <div className="flex flex-col gap-2">
        <label htmlFor="delegates" className="text-[#717171] text-lg font-medium">Number of delegates:</label>
        <input
          id="delegates"
          type="text"
          value={delegates}
          onChange={(e) => {
            const value = e.target.value.replace(/\s/g, "");
            if (!isNaN(value) && value !== "") {
              setDelegates(parseInt(value, 10));
            } else {
              setDelegates(0);
            }
          }}
          placeholder="0"
          className="bg-white border border-[#d0eaf4] rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-[#d0eaf4]"
        />
      </div>

    {/* Product Input - Right Side */}
    <div className="flex flex-col gap-2 col-start-2">
      <label htmlFor="product" className="text-[#717171] text-lg font-medium">Product:</label>
      <select
        id="product"
        value={productId ? products.find((p) => p.id === productId)?.name || "" : ""}
        onChange={handleProductChange}
        className="bg-white border border-[#d0eaf4] rounded-lg p-2 shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#d0eaf4]"
      >
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
    </div>

    {/* Delegate Fee Radio Buttons - Full Width */}
    <div className="flex flex-col gap-3 col-span-2 mt-4">
      <label className="flex items-center gap-2 text-[#717171] text-lg font-medium">
        <input
          type="radio"
          name="fullycovered"
          value="true"
          checked={fullycovered === true}
          onChange={() => setFullycovered(true)}
          className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
        />
        Full Coverage
      </label>
      <label className="flex items-center gap-2 text-[#717171] text-lg font-medium">
        <input
          type="radio"
          name="fullycovered"
          value="false"
          checked={fullycovered === false}
          onChange={() => setFullycovered(false)}
          className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
        />
        Only Fees Coverage
      </label>
    </div>

    {/* Button to submit the form */}
    <div className="col-span-2 flex justify-end mt-6">
      <button
        className="bg-[#f17424] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#e0631b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#f17424] focus:ring-offset-2"
        onClick={handleCalculate}
      >
        Calculate
      </button>
    </div>
  </div>


 {/* Right: Image Section with Stacked Images */}
<div className="md:w-1/2 flex items-center justify-center">
  {/* Image Container */}
  <div className="relative">
    {/* Base Image */}
    <img
      src={IC_Visual}
      alt="IC Visual"
      className="w-full max-w-[300px] h-auto"
    />
    
    {/* Overlay Image (adjust positioning/size as needed) */}
    <img
      src={Inside}
      alt="Overlay Badge"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12"
    />
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

