import React from 'react';
import Styles from './App.module.css';
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getProductData} from "../../utils/burger-api";

function App() {
    const [data, setData] = React.useState<any>({
        productData: [],
        isLoading: true
    })
    const setApiData = async () => {
        const response = await getProductData();

        setData({...data, productData: response.data, isLoading: false})
    }

    React.useEffect(() => {
        setApiData();
    }, [])

    return (
        <div className={Styles.App}>
            <Header/>
            {!data.isLoading &&
                <div className={Styles.flex}>
                    <div className={Styles.container}>
                        <BurgerIngredients productData={data.productData}/>
                    </div>
                    <div className={`${Styles.container} ml-10`}>
                        <BurgerConstructor productData={data.productData}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;
