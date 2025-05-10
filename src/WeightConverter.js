import { useState } from 'react';

function WeightConverter() {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState('');
  
  const weightUnits = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'mg', label: 'Milligrams (mg)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'st', label: 'Stone (st)' },
    { value: 't', label: 'Tonnes (t)' },
    { value: 'ust', label: 'US Tons (ust)' },
    { value: 'ukt', label: 'UK Tons (ukt)' },
    { value: 'ct', label: 'Carats (ct)' }
  ];
  
  const conversionFactors = {
    kg: {
      kg: 1,
      g: 1000,
      mg: 1000000,
      lb: 2.20462,
      oz: 35.274,
      st: 0.157473,
      t: 0.001,
      ust: 0.00110231,
      ukt: 0.000984207,
      ct: 5000
    },
    g: {
      kg: 0.001,
      g: 1,
      mg: 1000,
      lb: 0.00220462,
      oz: 0.035274,
      st: 0.000157473,
      t: 0.000001,
      ust: 0.00000110231,
      ukt: 0.000000984207,
      ct: 5
    },
    mg: {
      kg: 0.000001,
      g: 0.001,
      mg: 1,
      lb: 0.00000220462,
      oz: 0.000035274,
      st: 0.000000157473,
      t: 0.000000001,
      ust: 0.00000000110231,
      ukt: 0.000000000984207,
      ct: 0.005
    },
    lb: {
      kg: 0.453592,
      g: 453.592,
      mg: 453592,
      lb: 1,
      oz: 16,
      st: 0.0714286,
      t: 0.000453592,
      ust: 0.0005,
      ukt: 0.000446429,
      ct: 2267.96
    },
    oz: {
      kg: 0.0283495,
      g: 28.3495,
      mg: 28349.5,
      oz: 1,
      lb: 0.0625,
      st: 0.00446429,
      t: 0.0000283495,
      ust: 0.00003125,
      ukt: 0.0000279018,
      ct: 141.748
    },
    st: {
      kg: 6.35029,
      g: 6350.29,
      mg: 6350290,
      st: 1,
      lb: 14,
      oz: 224,
      t: 0.00635029,
      ust: 0.007,
      ukt: 0.00625,
      ct: 31751.5
    },
    t: {
      kg: 1000,
      g: 1000000,
      mg: 1000000000,
      t: 1,
      lb: 2204.62,
      oz: 35274,
      st: 157.473,
      ust: 1.10231,
      ukt: 0.984207,
      ct: 5000000
    },
    ust: {
      kg: 907.185,
      g: 907185,
      mg: 907185000,
      ust: 1,
      lb: 2000,
      oz: 32000,
      st: 142.857,
      t: 0.907185,
      ukt: 0.892857,
      ct: 4535920
    },
    ukt: {
      kg: 1016.05,
      g: 1016050,
      mg: 1016050000,
      ukt: 1,
      lb: 2240,
      oz: 35840,
      st: 160,
      t: 1.01605,
      ust: 1.12,
      ct: 5080230
    },
    ct: {
      kg: 0.0002,
      g: 0.2,
      mg: 200,
      ct: 1,
      lb: 0.000440925,
      oz: 0.00705479,
      st: 0.0000314946,
      t: 0.0000002,
      ust: 0.000000220462,
      ukt: 0.000000196841
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
  };

  const handleConvert = () => {
    if (!inputValue || isNaN(inputValue)) {
      setResult('Please enter a valid number');
      return;
    }
    
    const inputNumber = parseFloat(inputValue);
    const conversionFactor = conversionFactors[fromUnit][toUnit];
    const convertedValue = inputNumber * conversionFactor;
    
    setResult(`${inputNumber} ${fromUnit} = ${convertedValue.toFixed(6)} ${toUnit}`);
  };

  return (
    <div className="container">
      <h1>Weight Converter</h1>
      
      <div className="converter">
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={handleInputChange}
            className="input-field"
          />
          <span className="unit">From</span>
        </div>
        
        <div className="input-group">
          <select
            value={fromUnit}
            onChange={handleFromUnitChange}
            className="input-field"
          >
            {weightUnits.map((unit) => (
              <option key={`from-${unit.value}`} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="equals">=</div>
        
        <div className="input-group">
          <select
            value={toUnit}
            onChange={handleToUnitChange}
            className="input-field"
          >
            {weightUnits.map((unit) => (
              <option key={`to-${unit.value}`} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          <span className="unit">To</span>
        </div>
      </div>
      
      <button
        onClick={handleConvert}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Convert
      </button>
      
      {result && (
        <div className="history-section">
          <div className="history-item">
            <span className="conversion">{result}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeightConverter;