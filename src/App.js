import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
    console.log("constructor: " + 1)
  }

  componentDidMount() {
    console.log("componentDidMount: " + 3)
    fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then((response) => response.json())
      .then(users => this.setState(
        () => {
          return { monsters: users }
        }
      )
      )

  }


  render() {
    console.log("render: " + 2)
    const filterMonsters = this.state.monsters.filter(
      (monster) => monster.name.toLowerCase().includes(this.state.searchField)
      //注意:filter也是返回对象,这里的逻辑是筛选出输入框中外部输出的包含字符串的name
    )

    console.log("filterMonsters:===》" + filterMonsters)

    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={
            (e) => {

              const searchField = e.target.value.toLowerCase();
              this.setState(
                // () => { 
                // return {searchField }
                // }
                //two methods are equal
                { searchField: searchField }
              )
            }
          }
        />
        {
          filterMonsters.map((monster) => {
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
