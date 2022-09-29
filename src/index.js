import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store'
import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));


// const THEME = createTheme({
//   Typography: {
//    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
//    "fontSize": 124,
//    "fontWeightLight": 300,
//    "fontWeightRegular": 400,
//    "fontWeightMedium": 500
//   }
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });


root.render(
  <React.StrictMode>
    <Provider store = {store}>  
           <App />       
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
