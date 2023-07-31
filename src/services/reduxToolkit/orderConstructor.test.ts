import reducer, {
    addOtherIngredient,
    addBun,
    deleteIngredient,
    sortIngredients,
    resetConstructor,
    initialState
} from './orderConstructor'

const fewIngredients = [
    {
        id: '643d69a5c3f7b9001cfa093e',
        item: {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
        }
    },
    {
        id: '643d69a5c3f7b9001cfa0942',
        item: {
            _id: "643d69a5c3f7b9001cfa0942",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.ne/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            __v: 0
        }
    },
    {
        id: '643d69a5c3f7b9001cfa0943',
        item: {
            _id: "643d69a5c3f7b9001cfa0943",
            name: "Соус фирменный Space Sauce",
            type: "sauce",
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            __v: 0
        }
    },
]

const oneIngredient = {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0
}

const bunIngredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

test('should add ingredient', () => {
    expect(
        reducer(
            initialState,
            {
                type: addOtherIngredient,
                payload: {
                    item: oneIngredient,
                    id: '643d69a5c3f7b9001cfa093e'
                }
            }
        )
    ).toEqual({
        constructorItems: [{
            item: oneIngredient,
            id: '643d69a5c3f7b9001cfa093e'
        }],
        bun: null,
    });
});

test('should add bun', () => {
    expect(
        reducer(
            initialState,
            {
                type: addBun,
                payload: {
                    item: bunIngredient,
                    id: '643d69a5c3f7b9001cfa093c'
                }
            }
        )
    ).toEqual({
        constructorItems: [],
        bun: {
            item: bunIngredient,
            id: '643d69a5c3f7b9001cfa093c'
        },
    });
})

test('should sort ingredients', () => {
    const defState: any = {
        constructorItems: [
            fewIngredients[0],
            fewIngredients[1],
            fewIngredients[2]
        ],
        bun: null
    }

    expect(
        reducer(
            defState,
            sortIngredients({
                dropItem: 2,
                draggedItem: 1,
            })
        )
    ).toEqual({
        constructorItems: [
            fewIngredients[0],
            fewIngredients[2],
            fewIngredients[1]
        ],
        bun: null
    })
})

test('should reset constructor', () => {
    const defState: any = {
        constructorItems: fewIngredients,
        bun: bunIngredient
    }

    expect(reducer(
            defState,
            resetConstructor()
        )
    ).toEqual(initialState)
})

test('should delete ingredient', () => {
    const defState: any = {
        constructorItems: fewIngredients,
        bun: null
    }

    expect(reducer(
            defState,
            deleteIngredient({data: fewIngredients[0], myId: '643d69a5c3f7b9001cfa093e'})
        )
    ).toEqual(
        {
            constructorItems: [fewIngredients[1], fewIngredients[2]],
            bun: null
        }
    )
})
