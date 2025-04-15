import React, { useEffect, useState } from "react";
import Americas from "../assets/Americas.png";
import AsiaPacific from "../assets/AsiaPacific.png";
import Europe from "../assets/Europe.png";
import MiddleEast from "../assets/MiddleEast.png";
import Butterfly from "../assets/Butterfly.png";
import Flower from "../assets/Flower.png";

const RegisteredEntities = () => {
  const [regions, setRegions] = useState([
    {
      name: "AMERICAS",
      icon: Americas,
      bgColor: "#bb0d00",
      countries: [],
    },
    {
      name: "ASIA PACIFIC",
      icon: AsiaPacific,
      bgColor: "#30c39e",
      countries: [],
    },
    {
      name: "EUROPE",
      icon: Europe,
      bgColor: "#674ea7",
      countries: [],
    },
    {
      name: "MIDDLE EAST AND AFRICA",
      icon: MiddleEast,
      bgColor: "#e69138",
      countries: [],
    },
  ]);

  useEffect(() => {
    const fetchAsiaPacificData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1xoaTa_AgHj1DIHGu-Yd2rRkLDilWST6bHrVVVx5bdZY/export?format=csv&id=1xoaTa_AgHj1DIHGu-Yd2rRkLDilWST6bHrVVVx5bdZY&gid=0"
        );
        const csvText = await response.text();
        const rows = csvText
          .split("\n")
          .slice(1)
          .map((row) => row.split(","));

        const entities = [
          ...new Set(rows.map((row) => row[2]?.trim()).filter(Boolean)),
        ].filter((entity) => entity.toLowerCase() !== "asia pacific");

        const formattedEntities = entities
          .map((entity) =>
            entity
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          )
          .sort();

        setRegions((prevRegions) =>
          prevRegions.map((region) =>
            region.name === "ASIA PACIFIC"
              ? { ...region, countries: formattedEntities }
              : region
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAsiaPacificData();
  }, []);

  useEffect(() => {
    const fetchEuropeData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1xoaTa_AgHj1DIHGu-Yd2rRkLDilWST6bHrVVVx5bdZY/export?format=csv&gid=556913872"
        );
        const csvText = await response.text();
        const rows = csvText.split("\n").slice(1).map((row) => row.split(","));

        const entities = [
          ...new Set(rows.map((row) => row[2]?.trim()).filter(Boolean)),
        ];

        const formattedEntities = entities
          .map((entity) =>
            entity
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          )
          .sort();

        setRegions((prevRegions) =>
          prevRegions.map((region) =>
            region.name === "EUROPE"
              ? { ...region, countries: formattedEntities }
              : region
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEuropeData();
  }, []);

  useEffect(() => {
    const fetchMiddleEastAndAfricaData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1xoaTa_AgHj1DIHGu-Yd2rRkLDilWST6bHrVVVx5bdZY/export?format=csv&gid=760919471"
        );
        const csvText = await response.text();
        const rows = csvText.split("\n").slice(1).map((row) => row.split(","));

        const entities = [
          ...new Set(rows.map((row) => row[2]?.trim()).filter(Boolean)),
        ];

        const formattedEntities = entities
          .map((entity) =>
            entity
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          )
          .sort();

        setRegions((prevRegions) =>
          prevRegions.map((region) =>
            region.name === "MIDDLE EAST AND AFRICA"
              ? { ...region, countries: formattedEntities }
              : region
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMiddleEastAndAfricaData();
  }, []);

  useEffect(() => {
    const fetchAmericasData = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1xoaTa_AgHj1DIHGu-Yd2rRkLDilWST6bHrVVVx5bdZY/export?format=csv&gid=1633283947"
        );
        const csvText = await response.text();
        const rows = csvText.split("\n").slice(1).map((row) => row.split(","));

        const entities = [
          ...new Set(rows.map((row) => row[2]?.trim()).filter(Boolean)),
        ];

        
        const formattedEntities = entities
          .map((entity) =>
            entity
              .split(" ") // Split the name into words
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              ) // Capitalize each word
              .join(" ") 
          )
          .sort();

        setRegions((prevRegions) =>
          prevRegions.map((region) =>
            region.name === "AMERICAS"
              ? { ...region, countries: formattedEntities }
              : region
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAmericasData();
  }, []);

  return (
    <div className="relative">
      {/* Wrapper for the content box */}
      <div className="relative">
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
                      className={`w-[98%] h-[98%] object-contain flex-shrink-0 ${
                        region.name === "EUROPE"
                          ? "scale-110 p-0.5 translate-y-0.5 -translate-x-0.5"
                          : ""
                      }`}
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-left">
                    {region.name}
                  </h3>
                </div>
                <div className="space-y-2 text-left">
                  {region.countries.map((country, idx) => (
                    <p key={idx} className="py-2 font-medium pl-14">
                      {country}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Butterfly Image */}
        <img
          src={Butterfly}
          alt="Butterfly"
          className="absolute -top-12 -right-12 w-24 h-24" 
        />

        {/* Flower Image */}
        <img
          src={Flower}
          alt="Flower"
          className="absolute -bottom-12 -left-12 w-32 h-32" 
        />
      </div>
    </div>
  );
};

export default RegisteredEntities;
