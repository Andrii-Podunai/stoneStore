// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './index.scss';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { Auth0Provider } from '@auth0/auth0-react';
// import { Provider } from 'react-redux';
// import store from 'store/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Auth0Provider
//           domain="vtormall.au.auth0.com"
//           clientId="tI3QcGzM3tab11NcGjhhTOocItXg57sw"
//           redirectUri={window.location.origin}>
//           <App />
//         </Auth0Provider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-63witsxneba5vm3m.us.auth0.com"
          clientId="umFF7YiNqfEHaIIr7Pys1lzjePZdmBue"
          redirectUri={window.location.origin}>
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
