import { productType } from "./types";

const products: HTMLElement = document.getElementById('products')!;
export const showProducts = (data: productType[]) => {
    products!.innerHTML = data.map(({ image, title, price, description }: { image: string, title: string, price: number, description: string }, i: number) =>
    (
        `
        <div class="column" data-idx="${i}">
            <div class="card">
                <img src="${image}" alt="Denim Jeans" style="width:100%">
                <h1>${title}</h1>
                <p class="price">${price}</p>
                <p>${description}</p>
                <p><button class="viewProduct">View Product</button></p>
            </div>
        </div>
        `
    )
    ).join("");
    addFunctionalityToCards(data);

}

export const addFunctionalityToCards = (data: productType[]) => {
    products.querySelectorAll('.column').forEach((product: Element, i: number) => {

        // view Product
        viewProductDetail(product, data, data[i].id);
    })
}


export const viewProductDetail = (product: Element, data: productType[], i: number) => {
    product.querySelector('.viewProduct')?.addEventListener('click', () => {
        window.location.href = "productDetail.html?idx=" + i;
    })
}