import products from "../products";
import { ProductVariantModel, ProductTypeModel } from "../models/types";
const fs = require('fs');

let productsOnScreen: ProductTypeModel[];
export const getAllProducts = () => products;
export const getAllProductsByService = (type: string) => {
    let output: ProductTypeModel[] = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].target_group == type) {
            output.push(products[i]);
        }
    }
    if (!type) output = getAllProducts();
    return output;
}

export const getProductByIdService = (id: number) => products[id];

export const searchProductByService = (search: string, data: ProductTypeModel[]) => {
    let mySet = new Set();
    data.map(product => {
        for (const attribute in product) {
            if (product[attribute as keyof ProductTypeModel].toString().toLowerCase().includes(search.toLowerCase())) {
                mySet.add(product);
            }
        }
    })
    const result = Array.from(mySet.values()) as ProductTypeModel[]
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
        product.variants.map((color: ProductVariantModel) => {
            mySet.add(color.color);
        })
    })
    return Array.from(mySet.values());
}


const getAllSizes = () => {
    let mySet = new Set();
    products.map(product => {
        product.variants.map((size: ProductVariantModel) => {
            mySet.add(size.size);
        })
    })
    return Array.from(mySet.values());
}

export const filterTheProductsService = (colors: string[], size: string[], items: ProductTypeModel[]) => {
    let mySet = new Set;
    colors.map(color => {
        let result = filterInVariant(color, items);
        result.forEach(item => mySet.add(item));
    })
    size.map(s => {
        let result = filterInVariant(s, items);
        result.forEach(item => mySet.add(item));
    });
    return Array.from(mySet.values()) as ProductTypeModel[];
}

const filterInVariant = (property: string, data: ProductTypeModel[]) => {
    let mySet = new Set();
    if (property.trim() == "") {
        return mySet;
    }
    data.map(item => {
        item.variants.map(variant => {
            for (const attribute in variant) {
                if (variant[attribute as keyof ProductVariantModel].toString().toLowerCase().includes(property.toLowerCase())) {
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
            product.variants.map((variant: ProductVariantModel) => {
                if (variant.color == color && variant.size == size) {
                    quantity = variant.available_units;
                }
            })
        }
    })
    return quantity;
}

export const getProductsOnScreenService = () => {
    return productsOnScreen;
}

export const setProductsOnScreenService = (data: ProductTypeModel[]) => {
    productsOnScreen = data;
}

export const updateProductService = async (name: string, color: string, size: string, quantity: number) => {
    // const id = getProductId(name);
    // if (id == -1) {
    //     return;
    // }
    // const variant_id = getVariantId(id, color, size);
    // var products = JSON.parse(fs.readFileSync(`${__dirname}/../repository/try.json`).toString());
    // products[id].variants[variant_id].available_units -= quantity;
    // if (products[id].variants[variant_id].available_units == 0) {
    //     products[id].variants = products[id].variants.filter((item: ProductVariantModel) => item.available_units != 0);
    // }
    // fs.writeFileSync(`${__dirname}/../repository/try.json`, JSON.stringify(products));
}

const getProductId = (name: string) => {
    let id = -1;
    products.map(product => {
        if (product.title == name) {
            id = product.id;
            return;
        }
    })
    return id;
}

const getVariantId = (id: number, color: string, size: string) => {
    let idx = -1;
    products[id].variants.map((variant: ProductVariantModel, i: number) => {
        if (variant.color == color && variant.size == size) {
            idx = i;
            return;
        }
    })
    return idx;
}