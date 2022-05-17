import * as api from "./api/index";
import { showProducts } from "./products";
import { productType } from "./types";
export const openFilter = async (e: Event) => {
    e.preventDefault();
    if (document.getElementById("filterArea")!.style.display == 'block') {
        document.getElementById("filterArea")!.style.display = 'none'
        return;
    }
    document.getElementById("filterArea")!.style.display = 'block';
    document.getElementById('filterBtn')?.addEventListener('click', async (e: Event) => {
        e.preventDefault();
        getSelectedColors();
        getSelectedSize();
        await filter();
    });
}

export const filter = async () => {
    document.getElementById("filterArea")!.style.display = 'none'
    if (filterCleared()) {
        return;
    }
    let result = await filterProducts();
    console.log("filter", result)
    showProducts(result);
}

export const filterProducts = async () => {
    let productOnScreen = (await api.getProductsOnScreen()).data;
    if (localStorage.getItem('filterColors') == localStorage.getItem('filterSize') && localStorage.getItem('filterSize')?.trim() == "") {
        return productOnScreen;
    }
    let colors: string[] = localStorage.getItem('filterColors')!.split(",");
    let size: string[] = localStorage.getItem('filterSize')!.split(",");
    checkTheCheckBox(colors, size);
    const param = {
        colors,
        size,
        items: productOnScreen
    }

    let { data }: { data: productType[] } = await api.filterTheProducts(param);
    await api.setProductsOnScreen({ productsOnScreen: data });
    return data;
}

const filterCleared = () => {
    let clear = false;
    if (!localStorage.getItem('filterColors') && !localStorage.getItem('filterSize')) {
        clear = true;
    }
    return clear;
}

const getSelectedColors = () => {
    var markedCheckbox: any = document.getElementsByName('color');
    let checkedColors: string[] = [];
    for (var checkbox of markedCheckbox) {
        if (checkbox.checked)
            checkedColors.push(checkbox.value);
    }
    localStorage.setItem("filterColors", checkedColors.join(","));
}

const getSelectedSize = () => {
    var markedCheckbox: any = document.getElementsByName('size');
    let checkedSize: string[] = [];
    for (var checkbox of markedCheckbox) {
        if (checkbox.checked)
            checkedSize.push(checkbox.value);
    }
    localStorage.setItem("filterSize", checkedSize.join(","));
}


const checkTheCheckBox = (colors: string[], size: string[]) => {
    document.querySelectorAll('[name="color"]').forEach(box => {
        colors.forEach(color => {
            if ((box as HTMLInputElement).value == color) {
                (box as HTMLInputElement).checked = true;
            }
        })
    });
    document.querySelectorAll('[name="size"]').forEach(box => {
        size.forEach(s => {
            if ((box as HTMLInputElement).value == s) {
                (box as HTMLInputElement).checked = true;
            }
        })
    });
}