import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Redux Provider
import store from './store/store';  // Import Redux store
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>  {/* Wrap app with Redux Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
