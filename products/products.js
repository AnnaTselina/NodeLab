const products = [
    {
        displayName: "Cyberpank 2077",
        price: "60$",
    },
    {
        displayName: "SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated",
        price: "40$",
    },
    {
        displayName: "God Of War",
        price: "50$",
    }
];

const getProducts = () => {
    return products;
}

const addProduct = (prod) => {
    products.push(prod);
}

const ProductsHelpers = {
    getProducts: getProducts,
    addProduct: addProduct
};

export default ProductsHelpers;

