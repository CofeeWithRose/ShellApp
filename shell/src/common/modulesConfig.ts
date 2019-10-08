import { InitModuleConfig } from "./initModules";

export const initModulesConfig: InitModuleConfig[]= [
    {
        namespace: 'module1',
        servePath: 'http://localhost:3300/module1'
    },
    {
        namespace: 'module2',
        servePath: 'http://localhost:3300/module2'
    }
]