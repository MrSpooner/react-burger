import React from 'react';
import Styles from './App.module.css';
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientsAll } from "../../services/actions/ingredientsAll";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();
    const {ingredientsAll, isIngredientsRequest, isIngredientsRequestError} = useSelector(store => store.ingredientsAll);

    React.useEffect(() => {
        dispatch(getIngredientsAll());
    }, [dispatch]);

    return (
        <div className={Styles.App}>
            <Header/>
            {!isIngredientsRequest && !isIngredientsRequestError && ingredientsAll.length !== 0 &&
                (<div className={Styles.flex}>
                    <DndProvider backend={HTML5Backend}>
                        <div className={Styles.container}>
                            <BurgerIngredients productData={ingredientsAll}/>
                        </div>

                        <div className={`${Styles.container} ml-10`}>
                            <BurgerConstructor productData={ingredientsAll}/>
                        </div>
                    </DndProvider>
                </div>)
            }
        </div>
    );
}

export default App;
