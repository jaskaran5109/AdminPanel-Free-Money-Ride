import React from 'react'
import { ColorModeScript, theme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher.jsx';
import store from './redux/store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeScript />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
