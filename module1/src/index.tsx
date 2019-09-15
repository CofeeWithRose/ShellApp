export function init(){
    console.log('module  init.....');
   (window as any).ShellApp && (window as any).ShellApp.registModule('module1', [ {
        routePath: '/login',
        component: () => import('./layout/Login')
    }])
}
init()