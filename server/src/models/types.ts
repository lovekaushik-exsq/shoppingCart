export type entity = userModel | addressModel | countryModel | stateModel | cityModel | cartModel | number | string;

interface loginDetail {
    userEmail: string,
    userPassword: string
}
export class loginDetailModel {
    user_email: string;
    user_password: string;
    constructor(input: loginDetail) {
        this.user_email = input.userEmail;
        this.user_password = input.userPassword;
    }
}

interface user {
    userId?: number,
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string
}
export class userModel {
    user_id?: number;
    user_name: string;
    user_email: string;
    user_password: string;
    user_phone_number: string;
    constructor(input: user) {
        this.user_id = input.userId;
        this.user_name = input.userName;
        this.user_email = input.userEmail;
        this.user_password = input.userPassword;
        this.user_phone_number = input.userPhoneNumber;
    }
}

interface address {
    addressId?: number,
    address: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
}
export class addressModel {
    address_id?: number;
    address: string;
    city: string;
    state: string;
    zip_code: number;
    country: string;
    constructor(input: address) {
        this.address_id = input.addressId;
        this.address = input.address;
        this.city = input.city;
        this.state = input.state;
        this.zip_code = input.zipCode;
        this.country = input.country;
    }
}

interface userInfo extends user, address { };
export class userInfoModel {
    user_id?: number;
    user_name: string;
    user_email: string;
    user_password: string;
    user_phone_number: string;
    address_id?: number;
    address: string;
    city: string;
    state: string;
    zip_code: number;
    country: string;
    constructor(input: userInfo) {
        this.user_id = input.userId;
        this.user_name = input.userName;
        this.user_email = input.userEmail;
        this.user_password = input.userPassword;
        this.user_phone_number = input.userPhoneNumber;
        this.address_id = input.addressId;
        this.address = input.address;
        this.city = input.city;
        this.state = input.state;
        this.zip_code = input.zipCode;
        this.country = input.country;
    }
}

type country = {
    countryId: number,
    countryName: string
}
export class countryModel {
    country_id: number;
    country_name: string;
    constructor(input: country) {
        this.country_id = input.countryId;
        this.country_name = input.countryName;
    }
}

type state = {
    countryId: number,
    stateId: number,
    stateName: string
}
export class stateModel {
    country_id: number;
    state_id: number;
    state_name: string;
    constructor(input: state) {
        this.country_id = input.countryId;
        this.state_id = input.stateId;
        this.state_name = input.stateName;
    }
}

type city = {
    stateId: number,
    cityId: number,
    cityName: string
}
export class cityModel {
    state_id: number;
    city_id: number;
    city_name: string;
    constructor(input: city) {
        this.state_id = input.stateId;
        this.city_id = input.cityId;
        this.city_name = input.cityName;
    }
}

export type result = {
    user_info: userModel,
    token: string,
} | string;

type productVariant = {
    size: string,
    color: string,
    availableUnits: number
}

export class productVariantModel {
    size: string;
    color: string;
    available_units: number;
    constructor(input: productVariant) {
        this.size = input.size;
        this.color = input.color;
        this.available_units = input.availableUnits;
    }
}

type productType = {
    id: number,
    image: string,
    category: string,
    subCategory: string,
    targetGroup: string,
    title: string,
    description: string,
    price: number,
    variants: productVariant[]
}
export class productTypeModel {
    id: number;
    image: string;
    category: string;
    sub_category: string;
    target_group: string;
    title: string;
    description: string;
    price: number;
    variants: productVariantModel[]
    constructor(input: productType) {
        this.id = input.id;
        this.image = input.image;
        this.category = input.category;
        this.sub_category = input.subCategory;
        this.target_group = input.targetGroup;
        this.title = input.title;
        this.description = input.description;
        this.price = input.price;
        this.variants = makeArray(input.variants, productVariantModel);
    }
}

type cart = {
    userId: number,
    productName: string,
    productSize: string,
    productColor: string,
    productPricePerUnit: number,
    quantity?: number
}
export class cartModel {
    user_id: number;
    product_name: string;
    product_size: string;
    product_color: string;
    product_price_per_unit: number;
    quantity?: number;
    constructor(input: cart) {
        this.user_id = input.userId;
        this.product_name = input.productName;
        this.product_size = input.productSize;
        this.product_color = input.productColor;
        this.product_price_per_unit = input.productPricePerUnit;
        this.quantity = input.quantity;
    }
}

type order = {
    userId: number
    addressId: number,
    totalAmount: number,
    orderDate?: Date
}
export class orderModel {
    user_id: number;
    address_id: number;
    total_amount: number;
    order_date?: Date;
    constructor(input: order) {
        this.user_id = input.userId;
        this.address_id = input.addressId;
        this.total_amount = input.totalAmount;
        this.order_date = input.orderDate;
    }
}




export const makeArray = (data: any, className: any) => {
    let output: any[] = [];
    data.map((item: any) => {
        output.push(new className(item));
    })
    return output;
}