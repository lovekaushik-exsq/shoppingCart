export interface userType {
    userId?: number,
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string
}

interface country {
    country_id: number,
    country_name: string,
}
export class countryModel {
    countryId: number;
    countryName: string;
    constructor(input: country) {
        this.countryId = input.country_id;
        this.countryName = input.country_name;
    }
}

interface state {
    country_id: number,
    state_id: number,
    state_name: string
}
export class stateModel {
    countryId: number;
    stateId: number;
    stateName: string;
    constructor(input: state) {
        this.countryId = input.country_id;
        this.stateId = input.state_id;
        this.stateName = input.state_name;
    }
}

interface city {
    state_id: number,
    city_id: number,
    city_name: string
}
export class cityModel {
    stateId: number;
    cityId: number;
    cityName: string;
    constructor(input: city) {
        this.stateId = input.state_id;
        this.cityId = input.city_id;
        this.cityName = input.city_name;
    }
}

export interface userRegistration extends userType {
    confirmPassword?: string,
    address?: string,
    zipCode?: string,
    country?: string | null,
    state?: string | null,
    city?: string | null
}

type productVariant = {
    size: string,
    color: string,
    available_units: number
}
export class productVariantModel {
    size: string;
    color: string;
    availableUnits: number;
    constructor(input: productVariant) {
        this.size = input.size;
        this.color = input.color;
        this.availableUnits = input.available_units;
    }
}

type productType = {
    id: number,
    image: string,
    category: string,
    sub_category: string,
    target_group: string,
    title: string,
    description: string,
    price: number,
    variants: productVariant[];
}

export class productTypeModel {
    id: number;
    image: string;
    category: string;
    subCategory: string;
    targetGroup: string;
    title: string;
    description: string;
    price: number;
    variants: productVariantModel[];
    constructor(input: productType) {
        this.id = input.id;
        this.image = input.image;
        this.category = input.category;
        this.subCategory = input.sub_category;
        this.targetGroup = input.target_group;
        this.title = input.title;
        this.description = input.description;
        this.price = input.price;
        this.variants = makeArray(input.variants, productVariantModel);
    }
}

type cart = {
    user_id: number,
    product_name: string,
    product_size: string,
    product_color: string,
    product_price_per_unit: number,
    quantity: number,
    order_date?: Date,
    address_id?: number,
    total?: number
}

export class cartModel {
    userId: number;
    productName: string;
    productSize: string;
    productColor: string;
    productPricePerUnit: number;
    quantity: number;
    orderDate?: Date;
    addressId?: number;
    total?: number;
    constructor(input: cart) {
        this.userId = input.user_id;
        this.productName = input.product_name;
        this.productSize = input.product_size;
        this.productColor = input.product_color;
        this.productPricePerUnit = input.product_price_per_unit;
        this.quantity = input.quantity;
        this.orderDate = input.order_date;
        this.addressId = input.address_id;
        this.total = input.total;
    }
}

export type item = {
    userId?: number,
    productName: string,
    productColor: string,
    productSize: string,
    quantity?: number,
    productPricePerUnit: number,
    orderDate?: Date,
    prev?: Date
}

type address = {
    address_id: number,
    address: string,
    city: string,
    state: string,
    country: string,
    zip_code: number
}

export class addressModel {
    addressId: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: number;
    constructor(input: address) {
        this.addressId = input.address_id;
        this.address = input.address;
        this.city = input.city;
        this.state = input.state;
        this.country = input.country;
        this.zipCode = input.zip_code;
    }
}

type userInfo = {
    user_id: number,
    user_name: string,
    user_email: string,
    user_password: string,
    user_phone_number: string
}
class userInfoModel {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string;
    constructor(input: userInfo) {
        this.userId = input.user_id;
        this.userName = input.user_name;
        this.userEmail = input.user_email;
        this.userPassword = input.user_password;
        this.userPhoneNumber = input.user_phone_number
    }
}

type profile = {
    user_info: userInfo,
    token: string
}
export class profileModel {
    userInfo: userInfoModel;
    token: string;
    constructor(input: profile) {
        this.userInfo = new userInfoModel(input.user_info);
        this.token = input.token;
    }
}



export const makeArray = (data: any, className: any) => {
    let output: any[] = [];
    data.map((item: any) => {
        let current = new className(item);
        output.push({ ...current });
    })
    return output;
}
