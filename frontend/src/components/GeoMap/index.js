import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip } from "antd";
import usaTopoJson from "assets/files/USA.topo.json";
import { StyledTooltipContent } from "styles/components/GeoMap";

const data = [
  { state: "Alabama", policies: 150, coordinates: [-86.9023, 32.8061] },
  { state: "Alaska", policies: 80, coordinates: [-152.4044, 61.3707] },
  { state: "Arizona", policies: 300, coordinates: [-111.0937, 34.4484] },
  { state: "Arkansas", policies: 120, coordinates: [-92.3292, 34.9697] },
  { state: "California", policies: 800, coordinates: [-119.4179, 36.7783] },
  { state: "Colorado", policies: 500, coordinates: [-105.7821, 39.5501] },
  { state: "Connecticut", policies: 180, coordinates: [-72.7554, 41.6032] },
  { state: "Delaware", policies: 90, coordinates: [-75.5277, 39.1458] },
  { state: "Florida", policies: 900, coordinates: [-81.5158, 27.7663] },
  { state: "Georgia", policies: 600, coordinates: [-83.6431, 32.1656] },
  { state: "Hawaii", policies: 75, coordinates: [-156.5828, 20.7967] },
  { state: "Idaho", policies: 100, coordinates: [-114.742, 44.3508] },
  { state: "Illinois", policies: 600, coordinates: [-89.3985, 40.6331] },
  { state: "Indiana", policies: 300, coordinates: [-86.1349, 39.8547] },
  { state: "Iowa", policies: 150, coordinates: [-93.0977, 41.878] },
  { state: "Kansas", policies: 130, coordinates: [-98.4842, 39.0119] },
  { state: "Kentucky", policies: 200, coordinates: [-84.27, 37.8393] },
  { state: "Louisiana", policies: 220, coordinates: [-91.9623, 31.2444] },
  { state: "Maine", policies: 90, coordinates: [-69.4455, 45.2538] },
  { state: "Maryland", policies: 0, coordinates: [-76.6413, 39.0458] },
  { state: "Massachusetts", policies: 450, coordinates: [-71.3824, 42.4072] },
  { state: "Michigan", policies: 380, coordinates: [-84.5361, 44.3148] },
  { state: "Minnesota", policies: 210, coordinates: [-94.6859, 46.7296] },
  { state: "Mississippi", policies: 140, coordinates: [-89.3985, 32.7416] },
  { state: "Missouri", policies: 240, coordinates: [-91.8318, 37.9643] },
  { state: "Montana", policies: 80, coordinates: [-110.3626, 46.8797] },
  { state: "Nebraska", policies: 100, coordinates: [-99.9018, 41.4925] },
  { state: "Nevada", policies: 160, coordinates: [-116.4194, 38.8026] },
  { state: "New Hampshire", policies: 10, coordinates: [-71.5724, 43.1939] },
  { state: "New Jersey", policies: 200, coordinates: [-74.4057, 40.0583] },
  { state: "New Mexico", policies: 100, coordinates: [-105.8701, 34.5199] },
  { state: "New York", policies: 30, coordinates: [-74.0059, 42.1657] },
  { state: "North Carolina", policies: 380, coordinates: [-79.0193, 35.7596] },
  { state: "North Dakota", policies: 70, coordinates: [-101.002, 47.5515] },
  { state: "Ohio", policies: 420, coordinates: [-82.9071, 40.4173] },
  { state: "Oklahoma", policies: 170, coordinates: [-97.0929, 35.0078] },
  { state: "Oregon", policies: 210, coordinates: [-120.5542, 43.8041] },
  { state: "Pennsylvania", policies: 30, coordinates: [-77.1945, 41.2033] },
  { state: "Rhode Island", policies: 70, coordinates: [-71.4774, 41.5801] },
  { state: "South Carolina", policies: 250, coordinates: [-80.8742, 33.8569] },
  { state: "South Dakota", policies: 60, coordinates: [-99.9018, 43.9695] },
  { state: "Tennessee", policies: 290, coordinates: [-86.5804, 35.5175] },
  { state: "Texas", policies: 229, coordinates: [-99.9018, 31.9686] },
  { state: "Utah", policies: 130, coordinates: [-111.0937, 39.32] },
  { state: "Vermont", policies: 63, coordinates: [-72.5778, 44.5588] },
  { state: "Virginia", policies: 365, coordinates: [-78.6569, 37.4316] },
  { state: "Washington", policies: 290, coordinates: [-120.7401, 47.7511] },
  { state: "West Virginia", policies: 90, coordinates: [-80.4549, 38.5976] },
  { state: "Wisconsin", policies: 310, coordinates: [-89.6165, 43.7844] },
  { state: "Wyoming", policies: 54, coordinates: [-107.2903, 43.0759] },
];

const bubbleSizeScale = scaleLinear()
  .domain([0, Math.max(...data.map((d) => d.policies))])
  .range([5, 30]);

const GeoMap = () => {
  // State to track which marker is hovered
  const [hoveredState, setHoveredState] = useState(null);
  console.log(hoveredState);

  return (
    <>
      <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
        <ZoomableGroup>
          <Geographies geography={usaTopoJson}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#ECECEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {data.map(({ state, policies, coordinates }) => (
            <Tooltip
              key={state}
              color="white"
              title={
                <div>
                <StyledTooltipContent>
                  <strong>{state}</strong>
                  <div>
                    Policies: <strong>{policies}</strong>
                  </div>
                </StyledTooltipContent>
                </div>
              }
              placement="top"
            >
              <Marker
                coordinates={coordinates}
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
              >
                <circle
                  r={bubbleSizeScale(policies)}
                  fill="rgb(0, 143, 251)"
                  stroke="#FFF"
                  strokeWidth={2}
                />
              </Marker>
            </Tooltip>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default GeoMap;
