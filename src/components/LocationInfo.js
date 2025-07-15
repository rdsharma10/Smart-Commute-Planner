import React from 'react';

const LocationInfo = ({ location }) => {
  return (
    <div>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationInfo;