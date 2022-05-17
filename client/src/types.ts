export interface user {
    user_id?: number,
    user_name: string,
    user_email: string,
    user_password: string,
    user_phone_number: string
}

export interface userRegistration extends user {
    confirmPassword?: string,
    address?: string,
    zip_code?: string,
    country?: string,
    state?: string,
    city?: string
}

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
    quantity: number,
    order_date?: Date,
    address_id?: number,
    total?: number
}

export type item = {
    user_id?: number,
    product_name: string,
    product_color: string,
    product_size: string,
    quantity?: number,
    product_price_per_unit: number
}