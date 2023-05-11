import React from 'react';
import Styles from './App.module.css';
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={Styles.App}>
      <Header/>
        <div className={Styles.flex}>
            <div className={Styles.container}>
            <BurgerIngredients />
            </div>
            <div className={`${Styles.container} ml-10`}>
                <BurgerConstructor/>
            </div>
        </div>
    </div>
  );
}

export default App;
