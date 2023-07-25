import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { store } from './context/reducers/store.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <AnimatePresence>
          <App />
        </AnimatePresence>
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </>
)
