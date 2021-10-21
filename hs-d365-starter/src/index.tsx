import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AzureAD from 'react-aad-msal';
import { authProvider } from './common/ADALConfig_V2';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <AzureAD provider={authProvider} forceLogin={true}>
      <App />
    </AzureAD>,
    document.getElementById('root') as HTMLElement
  );
}
else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root') as HTMLElement
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  // reportWebVitals()
}


