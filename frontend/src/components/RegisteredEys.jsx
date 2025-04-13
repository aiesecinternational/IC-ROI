import React from 'react';
import Americas from '../assets/Americas.png';
import AsiaPacific from '../assets/AsiaPacific.png';
import Europe from '../assets/Europe.png';
import MiddleEast from '../assets/MiddleEast.png';

const RegisteredEntities = () => {
  const regions = [
    {
      name: "AMERICAS",
      icon: Americas,
      bgColor: "#bb0d00",
      countries: [
        "MOROCCO",
        "Tunisia",
        "EGYPT",
        "EGYPT",
        "USA",
        "Canada",
        "TURKEY",
        "BELGIUM"
      ]
    },
    {
      name: "ASIA PACIFIC",
      icon: AsiaPacific,
      bgColor: "#30c39e",
      countries: [
        "ROMANIA",
        "INDIA",
        "JORDAN",
        "MOROCCO",
        "Tunisia",
        "EGYPT"
      ]
    },
    {
      name: "EUROPE",
      icon: Europe,
      bgColor: "#674ea7",
      countries: [
        "ROMANIA",
        "INDIA",
        "JORDAN"
      ]
    },
    {
      name: "MIDDLE EAST",
      icon: MiddleEast,
      bgColor: "#e69138",
      countries: [
        "MOROCCO",
        "Tunisia",
        "EGYPT"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-32">
      <div className="grid grid-cols-4 gap-8">
        {regions.map((region, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center p-[2px] overflow-hidden"
                style={{ backgroundColor: region.bgColor }}
              >
                <img 
                  src={region.icon} 
                  alt={`${region.name} icon`}
                  className="w-[98%] h-[98%] object-scale-down flex-shrink-0"
                />
              </div>
              <h3 className="font-semibold text-lg">{region.name}</h3>
            </div>
            <div className="space-y-2">
              {region.countries.map((country, idx) => (
                <p key={idx} className="py-2 font-medium">{country}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEntities;