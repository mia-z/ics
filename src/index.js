import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { GameLoop } from "react-game-engine";
import { TickSystem } from "./Systems/TickSystem";
import ParallaxBg from "./Components/SubComponents/ParallaxBg";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 2000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

ReactDOM.render(
    <Provider store={store}>
        <ParallaxBg />
        <AlertProvider template={AlertTemplate} {...options}>
            <GameLoop onUpdate={TickSystem}>
                <App />
            </GameLoop>
        </AlertProvider>
    </Provider>,
    document.getElementById('root')
);
