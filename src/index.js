import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducer'

const globalState = createStore(allReducers)

globalState.subscribe(() => console.log('Global State : ', globalState.getState()))

ReactDom.render(
    <Provider store={globalState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
