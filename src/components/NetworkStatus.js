import React from 'react';

const NetworkStatus = ({ network }) => {
  return (
    <div>
      {network ? (
        <p>Connection: {network.effectiveType} ({network.downlink} Mbps)</p>
      ) : (
        <p>Checking network status...</p>
      )}
    </div>
  );
};

export default NetworkStatus;