import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AutoLogin from './components/AutoLogin';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <AutoLogin>
        <RouterProvider router={router}/>
      </AutoLogin>
    </Provider>
);

reportWebVitals();
