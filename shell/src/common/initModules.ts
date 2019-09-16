import { initModulesConfig } from "./modulesConfig";

const ShellApp = {
    registModule : (namespace:string, routeInfo: RouteInfo[]) => {},
};
(window as any).ShellApp =ShellApp

export interface InitModuleConfig {
    namespace: string,
    servePath: string,
}

export interface RouteInfo {
    routePath: string
    component: () => Promise<{ default: any}>
}

function resolevePath( servePath: string, path:string):string {
    const url = new URL(servePath)
    if(/^\//.test(path)){
        return `${url.origin}${path}`
    }
    if(/^http/.test(path)){
        return path
    }
    if(/^\//.test(path)){
        return `${url.href}${path}`
    }
   throw new Error(`can not resoleve ${path}`)
}

async function loadScript(resolveFun: () => void, config:InitModuleConfig, path: string){
    const script = document.createElement('script')
    const { namespace, servePath } = config
    
    script.onerror = () => {
        resolveFun()
        console.error(`${namespace} ${path}`)
    }
    script.src = resolevePath(servePath, path)
    document.body.appendChild(script)
}

async function loadCss( config:InitModuleConfig, path: string){
    const css = document.createElement('link')
    css.href = resolevePath(config.servePath, path)
    css.rel = 'stylesheet'
    css.type= 'text/css'
    document.head.insertBefore(css, document.head.firstChild)
}


async function getResourcesPath(servePath:string):Promise<{ type:'css'| 'script', path:string }[]> {
    const rsp = await fetch(`${servePath}?_=${Date.now()}`)
    const content = await rsp.text();
    return (content.match(/<(script|link)[^>]+src="[^"]+(.js|.css)/g)||[]).map( (path) => {
        path = (path.match(/"[^"]+(.js|.css)/) as string[])[0];
        path = path.substring(1, path.length)
        return /js$/.test(path)? { type:'script', path } : { type:'css', path }
    })
    
}

function initModule(config:InitModuleConfig, moduleState: Map<string,() => void>){
    console.log('initModule', config.namespace)
    return new Promise( async resolve =>{
        const { namespace, servePath } = config
        moduleState.set(namespace, resolve)
        const paths = await  getResourcesPath(servePath)
        paths.forEach( ({ type, path }) => {
            type=== 'script'? loadScript(resolve, config, path) : loadCss(config, path)
        })
    })
}

export async function initModules(): Promise<RouteInfo[]> {
    console.log('initmodule')
    const configs: InitModuleConfig[] = initModulesConfig;
    let routes:RouteInfo[] = [];
    const moduleState:Map<string, () =>void> = new Map();
    ShellApp.registModule = function(namespace:string, routeInfo: RouteInfo[]){
        const resolveFun = moduleState.get(namespace)
        if(resolveFun){
            routes = [...routes, ...routeInfo]
            resolveFun()
        }else{
            console.error(`${namespace} is not not match!`)
        }
    }
    
    await Promise.all(configs.map( config => initModule(config, moduleState)))

    return routes
}