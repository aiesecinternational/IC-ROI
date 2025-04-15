import "./index.css";
import "./tailwind.css";
import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Select from "react-select";

import entities from "./IR_List";
import Footer from "./components/footer";
import RegisteredEntities from "./components/RegisteredEys";
import GIDTeam from "./components/GIDTeam";
import Calculations from "./components/Calculations";
import Header from "./components/Header";
import roiCalculator from "./logic/roiCalculator.js";

import IC_Visual from "./assets/IC_Visual.png";
import Inside from "./assets/Frame 366.png";
import FooterImage from "./assets/Footer_image.png";

const products = [
  { id: 1, name: "iGV" },
  { id: 2, name: "iGTe" },
  { id: 3, name: "oGV" },
  { id: 4, name: "iGTa" },
  { id: 5, name: "oGTa" },
  { id: 6, name: "oGTe" },
];

const coverageOptions = [
  { value: true, label: "Full Coverage" },
  { value: false, label: "Only Fees Coverage" },
];

const App = () => {
  const [EntityId, setEntityId] = useState("");
  const [delegates, setDelegates] = useState(0);
  const [fullycovered, setFullycovered] = useState(null);
  const [showCalculations, setShowCalculations] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formError, setFormError] = useState(""); // State to store form error

  const [ICDelegateFee, setICDelegateFee] = useState(500);
  const [ICFlightFee, setICFlightFee] = useState(0);
  const [ICtotalCostPP, setICTotalCostPP] = useState(0);
  const [ICtotalCost, setICTotalCost] = useState(0);
  const [requiedProductCounts, setRequiedProductCounts] = useState([]);

  const calculationsRef = useRef(null);

  const entityOptions = entities.map((entity) => ({
    value: entity.id,
    label: entity.name,
  }));

  const handleEntityChange = (selectedOption) => {
    if (selectedOption) {
      setEntityId(selectedOption.value);
    } else {
      setEntityId(0);
    }
  };

  const handleCalculate = async () => {
    // Validate form fields
    if (
      !EntityId ||
      !selectedProducts.length ||
      delegates === 0 ||
      fullycovered === null
    ) {
      setFormError("Warning! All fields required!");
      return;
    }

    // Clear error if validation passes
    setFormError("");

    const { delegateFee, flightFee, totalCostPP, totalCost, productCounts } =
      await roiCalculator(EntityId, delegates, selectedProducts, fullycovered);

    setICDelegateFee(delegateFee);
    setICFlightFee(flightFee);
    setICTotalCostPP(totalCostPP);
    setICTotalCost(totalCost);
    setRequiedProductCounts(productCounts);
    setShowCalculations(true);

    // Scroll to the calculations section
    calculationsRef.current?.scrollIntoView({ behavior: "smooth" });
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
      <div className="home-page min-h-screen font-inter bg-gray-50 overflow-x-hidden">
        <Header />
        <div className="flex items-start justify-center min-h-screen p-6 -mt-12">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex-1 max-w-screen-2xl px-2 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-0 items-stretch mb-8">
                    {/* Form Section */}
                    <div className="user-input bg-white p-8 rounded-xl shadow-lg lg:w-3/5 mx-10 h-full flex flex-col justify-between">
                      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 font-kalam text-center">
                        IC ROI CALCULATOR
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Left Column: Entity and Delegate Fee Coverage */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="entity"
                            className="text-[#717171] text-lg font-medium"
                          >
                            Entity:
                          </label>
                          <Select
                            id="entity"
                            options={entityOptions}
                            onChange={handleEntityChange}
                            placeholder="Select or type entity"
                            className="w-full"
                            classNamePrefix="react-select"
                            isClearable
                          />

                          <div className="mt-8">
                            <label
                              htmlFor="coverage"
                              className="text-[#717171] text-lg font-medium"
                            >
                              Coverage:
                            </label>
                            <Select
                              id="coverage"
                              options={coverageOptions}
                              value={coverageOptions.find(
                                (option) => option.value === fullycovered
                              )}
                              onChange={(selectedOption) =>
                                setFullycovered(
                                  selectedOption ? selectedOption.value : null
                                )
                              }
                              placeholder="Select Coverage"
                              className="w-full"
                              classNamePrefix="react-select"
                              isClearable
                            />
                          </div>
                        </div>
                        {/* Right Column: Delegate Count and Product */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="delegates"
                            className="text-[#717171] text-lg font-medium"
                          >
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
                            className="w-full bg-white border border-[#d1d5db] rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d0eaf4] focus:border-[#d0eaf4] transition duration-200"
                          />
                          <div className="mt-8">
                            <label className="text-[#717171] text-lg font-medium">
                              Products:
                            </label>
                            <div className="grid grid-cols-2 gap-y-1.5 gap-x-6 mt-2">
                              {products.map((product) => (
                                <label
                                  key={product.id}
                                  className="flex items-center gap-1.5 text-[#717171] text-lg font-medium"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(
                                      product.id
                                    )}
                                    onChange={() =>
                                      handleProductToggle(product.id)
                                    }
                                    className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
                                  />
                                  {product.name}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Display Form Error */}
                      {formError && (
                        <div className="col-span-2 text-sm text-[#f17424] font-medium mt-4">
                          {formError}
                        </div>
                      )}
                      {selectedProducts.length > 1 && (
                        <div className="col-span-2 text-sm text-[#f17424] font-medium mt-4">
                          Note: When multiple products are selected, the
                          required number of approvals or realizations will be
                          provided for each product independently to meet the
                          overall target.
                        </div>
                      )}
                      <div className="col-span-2 flex justify-end mt-4">
                        <button
                          className="bg-[#f17424] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#e0631b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#f17424] focus:ring-offset-2"
                          onClick={handleCalculate}
                        >
                          Calculate
                        </button>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-2/5 items-center h-full flex flex-col justify-between">
                      <div className="relative flex items-center h-full">
                        <img
                          src={IC_Visual}
                          alt="IC Visual"
                          className="w-full h-full object-contain"
                        />
                        <img
                          src={Inside}
                          alt="Overlay Badge"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Registered Entities Section */}
                  {showCalculations && (
                    <div ref={calculationsRef}>
                      <Calculations
                        calculations={{
                          ICDelegateFee,
                          ICFlightFee,
                          ICtotalCostPP,
                          ICtotalCost,
                          requiedProductCounts,
                          delegates,
                        }}
                        productCounts={requiedProductCounts}
                      />
                    </div>
                  )}
                  <div className="mt-24 text-center">
                    <h2 className="text-2xl font-bold font-figtree text-gray-800 mb-2">
                      GET YOUR IR GAME STARTED
                    </h2>
                    <p className="text-gray-600 font-figtree mt-2 mb-4">
                      Check the list of the entities that have already
                      registered
                    </p>
                    <RegisteredEntities />
                  </div>
                </div>
              }
            />
            <Route path="/GIDTeam" element={<GIDTeam />} />
          </Routes>
        </div>

        {/* Footer Section */}
        <div className="relative">
          <img
            src={FooterImage}
            alt="Footer Background"
            className="absolute bottom-4 right-0 w-1/12 h-auto z-0"
          />
          <Footer className="relative z-10" />
        </div>
      </div>
    </Router>
  );
};

export default App;
