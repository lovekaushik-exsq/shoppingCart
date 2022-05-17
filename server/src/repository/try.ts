import { productType } from "../types";

let products: productType[] = [
    {
        id: 0,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Top Wear",
        sub_category: "T-Shirt",
        target_group: "men",
        title: "Plain T-shirt",
        description: "Plain, comfy t-shirts for mens.",
        price: 250,
        variants: [
            {
                size: 's',
                color: "red",
                available_units: 3
            },
            {
                size: 'm',
                color: "red",
                available_units: 5
            },
            {
                size: 'l',
                color: "red",
                available_units: 7
            }
        ]
    },
    {
        id: 1,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Top Wear",
        sub_category: "T-Shirt",
        target_group: "kids",
        title: "V neck T-shirts",
        description: "Cool V neck T-shirts.Made of cotton.",
        price: 300,
        variants: [
            {
                size: 's',
                color: "red",
                available_units: 2
            },
            {
                size: 'm',
                color: "red",
                available_units: 1
            },
            {
                size: 'm',
                color: "yellow",
                available_units: 4
            },
            {
                size: 'l',
                color: "blue",
                available_units: 1
            },
            {
                size: 's',
                color: "blue",
                available_units: 3
            },
            {
                size: 's',
                color: "black",
                available_units: 3
            }
        ]
    },
    {
        id: 2,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Top Wear",
        sub_category: "shirt",
        target_group: "men",
        title: "Flared Shirts",
        description: "Cheque shirts made of cotton.",
        price: 700,
        variants: [
            {
                size: 's',
                color: "mermaid blue",
                available_units: 12
            },
            {
                size: 'm',
                color: "black",
                available_units: 7
            },
        ]
    },
    {
        id: 3,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Top Wear",
        sub_category: "Top",
        target_group: "women",
        title: "Crop Top",
        description: "It is a Crop Top",
        price: 1200,
        variants: [
            {
                size: 's',
                color: "red",
                available_units: 2
            },

        ]
    },
    {
        id: 4,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Top Wear",
        sub_category: "Top",
        target_group: "women",
        title: "Plain Top",
        description: "Its a plain top",
        price: 800,
        variants: [
            {
                size: 's',
                color: "blue",
                available_units: 20
            },
            {
                size: 's',
                color: "red",
                available_units: 22
            },
            {
                size: 'm',
                color: "red",
                available_units: 12
            }
        ]
    },
    {
        id: 5,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Bottom Wear",
        sub_category: "jeans",
        target_group: "men",
        title: "denim jeans",
        description: "Its a jeans",
        price: 450,
        variants: [
            {
                size: 's',
                color: "red",
                available_units: 20
            },
            {
                size: 'm',
                color: "dark blue",
                available_units: 22
            },
            {
                size: 'm',
                color: "blue",
                available_units: 12
            },
            {
                size: 'l',
                color: "red",
                available_units: 12
            },
            {
                size: 'm',
                color: "red",
                available_units: 12
            }
        ]
    },
    {
        id: 6,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "Bottom wear",
        sub_category: "jeans",
        target_group: "women",
        title: "plain jeans",
        description: "Blue Dress with full sleeves",
        price: 750,
        variants: [
            {
                size: 's',
                color: "white",
                available_units: 20
            },
            {
                size: 's',
                color: "pink",
                available_units: 12
            },
            {
                size: 'l',
                color: "blue",
                available_units: 12
            }
        ]
    },
    {
        id: 7,
        image: "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
        category: "party wear",
        sub_category: "Pant",
        target_group: "kids",
        title: "Trousers",
        description: "Comfortable pants",
        price: 250,
        variants: [
            {
                size: 'l',
                color: "brown",
                available_units: 20
            },
            {
                size: 'm',
                color: "yellow",
                available_units: 22
            },
        ]
    }
]

export default products;



// [
//     {
//         "id": 0,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Top Wear",
//         "sub_category": "T-Shirt",
//         "target_group": "men",
//         "title": "Plain T-shirt",
//         "description": "Plain, comfy t-shirts for mens.",
//         "price": 250,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "red",
//                 "available_units": 3
//             },
//             {
//                 "size": "m",
//                 "color": "red",
//                 "available_units": 5
//             },
//             {
//                 "size": "l",
//                 "color": "red",
//                 "available_units": 7
//             }
//         ]
//     },
//     {
//         "id": 1,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Top Wear",
//         "sub_category": "T-Shirt",
//         "target_group": "kids",
//         "title": "V neck T-shirts",
//         "description": "Cool V neck T-shirts.Made of cotton.",
//         "price": 300,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "red",
//                 "available_units": 2
//             },
//             {
//                 "size": "m",
//                 "color": "red",
//                 "available_units": 1
//             },
//             {
//                 "size": "m",
//                 "color": "yellow",
//                 "available_units": 4
//             },
//             {
//                 "size": "l",
//                 "color": "blue",
//                 "available_units": 1
//             },
//             {
//                 "size": "s",
//                 "color": "blue",
//                 "available_units": 3
//             },
//             {
//                 "size": "s",
//                 "color": "black",
//                 "available_units": 3
//             }
//         ]
//     },
//     {
//         "id": 2,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Top Wear",
//         "sub_category": "shirt",
//         "target_group": "men",
//         "title": "Flared Shirts",
//         "description": "Cheque shirts made of cotton.",
//         "price": 700,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "mermaid blue",
//                 "available_units": 12
//             },
//             {
//                 "size": "m",
//                 "color": "black",
//                 "available_units": 7
//             }
//         ]
//     },
//     {
//         "id": 3,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Top Wear",
//         "sub_category": "Top",
//         "target_group": "women",
//         "title": "Crop Top",
//         "description": "It is a Crop Top",
//         "price": 1200,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "red",
//                 "available_units": 2
//             }

//         ]
//     },
//     {
//         "id": 4,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Top Wear",
//         "sub_category": "Top",
//         "target_group": "women",
//         "title": "Plain Top",
//         "description": "Its a plain top",
//         "price": 800,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "blue",
//                 "available_units": 20
//             },
//             {
//                 "size": "s",
//                 "color": "red",
//                 "available_units": 22
//             },
//             {
//                 "size": "m",
//                 "color": "red",
//                 "available_units": 12
//             }
//         ]
//     },
//     {
//         "id": 5,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Bottom Wear",
//         "sub_category": "jeans",
//         "target_group": "men",
//         "title": "denim jeans",
//         "description": "Its a jeans",
//         "price": 450,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "red",
//                 "available_units": 20
//             },
//             {
//                 "size": "m",
//                 "color": "dark blue",
//                 "available_units": 22
//             },
//             {
//                 "size": "m",
//                 "color": "blue",
//                 "available_units": 12
//             },
//             {
//                 "size": "l",
//                 "color": "red",
//                 "available_units": 12
//             },
//             {
//                 "size": "m",
//                 "color": "red",
//                 "available_units": 12
//             }
//         ]
//     },
//     {
//         "id": 6,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "Bottom wear",
//         "sub_category": "jeans",
//         "target_group": "women",
//         "title": "plain jeans",
//         "description": "Blue Dress with full sleeves",
//         "price": 750,
//         "variants": [
//             {
//                 "size": "s",
//                 "color": "white",
//                 "available_units": 20
//             },
//             {
//                 "size": "s",
//                 "color": "pink",
//                 "available_units": 12
//             },
//             {
//                 "size": "l",
//                 "color": "blue",
//                 "available_units": 12
//             }
//         ]
//     },
//     {
//         "id": 7,
//         "image": "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
//         "category": "party wear",
//         "sub_category": "Pant",
//         "target_group": "kids",
//         "title": "Trousers",
//         "description": "Comfortable pants",
//         "price": 250,
//         "variants": [
//             {
//                 "size": "l",
//                 "color": "brown",
//                 "available_units": 20
//             },
//             {
//                 "size": "m",
//                 "color": "yellow",
//                 "available_units": 22
//             }
//         ]
//     }
// ]
