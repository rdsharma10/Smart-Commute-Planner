import React, { useEffect, useState } from 'react';
import { getCurrentLocation } from './utils/getLocation';
import { getNetworkStatus } from './utils/checkNetwork';
import LocationInfo from './components/LocationInfo';
import NetworkStatus from './components/NetworkStatus';
import MapCanvas from './components/MapCanvas';

function App() {
  const [location, setLocation] = useState(null);
  const [network, setNetwork] = useState(null);
const path = [
  { x: 50, y: 60 },
  { x: 120, y: 90 },
  { x: 220, y: 120 },
  { x: 320, y: 80 },
  { x: 480, y: 150 },
];

  useEffect(() => {
    getCurrentLocation()
      .then((pos) => {
        const coords = pos.coords;
        setLocation(coords);
        const demoPath = [
          { x: coords.latitude * 2, y: coords.longitude * 2 },
          { x: coords.latitude * 2 + 100, y: coords.longitude * 2 + 50 },
        ];
        setPath(demoPath);
      })
      .catch((err) => console.warn(err));

    setNetwork(getNetworkStatus());
  }, []);

  return (
    <div className="app">
      <h1 className="title">Smart Commute Planner</h1>

      <div className="info-section">
        <div className="card fade-in delay-1">
          <NetworkStatus network={network} />
        </div>
        <div className="card fade-in delay-2">
          <LocationInfo location={location} />
        </div>
      </div>

      <div className="canvas-wrapper fade-in delay-3">
        <MapCanvas path={path} />
      </div>
    </div>
  );
}

export default App;
