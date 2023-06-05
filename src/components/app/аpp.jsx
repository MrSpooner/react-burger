import React from 'react';
import Styles from './app.module.css';
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    return (
        <div className={Styles.App}>
            <Header/>
            <main className={Styles.flex}>
                <DndProvider backend={HTML5Backend}>
                    <div className={Styles.container}>
                        <BurgerIngredients/>
                    </div>

                    <div className={`${Styles.container} ml-10`}>
                        <BurgerConstructor/>
                    </div>
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
