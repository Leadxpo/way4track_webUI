import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const IndiaMap = () => {
  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ComposableMap projectionConfig={{ scale: 800, center: [80, 22] }} className="w-full h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => console.log(geo.properties.ST_NM)}
                style={{
                  default: { fill: "#ddd", stroke: "#000", strokeWidth: 0.5 },
                  hover: { fill: "#f00", stroke: "#000", strokeWidth: 0.7 },
                  pressed: { fill: "#00f", stroke: "#000", strokeWidth: 0.9 },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
