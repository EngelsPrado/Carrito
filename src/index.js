import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import UserProvider from './Providers/UserProvider';
import {Router} from '@reach/router'
import Login from './components/InicioSesion/Login';
ReactDOM.render(<UserProvider>
    
    <Router>

    <App path="/" />
    <Login path="/login" ></Login>
    </Router>

    
     
     
     </UserProvider>, document.getElementById('root'));
registerServiceWorker();
