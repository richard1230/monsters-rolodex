import React from 'react';
import CardList from './components/card-list/card-list.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }

  }

  componentDidMount() {
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

  onSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase();
    this.setState(
      // () => { 
      // return {searchField }
      // }
      //two methods are equal
      { searchField: searchField }
    )
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filterMonsters = monsters.filter(
      (monster) => monster.name.toLowerCase().includes(searchField)
      //注意:filter也是返回对象,这里的逻辑是筛选出输入框中外部输出的包含字符串的name
    )
    return (
      <div className="App">
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={onSearchChange}
        />
    
        <CardList monsters={filterMonsters} />
         </div>
    );
  }
}

export default App
