import products from "../products";
import { productVariant, productType } from "../types";
const fs = require('fs');

let productsOnScreen: productType[];
export const getAllProducts = () => {
    return products;
}
export const getAllProductsByService = (type: string) => {
    let output: productType[] = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].target_group == type) {
            output.push(products[i]);
        }
    }
    if (!type) output = getAllProducts();
    return output;
}

export const getProductByIdService = (id: number) => {
    return products[id];
}

export const searchProductByService = (search: string, data: productType[]) => {
    let mySet = new Set();
    data.map(product => {
        for (const attribute in product) {
            if (product[attribute as keyof productType].toString().toLowerCase().includes(search.toLowerCase())) {
                mySet.add(product);
            }
        }
    })
    const result = Array.from(mySet.values()) as productType[]
    return result;
}

export const getAllFilterOfProductsService = () => {
    let colors = getAllColors();
    let size = getAllSizes();
    let obj = {
        colors,
        size
    }
    return obj;
}

const getAllColors = () => {
    let mySet = new Set();
    products.map(product => {
        product.variants.map(color => {
            mySet.add(color.color);
        })
    })
    return Array.from(mySet.values());
}


const getAllSizes = () => {
    let mySet = new Set();
    products.map(product => {
        product.variants.map(size => {
            mySet.add(size.size);
        })
    })
    return Array.from(mySet.values());
}

export const filterTheProductsService = (colors: string[], size: string[], items: productType[]) => {
    let mySet = new Set;
    // console.log(colors, size);
    colors.map(color => {
        let result = filterInVariant(color, items);
        result.forEach(item => mySet.add(item));
    })
    // console.log("color", mySet);
    size.map(s => {
        let result = filterInVariant(s, items);
        result.forEach(item => mySet.add(item));
    });
    // console.log("size", mySet);
    return Array.from(mySet.values()) as productType[];
}

const filterInVariant = (property: string, data: productType[]) => {
    let mySet = new Set();
    if (property.trim() == "") {
        return mySet;
    }
    data.map(item => {
        item.variants.map(variant => {
            for (const attribute in variant) {
                if (variant[attribute as keyof productVariant].toString().toLowerCase().includes(property.toLowerCase())) {
                    mySet.add(item);
                }
            }
        })
    })
    return mySet;
}

export const getQuantityOfProductsService = (product_name: string, color: string, size: string) => {
    let quantity: number = 0;
    products.map(product => {
        if (product.title == product_name) {
            product.variants.map(variant => {
                if (variant.color == color && variant.size == size) {
                    quantity = variant.available_units;
                }
            })
        }
    })
    return quantity;
}

export const getProductsOnScreenService = () => {
    console.log("getting.............")
    console.log(productsOnScreen);
    return productsOnScreen;
}

export const setProductsOnScreenService = (data: productType[]) => {
    console.log("setting.............");
    if (productsOnScreen) {
        console.log("Before.............", productsOnScreen.length);
    } else {
        console.log("Before.............", 0);
    }
    productsOnScreen = data;
    console.log("After.............", productsOnScreen.length);
}

export const updateProductService = async (id: number, variant_id: number, quantity: number) => {
    // const id = getProductId(product_name, product_size, product_color);
    var products = JSON.parse(fs.readFileSync(`${__dirname}/../repository/try.json`).toString());
    products[id].variants[variant_id].available_units += quantity;
    if (products[id].variants[variant_id].available_units == 0) {
        console.log(products[id].variants)
        products[id].variants = products[id].variants.filter((item: productVariant) => item.available_units != 0);
    }
    fs.writeFileSync(`${__dirname}/../repository/try.json`, JSON.stringify(products));
}

const getVariantId = (id: number, color: string, size: string) => {
    for (const variant in products[id].variants) {

    }
}