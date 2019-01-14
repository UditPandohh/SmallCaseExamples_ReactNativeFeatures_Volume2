import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';

//or navigaiton
const RouterComponent = () => (
        <Router>
            <Scene key='root'>
                <Scene key='main' component={MainPage} title='Main Page' />
                <Scene key='detail' component={DetailPage} title='Details' />
            </Scene>
        </Router>
    );

export default RouterComponent;
