import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [
      ]
    }
    console.log("constructor: "+1)
  }

  componentDidMount() { 
    console.log("componentDidMount: "+3)
    fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then((response) => response.json())
      .then(users => this.setState(() => { 
        return {monsters:users}
      }, () => { 
        console.log(this.state)
      }))
  
  }
 

  render() {
    console.log("render: "+2)
    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={ 
            (e) => { 
              console.log(e.target.value)
              const searchString = e.target.value.toLowerCase();

              const filterMonsters = this.state.monsters.filter((monster) => { 
                    return monster.name.toLowerCase().includes(searchString)
              })
              this.setState(() => { 
                return {monsters: filterMonsters} 
              })
            }
          }   
        />
        { 
          this.state.monsters.map((monster) => { 

            return (<div key={monster.id}>
              <h1>{
                monster.name
              }
              </h1>
            </div>)
          })
        }
      </div>
    );
  }
}

export default App
