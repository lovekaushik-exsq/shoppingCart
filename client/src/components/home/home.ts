import * as api from "../../api/index";
import { filter } from "./filter";
import { showProducts } from "../product/products";
import { search } from "./searchProduct";
import { ProductTypeModel } from "../../models/types";
import { makeArray } from "../../utilities/generalFunction";
import { getUrlParam } from "../../utilities/generalFunction";
export const loadHomePage = (homePage: HTMLElement) => {
    const login: HTMLElement = document.getElementById('openLoginBtn')!;
    const profile: HTMLElement = document.getElementById('profile')!;
    loadFilter();
    homePage!.onload = async (e: Event) => {
        e.preventDefault();
        const type = getUrlParam("type");
        const input = (await api.getAllProductsBy(type)).data;
        let data: ProductTypeModel[] = makeArray(input, ProductTypeModel);
        console.log("main", data);
        await api.setProductsOnScreen({ productsOnScreen: data });
        const user = localStorage.getItem('profile');
        user != null ? login.style.display = 'none' : login.style.display = 'block';
        user != null ? profile.style.display = 'block' : profile.style.display = 'none';
        await keepFilter();
        await keepSearch()
        const productsOnScreen: ProductTypeModel[] = makeArray((await api.getProductsOnScreen()).data, ProductTypeModel);
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
            <input type="checkbox" id="${i}" name="color" value="${color}" autocomplete="on"/>
            <label for="${i}">${color}</label><br>
            `)).join("")}
            <div>Size</div>
            ${data.size.map((size: string, i: number) => (`
            <input type="checkbox" id="${i}" name="size" value="${size}" autocomplete="on"/>
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

