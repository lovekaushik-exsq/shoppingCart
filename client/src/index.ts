import * as api from "./api/index";

// document.getElementById('btn')?.addEventListener('click', async () => {
//     console.log("in button")
// const { data: { data } } = await api.test();
// fetch("http://localhost:5000/").then(res => res.json()).then(data => console.log(data.data))
// console.log(api.test())
// console.log(data)
// const data = await fetch("http://localhost:5000/").then(res => res.json()).then(data => data);
// console.log(data[0]);
// alert("Email id for " + data[0].username + " is: " + data[0].email);
// })

const openLogin = document.querySelector('#openLoginBtn');
const openRegister = document.querySelector('#openRegisterBtn');
const backToHome = document.querySelector('#backToHomeBtn');


openLogin?.addEventListener('click', () => {
    window.location.href = "login.html"
})

openRegister?.addEventListener('click', () => {
    window.location.href = "register.html"
})

backToHome?.addEventListener('click', () => {
    window.location.href = "index.html";
})

const write = document.getElementById('showHere');

const mainPage = document.getElementById('mainPage');
if (mainPage != null) {
    mainPage!.onload = async () => {
        const { data } = await api.getAllProducts();
        console.log(data);
        write!.innerHTML = data[0].category + " -> " + data[0].target_group + " -> " + data[0].sub_category + " -> " + data[0].price;
    }
}