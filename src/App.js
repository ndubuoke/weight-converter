import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // We'll create this next

function App() {
  const [kg, setKg] = useState('');
  const [lbs, setLbs] = useState('');
  const [history, setHistory] = useState([]);
  const [conversionInProgress, setConversionInProgress] = useState(false);

  // Debounce function to prevent too many conversions
  const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Log conversion to backend and update history
  const logConversion = useCallback((fromUnit, fromValue, toUnit, toValue) => {
    // Don't log empty or NaN conversions
    if (!fromValue || isNaN(fromValue) || !toValue || isNaN(toValue)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      fromUnit,
      fromValue,
      toUnit,
      toValue,
    };

    // Log to the backend (Node.js server)
    fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    }).catch(err => console.error('Error logging conversion:', err));

    setHistory((prevHistory) => [logEntry, ...prevHistory]);
  }, []);

  // Debounced conversion functions
  const debouncedKgToLbs = useCallback(
    debounce((value) => {
      if (value === '' || isNaN(value)) {
        setLbs('');
        return;
      }
      const converted = (parseFloat(value) * 2.20462).toFixed(2);
      setLbs(converted);
      logConversion('kg', value, 'lbs', converted);
      setConversionInProgress(false);
    }, 500),
    [logConversion]
  );

  const debouncedLbsToKg = useCallback(
    debounce((value) => {
      if (value === '' || isNaN(value)) {
        setKg('');
        return;
      }
      const converted = (parseFloat(value) / 2.20462).toFixed(2);
      setKg(converted);
      logConversion('lbs', value, 'kg', converted);
      setConversionInProgress(false);
    }, 500),
    [logConversion]
  );

  const handleKgChange = (e) => {
    const value = e.target.value;
    setKg(value);
    setConversionInProgress(true);
    debouncedKgToLbs(value);
  };

  const handleLbsChange = (e) => {
    const value = e.target.value;
    setLbs(value);
    setConversionInProgress(true);
    debouncedLbsToKg(value);
  };

  return (
    <div className="container">
      <h1>Weight Converter</h1>
      
      <div className="converter">
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter kilograms"
            value={kg}
            onChange={handleKgChange}
            className="input-field"
          />
          <span className="unit">kg</span>
        </div>
        
        <div className="equals">=</div>
        
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter pounds"
            value={lbs}
            onChange={handleLbsChange}
            className="input-field"
          />
          <span className="unit">lbs</span>
        </div>
      </div>

      {conversionInProgress && (
        <div className="converting-message">Converting...</div>
      )}

      <div className="history-section">
        <h2>Conversion History</h2>
        {history.length === 0 ? (
          <p className="no-history">No conversions yet</p>
        ) : (
          <ul className="history-list">
            {history.slice(0, 5).map((entry, index) => (
              <li key={index} className="history-item">
                <span className="timestamp">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span className="conversion">
                  {parseFloat(entry.fromValue).toFixed(2)} {entry.fromUnit} = {parseFloat(entry.toValue).toFixed(2)} {entry.toUnit}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;