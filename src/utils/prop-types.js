import PropTypes from "prop-types";

export const Data = {
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    calories: PropTypes.number,
};