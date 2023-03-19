import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Validator from './utils/utils';

function App() {
  const [num] = useState(239400);
  const [num2] = useState(328782);


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
          <div className="col-6">Formated: <span>{Validator.formatCurrency(num, 'en-IN', 'INR')}</span> </div>
        </div>
        <div className="row">
          <div className="col-6">Original No: <span>{num2}</span></div>
          <div className="col-6">Formated: <span>{Validator.formatCurrency(num2, navigator.language, 'EUR', true)}</span> </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">Original No: <span>{num} m.</span></div>
          <div className="col-6">Formated: <span>{Validator.formatDistance(num/1000, navigator.language, 'kilometer')}</span> </div>
        </div>
        <div className="row">
          <div className="col-6">Original No: <span>{new Date('1996-08-23').toDateString()}</span></div>
          <div className="col-6">Formated: <span>{Validator.getRelativeTimeString(new Date('1996-08-23'), 'en-IN')}</span> </div>
        </div>
      </div>
    </div>
  )
}

export default App
