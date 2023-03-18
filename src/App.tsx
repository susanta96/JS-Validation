import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Validator from './utils/utils';

function App() {
  const [num] = useState(239400);
  // console.log(navigator.language);
  const localCurrency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    signDisplay: 'auto', // Sign to show, auto is default 
    // maximumSignificantDigits: 3, // Put if you want to round of some value, otherwise don't put
    currency: 'INR',
    maximumFractionDigits: 0 // Remove the Fraction
  }).format(num);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Intl List Formats</h1>
      <div className="card">
        <div className="row">
          <div className="col-6">Original No: <span>{num}</span></div>
          <div className="col-6">Formated: <span>{Validator.formatCurrency(num, 'en-IN', 'INR', true)}</span> </div>
        </div>
      </div>
    </div>
  )
}

export default App
