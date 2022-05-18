export type entity = user | address | country | state | city | cart | number | string;

export interface loginDetail {
    user_email: string,
    user_password: string
}

//lets create something

export type user = {
    user_id?: number,
    user_name: string,
    user_email: string,
    user_password: string,
    user_phone_number: string
}

export type address = {
    address_id?: number,
    address: string,
    city: string,
    state: string,
    zip_code: number,
    country: string
}

export type country = {
    country_id: number,
    country_name: string
}

export type state = {
    country_id: number,
    state_id: number,
    state_name: string
}

export type city = {
    state_id: number,
    city_id: number,
    city_name: string
}

export type userInfo = user & address;

export type result = {
    userInfo: user,
    token: string,
} | string;

export type productVariant = {
    size: string,
    color: string,
    available_units: number
}

export type productType = {
    id: number,
    image: string,
    category: string,
    sub_category: string,
    target_group: string,
    title: string,
    description: string,
    price: number,
    variants: productVariant[]
}

export type cart = {
    user_id: number,
    product_name: string,
    product_size: string,
    product_color: string,
    product_price_per_unit: number,
    quantity: number
}

export type order = {
    user_id: number
    address_id: number,
    total_amount: number,
    order_date?: Date
}
