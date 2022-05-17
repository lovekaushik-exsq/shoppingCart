import * as api from "./api/index";
import { filter } from "./filter";
import { showProducts } from "./products";
import { search } from "./searchProduct";
import { productType } from "./types";
export const loadHomePage = (homePage: HTMLElement) => {
    const login: HTMLElement = document.getElementById('openLoginBtn')!;
    const logout: HTMLElement = document.getElementById('logout')!;
    loadFilter();
    homePage!.onload = async (e: Event) => {
        e.preventDefault();
        const queryString: string = window.location.search;
        const urlParams: URLSearchParams = new URLSearchParams(queryString);
        const type: string | null = urlParams.get("type");

        let { data }: { data: productType[] } = await api.getAllProductsBy({ type });
        await api.setProductsOnScreen({ productsOnScreen: data });
        const user = localStorage.getItem('profile');
        user != null ? login.style.display = 'none' : login.style.display = 'block';
        user != null ? logout.style.display = 'block' : logout.style.display = 'none';
        await keepFilter();
        await keepSearch()
        console.log("main", data);
        const productsOnScreen: productType[] = (await api.getProductsOnScreen()).data;
        if (productsOnScreen) {
            data = productsOnScreen;
            console.log("change main", data);
        }
        showProducts(data);
    }
}

const loadFilter = async () => {
    const { data } = await api.getAllFiltersOfProducts();
    document.getElementById("filterArea")!.innerHTML = (`
        <form>
            <div>Colors</div>
            ${data.colors.map((color: string, i: number) => (`
            <input type="checkbox" id="${i}" name="color" value="${color}"
            <label for="${i}">${color}</label><br>
            `)).join("")}
            <div>Size</div>
            ${data.size.map((size: string, i: number) => (`
            <input type="checkbox" id="${i}" name="size" value="${size}"
            <label for="${i}">${size}</label><br>
            `)).join("")}
            <button id="filterBtn" type="submit">Filter</button>
        </form>
    `)
}


const keepSearch = async () => {
    const searchValue = localStorage.getItem('search');
    if (searchValue) {
        (<HTMLInputElement>document.getElementById('searchBar'))!.value = searchValue;
        await search();
    }
}

const keepFilter = async () => {
    if (localStorage.getItem('filterColors')?.trim() != "" || localStorage.getItem('filterSize')?.trim() != "") {
        await filter();
    }
}