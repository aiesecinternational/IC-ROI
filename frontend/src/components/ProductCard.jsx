import React from 'react';
import GV_COLOR_LOGO from '../assets/GV_LOGO_COLOR.png'; 
import GTE_COLOR_LOGO from '../assets/GTE_LOGO_COLOR.png';
import GTA_COLOR_LOGO from '../assets/GTA_LOGO_COLOR.png';

const ProductCard = ({props}) => {

    let border = "border-[#00000]";
    let logo = GV_COLOR_LOGO;
    switch (props.product) {
        case "GV":
            border = "border-gv";
            logo = GV_COLOR_LOGO;
            break;
        case "GTe":
            border = "border-gte";
            logo = GTE_COLOR_LOGO;
            break;
        case "GTa":
            border = "border-gta";
            logo = GTA_COLOR_LOGO;
            break;
        default:
            border = "border-[#00000]";
            break;

    }
  return (
    <div
      className={`w-[312px] h-[259px] border ${border} rounded-[12px] relative bg-white shadow-md flex flex-col justify-between items-center p-4 m-4`}
    >
      <p className="text-black text-xl mt-2 pt-2">You need</p>
      <div className='flex flex-col items-center justify-center'>
        <p className="text-black font-extrabold text-6xl mb-2">{props.count? props.count : "N/A"}</p>
        <p className="text-black font-bold text-2xl mb-2">{props.name} {props.type === "OUTGOING"? "Approvals" : "Realizations"}</p>
      </div>
      <div>
      <img
        src={logo}
        alt="Logo"
        className="w-[40px] h-[40px] absolute bottom-4 right-4"
      />
      </div>
    </div>
  );
}

export default ProductCard;