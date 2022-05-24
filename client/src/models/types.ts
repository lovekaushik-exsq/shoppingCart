import { makeArray } from "../utilities/generalFunction";
export interface IUserType {
    userId?: number,
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string
}

interface ICountryResponse {
    country_id: number,
    country_name: string,
}
interface ICountry {
    countryId: number,
    countryName: string
}
export class CountryModel implements ICountry {
    countryId: number;
    countryName: string;
    constructor(input: ICountryResponse) {
        this.countryId = input.country_id;
        this.countryName = input.country_name;
    }
}

interface IStateResponse {
    country_id: number,
    state_id: number,
    state_name: string
}
interface IState {
    countryId: number,
    stateId: number,
    stateName: string
}
export class StateModel implements IState {
    countryId: number;
    stateId: number;
    stateName: string;
    constructor(input: IStateResponse) {
        this.countryId = input.country_id;
        this.stateId = input.state_id;
        this.stateName = input.state_name;
    }
}

interface ICityResponse {
    state_id: number,
    city_id: number,
    city_name: string
}
interface ICity {
    stateId: number,
    cityId: number,
    cityName: string
}
export class CityModel implements ICity {
    stateId: number;
    cityId: number;
    cityName: string;
    constructor(input: ICityResponse) {
        this.stateId = input.state_id;
        this.cityId = input.city_id;
        this.cityName = input.city_name;
    }
}

export interface IUserRegistration extends IUserType {
    confirmPassword?: string,
    address?: string,
    zipCode?: string,
    country?: string | null,
    state?: string | null,
    city?: string | null
}

interface IProductVariantResponse {
    size: string,
    color: string,
    available_units: number
}
interface IProductVariant {
    size: string,
    color: string,
    availableUnits: number
}
export class ProductVariantModel implements IProductVariant {
    size: string;
    color: string;
    availableUnits: number;
    constructor(input: IProductVariantResponse) {
        this.size = input.size;
        this.color = input.color;
        this.availableUnits = input.available_units;
    }
}

interface IProductTypeResponse {
    id: number,
    image: string,
    category: string,
    sub_category: string,
    target_group: string,
    title: string,
    description: string,
    price: number,
    variants: IProductVariantResponse[];
}
interface IProductType {
    id: number,
    image: string,
    category: string,
    subCategory: string,
    targetGroup: string,
    title: string,
    description: string,
    price: number,
    variants: ProductVariantModel[]
}
export class ProductTypeModel implements IProductType {
    id: number;
    image: string;
    category: string;
    subCategory: string;
    targetGroup: string;
    title: string;
    description: string;
    price: number;
    variants: ProductVariantModel[];
    constructor(input: IProductTypeResponse) {
        this.id = input.id;
        this.image = input.image;
        this.category = input.category;
        this.subCategory = input.sub_category;
        this.targetGroup = input.target_group;
        this.title = input.title;
        this.description = input.description;
        this.price = input.price;
        this.variants = makeArray(input.variants, ProductVariantModel);
    }
}

interface ICartResponse {
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
interface ICart {
    userId: number,
    productName: string,
    productSize: string,
    productColor: string,
    productPricePerUnit: number,
    quantity: number,
    orderDate?: Date,
    addressId?: number,
    total?: number
}
export class CartModel implements ICart {
    userId: number;
    productName: string;
    productSize: string;
    productColor: string;
    productPricePerUnit: number;
    quantity: number;
    orderDate?: Date;
    addressId?: number;
    total?: number;
    constructor(input: ICartResponse) {
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

export interface IItem {
    userId?: number,
    productName: string,
    productColor: string,
    productSize: string,
    quantity?: number,
    productPricePerUnit: number,
    orderDate?: Date,
    prev?: Date
}

interface IAddressResponse {
    address_id: number,
    address: string,
    city: string,
    state: string,
    country: string,
    zip_code: number
}
interface IAddress {
    addressId: number,
    address: string,
    city: string,
    state: string,
    country: string,
    zipCode: number
}
export class AddressModel implements IAddress {
    addressId: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: number;
    constructor(input: IAddressResponse) {
        this.addressId = input.address_id;
        this.address = input.address;
        this.city = input.city;
        this.state = input.state;
        this.country = input.country;
        this.zipCode = input.zip_code;
    }
}

interface IUserInfoResponse {
    user_id: number,
    user_name: string,
    user_email: string,
    user_password: string,
    user_phone_number: string
}
interface IUserInfo {
    userId: number,
    userName: string,
    userEmail: string,
    userPassword: string,
    userPhoneNumber: string
}
class UserInfoModel implements IUserInfo {
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string;
    constructor(input: IUserInfoResponse) {
        this.userId = input.user_id;
        this.userName = input.user_name;
        this.userEmail = input.user_email;
        this.userPassword = input.user_password;
        this.userPhoneNumber = input.user_phone_number
    }
}

interface IProfileResponse {
    user_info: IUserInfoResponse,
    token: string
}
interface IProfile {
    userInfo: UserInfoModel,
    token: string
}
export class ProfileModel implements IProfile {
    userInfo: UserInfoModel;
    token: string;
    constructor(input: IProfileResponse) {
        this.userInfo = new UserInfoModel(input.user_info);
        this.token = input.token;
    }
}

