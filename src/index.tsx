import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'assets/fonts/stylesheet.css';
import 'modern-normalize/modern-normalize.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from 'redux/store';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );
// root.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   // </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={store}
      children={
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      }
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
