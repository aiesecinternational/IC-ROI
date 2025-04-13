import React from 'react';

const Calculations = ({calculations : {ICDelegateFee, ICFlightFee, ICtotalCostPP, ICtotalCost, requiedProductCounts, delegates}}) => {
  return (
    <div className="bg-white border border-black rounded-lg p-4 shadow-lg w-72 ml-auto h-224 flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-2">£200</h2>
      <ul className="mb-2">
        <li className="flex justify-between items-center text-sm">
          <span>✓ IC fees cost per person</span>
          <span>{ICDelegateFee}£</span>
        </li>
        <li className="flex justify-between items-center text-sm">
          <span>✓ flight ticket cost per person</span>
          <span>{ICFlightFee}£</span>
        </li>
        {        requiedProductCounts.map((product, index) => (
          <li key={index} className="flex justify-between items-center text-sm">
            <span>✓ # of {product.name} approvals required</span>
            <span>{product.fee}£</span>
          </li>
        ))}
       
      </ul>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between items-center font-bold mb-32 text-sm">
        <span>Total {ICtotalCostPP} × {delegates}</span>
        <span>£{ICtotalCost}</span>
      </div>
      <div className="bg-black text-white py-2 w-full font-bold text-center flex-grow-0">
        Totale
      </div>
    </div>
  );
};

export default Calculations; 