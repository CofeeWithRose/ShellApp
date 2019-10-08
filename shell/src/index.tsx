import React, { Suspense } from 'react'
import * as  ReactDOM from 'react-dom'
import './index.css';
import { Provider } from 'mobx-react';
import { stores } from './stores';
import { Router, Route } from 'react-router'
import { createHashHistory } from 'history'
import { initModules, RouteInfo } from './common/initModules';
class Loading extends React.Component {
    render(){
        return 'loading...'
    }
}
function initApp(routeInfos:RouteInfo[]) {
    const hashHistory = createHashHistory()
    ReactDOM.render(
        <Provider {...stores} >
            <Suspense fallback={<Loading/>}>
                <Router history={hashHistory} >
                    {
                        routeInfos.map(({ routePath, component }) => <Route key={routePath} path={routePath} component={React.lazy(component)} />)
                    }
                    {/* <Route path="/404" component={App} />
                    <Route path='/login' component={Login} /> */}
                </Router>
            </Suspense>
        </Provider>
        , document.getElementById('root'));
}

(async function () {
    const routeInfos = await initModules()
    initApp(routeInfos)
})()





