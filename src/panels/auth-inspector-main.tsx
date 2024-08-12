import React from 'react';
import ReactDOM from 'react-dom/client'
import AuthInspector from './auth-inspector-app';
import './../index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthInspector />
    </React.StrictMode>
)