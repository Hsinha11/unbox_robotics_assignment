import React, { useState, useEffect } from 'react';

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setSpeed(data.speed);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Real-Time Speedometer</h1>
      <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{speed} km/h</div>
    </div>
  );
};

export default Speedometer;