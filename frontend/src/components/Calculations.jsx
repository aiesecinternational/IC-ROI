import React from 'react';
import ProductCounts from './ProductCounts';

const Calculations = ({calculations}) => {
  
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
      <div className="w-full lg:w-4/5 md:w-3/4">
        <ProductCounts productCounts={calculations.requiedProductCounts} />
      </div>
    <div className="w-full lg:w-1/5 md:w-1/4">
    <div className="bg-white border border-black rounded-lg p-4 shadow-lg w-72 ml-auto h-224 flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-2">Receipt</h2>
      <ul className="mb-2">
        <li className="flex justify-between items-center text-sm">
          <span>✓ IC fees cost per person</span>
          <span>{calculations.ICDelegateFee}£</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>✓ flight ticket cost per person</span>
          <span>{calculations.ICFlightFee} £</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>✓ Total cost covered per person</span>
          <span>{calculations.ICtotalCostPP} £</span>
        </li>
       
      </ul>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between items-center font-bold mb-32 text-sm">
        <span>Total {calculations.ICtotalCostPP} × {calculations.delegates}</span>
        <span>£{calculations.ICtotalCost}</span>
      </div>
      <div className="bg-black text-white py-2 w-full font-bold text-center flex-grow-0">
        Total
      </div>
    </div>
    </div>
    </div>
  );
};

export default Calculations; 