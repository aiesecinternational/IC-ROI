import './index.css';
import './tailwind.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import entities from './IR_List'
import Footer from './components/footer';
import RegisteredEntities from './components/RegisteredEys';
import GIDTeam from './components/GIDTeam';
import Calculations from './components/Calculations';

import IC_Visual  from './assets/IC_Visual.png';
import Inside from './assets/Frame 366.png';


const products = [
  { id: 1, name: "iGV" },
  { id: 2, name: "iGTa" },
  { id: 3, name: "iGTe" },
  { id: 4, name: "oGV" },
  { id: 5, name: "oGTa" },
  { id: 6, name: "oGTe" },]

const App = () => {
  const [EntityId,setEntityId] = useState("");
  const [delegates,setDelegates] = useState(0);
  const [fullycovered,setFullycovered] = useState(null);
  const [showCalculations,setShowCalculations] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);


  const handleEntityChange = (e) => {
    const selectedEntity = entities.find(entity => entity.name === e.target.value);
    if (selectedEntity) {
      setEntityId(selectedEntity.id);  
    } else {
      setEntityId(0);  
    }
  };

  const handleCalculate = () => {
    if (!EntityId || !selectedProducts.length || delegates === 0 || fullycovered === null) {
      alert("All fields required!");
      return;
    }
    setShowCalculations(true);
  };

  const handleProductToggle = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Router>
      <div className="home-page min-h-screen p-6 font-inter bg-gray-50">
        <Routes>
          <Route path="/" element={
            <div className="flex-1 overflow-y-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
              {" "}
              <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-8">
                {/* Left: Form Section */}
                <div className="user-input bg-white p-8 rounded-xl shadow-lg lg:w-2/3 mx-10">
                  <h2 className="text-3xl font-extrabold mb-8 text-gray-800 font-kalam">
                    IC CALCULATOR
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Column: Entity and Delegate Fee Coverage */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="entity" className="text-[#717171] text-lg font-medium ">
                        Entity:
                      </label>
                      <select
                        id="entity"
                        value={EntityId ? entities.find((e) => e.id === EntityId)?.name || "" : ""}
                        onChange={handleEntityChange}
                        className="bg-white text-black border border-[#d0eaf4] rounded-lg p-2 shadow-md w-full focus:outline-none focus:ring-2 focus:ring-[#d0eaf4]"
                      >
                        <option value="">Select Entity</option>
                        {entities.map((entity) => (
                          <option key={entity.id} value={entity.name}>
                            {entity.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="coverage" className="text-[#717171] text-lg font-medium">
                        Coverage:
                      </label>
                      <select
                        id="coverage"
                        value={fullycovered !== null ? fullycovered.toString() : ""}
                        onChange={(e) => setFullycovered(e.target.value === "true")}
                        className="bg-white text-black border border-[#d0eaf4] rounded-lg p-2 shadow-md w-full focus:outline-none focus:ring-2 focus:ring-[#d0eaf4]"
                      >
                        <option value="">Select</option>
                        <option value="true">Full Coverage</option>
                        <option value="false">Only Fees Coverage</option>
                      </select>
                    </div>
                    {/* Right Column: Delegate Count and Product */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="delegates" className="text-[#717171] text-lg font-medium">
                        Number of Delegates
                      </label>
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
                      <label className="text-[#717171] text-lg font-medium">
                        Products:
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {products.map((product) => (
                          <label key={product.id} className={`flex items-center gap-2 text-[#717171] text-lg font-medium ${product.name.startsWith('iG') ? 'col-start-1' : 'col-start-2'}`}>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleProductToggle(product.id)}
                              className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
                            />
                            {product.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-end mt-6">
                    <button
                      className="bg-[#f17424] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#e0631b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#f17424] focus:ring-offset-2"
                      onClick={handleCalculate}
                    >
                      Calculate
                    </button>
                  </div>
                </div>

                {/* Right: Image Section */}
                <div className="md:w-1/3 flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={IC_Visual}
                      alt="IC Visual"
                      className="w-full max-w-[400px] h-auto"
                    />

                    <img
                      src={Inside}
                      alt="Overlay Badge"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12"
                    />
                  </div>
                </div>
              </div>

              {/* Registered Entities Section - Added below main content */}
              {showCalculations && <Calculations selectedProducts={selectedProducts} />}
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold font-figtree text-gray-800 mb-2">
                  GET YOUR IR GAME STARTED
                </h2>
                <p className="text-gray-600 font-figtree mt-2 mb-4">
                  Check the list of the entities that have already registered
                </p>
                <RegisteredEntities />
              </div>
            </div>
          } />
          <Route path="/GIDTeam" element={<GIDTeam />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

