export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id?: string;
    index?: number;
};

export type TItemIngredient = {
    item: TIngredient;
    id: string;
};

export type TOrders = {
    _id: string;
    ingredients: string[];
    status: "created" | "pending" | "done";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type TOrdersArr = {
    orders: TOrders[];
};

export type TOrderNumber = {
    order: { number: number };
};

export type TUserResponse = {
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
};