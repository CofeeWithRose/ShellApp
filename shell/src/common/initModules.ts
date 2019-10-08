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

async function loadScript(resolveFun: () => void, config:InitModuleConfig, path?: string){
    if(!path) {
        resolveFun()
        return
    } 
    const script = document.createElement('script')
    const { namespace, servePath } = config
    
    script.onerror = () => {
        resolveFun()
        console.error(`${namespace} ${path}`)
    }
    script.src = resolevePath(servePath, path)
    document.body.appendChild(script)
}

async function loadCss( config:InitModuleConfig, path?: string){
    if(!path) return
    const css = document.createElement('link')
    css.href = resolevePath(config.servePath, path)
    css.rel = 'stylesheet'
    css.type= 'text/css'
    document.head.insertBefore(css, document.head.firstChild)
}



function initModule(config:InitModuleConfig, moduleState: Map<string,() => void>){
    return new Promise( async resolve =>{
        const { namespace, servePath } = config
        moduleState.set(namespace, resolve)
        const rsp = await fetch(`${servePath}/asset-manifest.json?_=${Date.now()}`)
        const manifestJson = await rsp.json()
        const files = manifestJson['files']
        const runTimePath = files['runtime~main.js']
        const mainPath = files['main.js']
        const cssPath = files['main.css']
        loadScript(resolve, config, runTimePath)
        loadScript(resolve, config, mainPath)
        loadCss(config, cssPath)
    })
}

export async function initModules(): Promise<RouteInfo[]> {
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