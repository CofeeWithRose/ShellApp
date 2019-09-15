import React from 'react'
import * as  ReactDOM from 'react-dom'
import './index.css';
import { Provider } from 'mobx-react';
import { stores } from './stores';
import { Router, Route } from 'react-router'
import { createHashHistory } from 'history'
import { initModules, RouteInfo } from './common/initModules';

function initApp(routeInfos:RouteInfo[]) {
    const hashHistory = createHashHistory()
    ReactDOM.render(
        <Provider {...stores} >
            <Router history={hashHistory} >
                {
                    routeInfos.map(({ routePath, component }) => <Route path={routePath} component={React.lazy(component)} />)
                }
                {/* <Route path="/404" component={App} />
                <Route path='/login' component={Login} /> */}
            </Router>
        </Provider>
        , document.getElementById('root'));
}

(async function () {
    const routeInfos = await initModules()
    initApp(routeInfos)
})()





