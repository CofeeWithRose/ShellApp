function toCemal(name: string, isBig?: boolean): string{
  if(name){
    name = `${isBig? name[0].toUpperCase() : name[0].toLowerCase()}${name.substr(1)}`
  }
  return name;
}


function arrayToSmallCemal(match: string[]): string{
  let str = toCemal(match[0], false)
  for(let i = 1; i< match.length-1; i++){
    str += toCemal(match[i], true)
  }
  return str
}

class RootStore {

  [index: string]: any

  constructor() {

    const context = (require as any).context('./containner/', true, /\/store.ts$/)
    context.keys().forEach((filePath: string) => {
      if (filePath) {
        const match = filePath.match(/[^/|.]+/g)
        if (match) {
          const fileName = arrayToSmallCemal(match)
          const module = context(filePath)
          const moduleStore = module.default
          this[fileName] = new moduleStore(this)
        }
      }
    })
    
  }

}

export const stores = new RootStore()