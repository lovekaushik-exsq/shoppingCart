import { makeArray } from "../utilities/modal";

export type entity = UserModel | AddressModel | CountryModel | StateModel | CityModel | CartModel | number | string;

interface ILoginDetailRequest {
    userEmail: string,
    userPassword: string
}
interface ILoginDetail {
    user_email: string;
    user_password: string;
}
export class LoginDetailModel implements ILoginDetail {
    user_email: string;
    user_password: string;
    constructor(input: ILoginDetailRequest) {
        this.user_email = input.userEmail;
        this.user_password = input.userPassword;
    }
}

interface IUserRequest {
    userId?: number,
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string
}
interface IUser {
    user_id?: number,
    user_name: string,
    user_email?: string,
    user_password: string,
    user_phone_number: string
}
export class UserModel implements IUser {
    user_id?: number;
    user_name: string;
    user_email?: string;
    user_password: string;
    user_phone_number: string;
    constructor(input: IUserRequest) {
        this.user_id = input.userId;
        this.user_name = input.userName;
        this.user_email = input.userEmail!;
        this.user_password = input.userPassword;
        this.user_phone_number = input.userPhoneNumber;
    }
}

interface IAddressRequest {
    addressId?: number,
    userEmail: string,
    address: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
}
interface IAddress {
    address_id?: number,
    user_email?: string,
    address: string,
    city: string,
    state: string,
    zip_code: number,
    country: string
}

export class AddressModel implements IAddress {
    address_id?: number;
    user_email?: string;
    address: string;
    city: string;
    state: string;
    zip_code: number;
    country: string;
    constructor(input: IAddressRequest) {
        this.address_id = input.addressId;
        this.user_email = input.userEmail;
        this.address = input.address;
        this.city = input.city;
        this.state = input.state;
        this.zip_code = input.zipCode;
        this.country = input.country;
    }
}

interface IUserInfoRequest extends IUserRequest, IAddressRequest { };
interface IUserInfoModel {
    user_id?: number,
    user_name: string,
    user_email: string,
    user_password: string,
    user_phone_number: string,
    address_id?: number,
    address: string,
    city: string,
    state: string,
    zip_code: number,
    country: string
}
export class UserInfoModel implements IUserInfoModel {
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
    constructor(input: IUserInfoRequest) {
        this.user_id = input.userId;
        this.user_name = input.userName;
        this.user_email = input.userEmail!;
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

interface ICountryRequest {
    countryId: number,
    countryName: string
}
interface ICountry {
    country_id: number,
    country_name: string
}
export class CountryModel implements ICountry {
    country_id: number;
    country_name: string;
    constructor(input: ICountryRequest) {
        this.country_id = input.countryId;
        this.country_name = input.countryName;
    }
}

interface IStateRequest {
    countryId: number,
    stateId: number,
    stateName: string
}
interface IState {
    country_id: number,
    state_id: number,
    state_name: string
}
export class StateModel implements IState {
    country_id: number;
    state_id: number;
    state_name: string;
    constructor(input: IStateRequest) {
        this.country_id = input.countryId;
        this.state_id = input.stateId;
        this.state_name = input.stateName;
    }
}

interface ICityRequest {
    stateId: number,
    cityId: number,
    cityName: string
}
interface ICity {
    state_id: number,
    city_id: number,
    city_name: string
}
export class CityModel implements ICity {
    state_id: number;
    city_id: number;
    city_name: string;
    constructor(input: ICityRequest) {
        this.state_id = input.stateId;
        this.city_id = input.cityId;
        this.city_name = input.cityName;
    }
}

export type Result = {
    user_info: UserModel,
    token: string,
};

interface IProductVariantRequest {
    size: string,
    color: string,
    availableUnits: number
}
interface IProductVariant {
    size: string,
    color: string,
    available_units: number
}
export class ProductVariantModel implements IProductVariant {
    size: string;
    color: string;
    available_units: number;
    constructor(input: IProductVariantRequest) {
        this.size = input.size;
        this.color = input.color;
        this.available_units = input.availableUnits;
    }
}

interface IProductTypeRequest {
    id: number,
    image: string,
    category: string,
    subCategory: string,
    targetGroup: string,
    title: string,
    description: string,
    price: number,
    variants: IProductVariantRequest[]
}

interface IProductType {
    id: number,
    image: string,
    category: string,
    sub_category: string,
    target_group: string,
    title: string,
    description: string,
    price: number,
    variants: ProductVariantModel[]
}
export class ProductTypeModel implements IProductType {
    id: number;
    image: string;
    category: string;
    sub_category: string;
    target_group: string;
    title: string;
    description: string;
    price: number;
    variants: ProductVariantModel[]
    constructor(input: IProductTypeRequest) {
        this.id = input.id;
        this.image = input.image;
        this.category = input.category;
        this.sub_category = input.subCategory;
        this.target_group = input.targetGroup;
        this.title = input.title;
        this.description = input.description;
        this.price = input.price;
        this.variants = makeArray(input.variants, ProductVariantModel);
    }
}

interface ICartRequest {
    userId: number,
    productName: string,
    productSize: string,
    productColor: string,
    productPricePerUnit: number,
    quantity?: number
}
interface ICart {
    user_id: number,
    product_name: string,
    product_size: string,
    product_color: string,
    product_price_per_unit: number,
    quantity?: number
}
export class CartModel implements ICart {
    user_id: number;
    product_name: string;
    product_size: string;
    product_color: string;
    product_price_per_unit: number;
    quantity?: number;
    constructor(input: ICartRequest) {
        this.user_id = input.userId;
        this.product_name = input.productName;
        this.product_size = input.productSize;
        this.product_color = input.productColor;
        this.product_price_per_unit = input.productPricePerUnit;
        this.quantity = input.quantity;
    }
}

interface IOrderRequest {
    userId: number
    addressId: number,
    totalAmount: number,
    orderDate?: Date
}
interface IOrder {
    user_id: number;
    address_id: number;
    total_amount: number;
    order_date?: Date;
}
export class OrderModel implements IOrder {
    user_id: number;
    address_id: number;
    total_amount: number;
    order_date?: Date;
    constructor(input: IOrderRequest) {
        this.user_id = input.userId;
        this.address_id = input.addressId;
        this.total_amount = input.totalAmount;
        this.order_date = input.orderDate;
    }
}
