import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/styles.css';
import { Header } from './components/Header.jsx';
import { Main } from './components/Main.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <>
            <Header />
            <Main />
        </>
    </React.StrictMode>,
)
