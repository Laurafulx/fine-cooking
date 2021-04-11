import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Content from './common/components/Content/Content';
import Header from './common/components/Header/Header';
import NavBar from './common/components/NavBar/NavBar';
import './index.scss';

const App = () => {

  const foodCategories = ['Pasta', 'Salad', 'Pizza', 'Pie']

  const [selectedFood, setSelecedFood] = useState('Pasta');

  const onChangeFood = (food: string): void => {
    setSelecedFood(food);
  }

  return (
      <div className="app-container">
        
        <Header/>

        <div className="main-container">
          <NavBar onChange={onChangeFood} foodCategories={foodCategories}/>
          <Content selectedFood={selectedFood}/>
        </div>

      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));