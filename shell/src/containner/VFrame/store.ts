import { observable, action, computed } from 'mobx'

export default class VFrameStore{

    @observable
    title = 'ui'

    @action
    setTitle(val: string){
        
        this.title = val
    }

    @computed get titleName(){
        return `${this.title}-ASD`
    }
    
    set titleName(val){
        this.title = val
    }

}