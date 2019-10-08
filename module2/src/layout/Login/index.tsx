import React from 'react'
console.log('load module2....')
export default class App extends React.Component{
    render(){
      console.log('module2...')
      return (
          <div className="App">
          module2
          </div>
        )
    }
}
