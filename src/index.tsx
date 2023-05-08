import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { Provider } from 'react-redux'
import store from 'redux_store'
import { BrowserRouter } from 'react-router-dom';

// ==============================|| CUSTOM SCSS ||============================== //
import 'assets/css/tailwind.css'
import 'assets/scss/components.scss'
import 'assets/scss/perfect_scrollbar.scss'
import 'assets/scss/aggrid.scss'
import 'assets/scss/font.scss'
import 'assets/scss/quill.scss'

// ==============================|| AGGRID CSS ||============================== //
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-material.css';


// ==============================|| REACT QUILL CSS ||============================== //
import 'react-quill/dist/quill.snow.css';


import baseAxios from './libs/axios'
import { AxiosInstance } from 'axios';
import SessionModel from './models/SessionModel';

declare global {
    var $baseAxios: AxiosInstance
    var session: SessionModel
}

global.$baseAxios = baseAxios

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
  
reportWebVitals();