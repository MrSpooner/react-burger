import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Styles from "../../components/app/app.module.css";
import React from 'react';

function HomePage() {
    return (
        <div className={Styles.main}>
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

export default HomePage;