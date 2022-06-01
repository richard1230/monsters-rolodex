import React, { useState,useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'
import './App.css'


const App = () => {


  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters)




  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(users => setMonsters(
        { monsters: users.filter(item => item.id !== 10) }
      ))
  }, [])


  useEffect(() => { 
    const newFilteredMonsters = monsters.filter(
      (monster) => {
        return monster.name.toLowerCase().includes(searchField)
        //注意:filter也是返回对象,这里的逻辑是筛选出输入框中外部输出的包含字符串的name
      });
      setFilteredMonsters(newFilteredMonsters)

  },[monsters,searchField])


  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLowerCase();
    setSearchField(searchFieldString)
  }

 


  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />


      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }

//   }

//   componentDidMount() {
//     fetch(
//       'https://jsonplaceholder.typicode.com/users'
//     ).then((response) => response.json())
//       .then(users => this.setState(
//         { monsters: users.filter(item => item.id !== 10) }
//       )
//       )
//   }

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLowerCase();
//     this.setState(
//       // () => { 
//       // return {searchField }
//       // }
//       //two methods are equal
//       { searchField: searchField }
//     )
//   }

//   render() {

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filterMonsters = monsters.filter(
//       (monster) => monster.name.toLowerCase().includes(searchField)
//       //注意:filter也是返回对象,这里的逻辑是筛选出输入框中外部输出的包含字符串的name
//     )
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox
//           className='monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monsters'
//         />
//         <CardList monsters={filterMonsters} />
//       </div>
//     );
//   }
// }

export default App
