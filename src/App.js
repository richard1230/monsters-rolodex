import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'
import './App.css'


const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(users => setMonsters(
        // { monsters: users }//这么写是有问题的
        users
      ))
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(
      (monster) => {
        return monster.name.toLocaleLowerCase().includes(searchField)
        //注意:filter也是返回对象,这里的逻辑是筛选出输入框中外部输出的包含字符串的name
      });
    setFilteredMonsters(newFilteredMonsters)//这里会导致filteredMonsters发生变化

  }, [monsters, searchField])


  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString)//这里会导致searchField发生变化
  }

  return (
    <div className='App'>
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
export default App
