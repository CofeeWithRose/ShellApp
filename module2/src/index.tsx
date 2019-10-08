export function init(){
   (window as any).ShellApp && (window as any).ShellApp.registModule('module2', [ {
        routePath: '/module2',
        component: () => import('./layout/Login')
    }])
}
init()