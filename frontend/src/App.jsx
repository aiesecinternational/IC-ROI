import "./index.css";
import "./tailwind.css";
import React, { useState, useRef, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Select from "react-select";

import entities from "./components/IR_List.jsx";
import Footer from "./components/footer.jsx";
import RegisteredEntities from "./components/RegisteredEys.jsx";
import GIDTeam from "./components/GIDTeam.jsx";
import Calculations from "./components/Calculations.jsx";
import Header from "./components/Header.jsx";
import roiCalculator from "./logic/roiCalculator.js";

import IC_Visual from "./assets/IC_Visual.png";
import Inside from "./assets/Frame 366.png";
import FooterImage from "./assets/Footer_image.png";
import { GridLoader } from "react-spinners";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const [mcpIncluded, setMcpIncluded] = useState(null);
  const [performanceBased, setPerformanceBased] = useState(false);


  const [ICDelegateFee, setICDelegateFee] = useState(500);
  const [ICMcpFee, setICMcpFee] = useState(Math.round(630 * 1.13));
  const [ICFlightFee, setICFlightFee] = useState(0);
  const [ICtotalCostPP, setICTotalCostPP] = useState(0);
  const [ICtotalCost, setICTotalCost] = useState(0);
  const [requiedProductCounts, setRequiedProductCounts] = useState([]);
  const [showCalculations, setShowCalculations] = useState(false);
  const [ICMcpTotalCost, setICMcpTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const calculationsRef = useRef(null);

  const entityOptions = entities.map((entity) => ({
    value: entity.id,
    label: entity.name,
  }));

  const handleProductToggle = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  useEffect(() => {
    if (showCalculations) {
      setTimeout(() => {
        calculationsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100)
    }
  }, [showCalculations])

  const handleCalculate = async () => {
    
    const newErrors = {};

    // Validate each field and set errors
    if (!EntityId) newErrors.entity = "Entity is required.";
    if ( (!mcpIncluded && delegates <= 0 ) || isNaN(delegates))
      newErrors.delegates = "Valid number of delegates is required.";
    if (fullycovered === null)
      newErrors.coverage = "Coverage selection is required.";
    if (selectedProducts.length === 0)
      newErrors.products = "At least one product must be selected.";
    // if (mcpIncluded === null)
    //   newErrors.mcpIncluded = "MCP inclusion selection is required.";

    setErrors(newErrors);

    // If there are errors, stop execution
    if (Object.keys(newErrors).length > 0) return;

    // Clear errors if validation passes
    setErrors({});

    setShowCalculations(false)
    setRequiedProductCounts([]); // Reset product counts before calculation

    setIsLoading(true); // Start loading state

    const { delegateFee, flightFee, totalCostPP, totalCost, productCounts, mcpFee, mcpTotalCost } =
      await roiCalculator(EntityId, delegates, selectedProducts, fullycovered, mcpIncluded, performanceBased);

    setICDelegateFee(delegateFee);
    setICFlightFee(flightFee);
    setICTotalCostPP(totalCostPP);
    setICTotalCost(totalCost);
    setRequiedProductCounts(productCounts);
    setICMcpFee(mcpFee);
    setICMcpTotalCost(mcpTotalCost);

    setIsLoading(false); // Stop loading state
    setShowCalculations(true); // Ensure calculations are shown

    // Scroll to calculations section
    setTimeout(() => {
      calculationsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <Router>
      <div className="home-page min-h-screen font-inter bg-gray-50 overflow-x-hidden">
        <Header />
        <div className="flex items-start justify-center min-h-screen p-6 -mt-16">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex-1 max-w-screen-2xl px-2 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row gap-0 items-stretch mb-8">
                    {/* Form Section */}
                    <div className="user-input bg-white pt-1 px-8 pb-6 rounded-xl shadow-lg lg:w-3/5 mx-6 h-full flex flex-col justify-between -mt-2"> 
                      <h2 className="text-3xl font-extrabold mb-4 text-gray-800 font-kalam text-center">
                        IC ROI CALCULATOR
                      </h2>
                      <div className="grid grid-cols-2 gap-6 -mt-4">
                        {/* Left Column: Entity and Coverage */}
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor="entity"
                            className="text-[#717171] text-base font-medium"
                          >
                            Entity
                          </label>
                          <Select
                            id="entity"
                            options={entityOptions}
                            onChange={(selectedOption) =>
                              setEntityId(selectedOption?.value || "")
                            }
                            placeholder="Select or type entity"
                            className="w-full"
                            classNamePrefix="react-select"
                            value={entityOptions.find(
                              (option) => option.value === EntityId
                            )}
                            isClearable
                          />
                          <div className="h-4">
                            {errors.entity && (
                              <span className="text-xs text-red-500">
                                {errors.entity}
                              </span>
                            )}
                          </div>

                          <div className="mt-2">
                            <label
                              htmlFor="coverage"
                              className="text-[#717171] text-base font-medium"
                            >
                              Coverage
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
                            <div className="h-4">
                              {errors.coverage && (
                                <span className="text-xs text-red-500">
                                  {errors.coverage}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* MCP Included Section */}

                          <div className="mt-2 flex items-center gap-4">
                            <label className="text-[#717171] text-base font-medium">

                              Include MCP:
                            </label>
                            <div className="flex gap-3">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="mcpIncluded"
                                  value="yes"
                                  onChange={() => setMcpIncluded(true)}
                                  className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
                                />
                                Yes
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name="mcpIncluded"
                                  value="no"
                                  onChange={() => setMcpIncluded(false)}
                                  className="h-4 w-4 border-[#d0eaf4] text-[#f17424] focus:ring-[#d0eaf4]"
                                />
                                No
                              </label>
                            </div>
                            <div className="h-4">
                              {errors.mcpIncluded && (
                                <span className="text-xs text-red-500">
                                  {errors.mcpIncluded}
                                </span>
                              )}
                            </div>
                          </div> 
                        </div>
                        {/* Right Column: Delegates, Toggle, and Products */}
                        <div className="flex flex-col gap-2">
                          {/* Number of Delegates */}
                          <label
                          htmlFor="delegates"
                          className="text-[#717171] text-base font-medium flex items-center gap-1"
                        >
                          Number of Delegates
                          <div className="relative group cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-[#717171] group-hover:text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                              />
                            </svg>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-[#717171] text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                              Excluding MCP
                            </div>
                          </div>
                        </label>
                          <input
                            id="delegates"
                            type="text"
                            value={delegates}
                            onChange={(e) => setDelegates(e.target.value)}
                            placeholder="0"
                            className="w-full bg-white border border-[#d1d5db] rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d0eaf4] focus:border-[#d0eaf4] transition duration-200"
                          />
                          <div className="h-4">
                            {errors.delegates && (
                              <span className="text-xs text-red-500">
                                {errors.delegates}
                              </span>
                            )}
                          </div>

                          {/* Performance Based on Last Year's Performance */}
                          <div className="mt-2 flex items-center justify-between">
                            <label className="text-[#717171] text-base font-medium">
                              Calculations Based on Last Year's Performance
                            </label>
                            <div className="relative inline-block w-14 align-middle select-none transition duration-200 ease-in">
                              <input
                                type="checkbox"
                                id="performanceToggle"
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                onChange={(e) =>
                                  setPerformanceBased(e.target.checked)
                                }
                              />
                              <label
                                htmlFor="performanceToggle"
                                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                              ></label>
                            </div>
                          </div>

                          {/* Products */}
                          <div className="mt-2">
                            <label className="text-[#717171] text-base font-medium">
                              Products:
                            </label>
                            <div className="grid grid-cols-2 gap-y-0.5 gap-x-4 mt-1">
                              {products.map((product) => (
                                <label
                                  key={product.id}
                                  className="flex items-center gap-1 text-[#717171] text-base font-medium"
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
                            <div className="h-4">
                              {errors.products && (
                                <span className="text-xs text-red-500">
                                  {errors.products}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Warning and Calculate Button */}
                      <div className="flex w-full items-center justify-between">
                        <div className="h-6">

                          {" "}
                          {/* Reserved space for warning */}
                          {performanceBased ? (
                            <div className="text-xs text-[#f17424] font-medium note-text mr-5">
                              Note: When multiple products are selected, the required number of approvals for each product selected is based on last year's performance.
                            </div>
                          ) : (
                            selectedProducts.length > 1 && (
                              <div className="text-xs text-[#f17424] font-medium note-text mr-5">
                                Note: When multiple products are selected, the required number of approvals or realizations will be provided for each product independently to meet the overall target.
                              </div>
                            )
                          )}
                        </div>
                        <div className="flex justify-end mt-2">
                          <button
                            className="bg-[#f17424] text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-[#e0631b] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#f17424] focus:ring-offset-2"
                            onClick={handleCalculate}
                          >
                            Calculate
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-2/5 items-center h-full flex flex-col justify-between -mt-3">
                      <div className="relative flex items-center h-full bg-white rounded-xl shadow-lg">
                        <img
                          src={IC_Visual}
                          alt="IC Visual"
                          className="w-[210%] h-[210%] object-contain"
                        />
                        <img
                          src={Inside}
                          alt="Overlay Badge"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%]"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Registered Entities Section */}
                  {isLoading? 
                    <div className="flex justify-center items-center">
                    <GridLoader color="#f17424" />
                    </div>
                  :showCalculations && (
                    <div ref={calculationsRef}>
                      <Calculations
                        calculations={{
                          ICDelegateFee,
                          ICFlightFee,
                          ICtotalCostPP,
                          ICtotalCost,
                          requiedProductCounts,
                          delegates,
                          fullycovered,
                          mcpIncluded,
                          ICMcpFee,
                          ICMcpTotalCost
                        }}
                      />
                    </div>
                  )}
                  <div className="mt-32 text-center md:block hidden">
                    <h2 className="text-3xl font-bold font-figtree text-gray-800 mb-4">
                      GET YOUR IR GAME STARTED
                    </h2>
                    <p className="text-lg text-gray-700 font-figtree mt-2 mb-6">
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
          <div className="relative z-10">
            <Footer />
          </div>
          <div className="absolute inset-0 z-0">
            <img
              src={FooterImage}
              alt="Footer Background"
              className="absolute bottom-4 right-0 w-1/12 h-auto"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
