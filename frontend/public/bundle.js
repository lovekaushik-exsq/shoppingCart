/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginForm = void 0;
const loginForm = (button) => __awaiter(void 0, void 0, void 0, function* () {
    const emailElm = document.querySelector('#login-email');
    const passwordElm = document.querySelector('#login-password');
    const errorElm = document.querySelector('.login-error');
    if (!emailElm.value || !passwordElm.value) {
        errorElm.innerHTML = "Please enter all fields.";
    }
    else {
        const msg = yield callLoginApi(emailElm.value, passwordElm.value);
        errorElm.innerHTML = msg;
    }
});
exports.loginForm = loginForm;
const callLoginApi = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const successElm = document.querySelector('.successfull-login');
    const res = yield fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    if (obj.message === "Login Successfully.") {
        window.location.href = './homePage.html';
        successElm.innerHTML = obj.message;
    }
    return obj.message;
});


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.signupForm = void 0;
const signupForm = (button) => {
    const name = document.querySelector('#signup-name');
    const email = document.querySelector('#signup-email');
    const address = document.querySelector('#signup-address');
    const password = document.querySelector('#signup-password');
    const confirmPassword = document.querySelector('#signup-confirm_password');
    const error = document.querySelector(".signup-error");
    const success = document.querySelector(".successfull-signup");
    const user = {
        name: name.value,
        email: email.value,
        address: address.value,
        password: password.value
    };
    // console.log(Object.values(user).every(o=>o===null));
    // console.log(!Object.values(user).every(o=>o===null));
    // console.log(Object.values(user).some(o=>o===null));
    // console.log(!Object.values(user).some(o=>o===null))
    if (Object.values(user).every(o => o === null)) {
        emailValidation(user.name, user.email, user.address, user.password, confirmPassword.value, error, success);
    }
    else {
        error.innerHTML = 'Please enter all fields.';
    }
};
exports.signupForm = signupForm;
const emailValidation = (name, email, address, password, confirmPassword, error, success) => {
    var filter = /^[a-zA-Z.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)+$/;
    if (!email.match(filter)) {
        error.innerHTML = 'Please provide a valid email address.';
    }
    else {
        passwordValidation(name, email, address, password, confirmPassword, error, success);
    }
};
const passwordValidation = (name, email, address, password, confirmPassword, error, success) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
        error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
    }
    else if (password !== confirmPassword) {
        error.innerHTML = "Confirm password didn't match";
    }
    else {
        callApi(name, email, address, password, confirmPassword, error, success);
    }
});
const callApi = (name, email, address, password, confirmPassword, error, success) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "http://localhost:5000/signup";
    const res = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name,
            email,
            address,
            password
        })
    });
    const json = yield res.text();
    const obj = yield JSON.parse(json);
    //var msg:string = obj.message
    if (obj.message === "Successfully Registered.") {
        success.innerHTML = obj.message;
        window.location.href = './homePage.html';
    }
    else {
        error.innerHTML = obj.message;
    }
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const login_1 = __webpack_require__(1);
const signup_1 = __webpack_require__(2);
// document.addEventListener("DOMContentLoaded", function () {
//     const login = document.getElementById('#loginSubmit') as HTMLButtonElement;
//     const signup = document.querySelector('.signupSubmit') as HTMLButtonElement;
//     const forgot = document.querySelector('.forgotSubmit') as HTMLButtonElement;
//     // console.log('in here');
//     // console.log(login, test);
//     login.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     loginForm();
// });
// });
// console.log(document);
// console.log(document.getElementById("loginSubmit"));
// login.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     loginForm();
// });
// signup.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     signupForm();
// });
// forgot.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     forgotForm();
// })
// document.addEventListener('DOMContentLoader',()=>{
// const loginFormEle = document.querySelector('form')!;
// // if(loginFormEle){
// //     loginFormEle.addEventListener('submit',(e)=>{
// //         e.preventDefault();
// //          loginForm(loginFormEle);
// //     })
// // }
// loginFormEle.addEventListener('submit',(e)=>{
//     e.preventDefault();
//      loginForm(loginFormEle);
// })
// const signupFormEle = document.querySelector('form')!;
// if(signupFormEle){
//     signupFormEle.addEventListener('submit',(e:Event)=>{
//         e.preventDefault();
//         signupForm(signupFormEle);
//     })
// }
// })
const signupFormEle = document.querySelector('#signupSubmit');
if (signupFormEle !== null) {
    signupFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, signup_1.signupForm)(signupFormEle);
    });
}
const loginFormEle = document.querySelector('#loginSubmit');
if (loginFormEle !== null) {
    loginFormEle.addEventListener('click', (e) => {
        e.preventDefault();
        (0, login_1.loginForm)(loginFormEle);
    });
}
// const forgotFormEle = document.querySelector('#forgotSubmit') as HTMLButtonElement;
// forgotFormEle.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     forgotForm(forgotFormEle);
// })

})();

/******/ })()
;