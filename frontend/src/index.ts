import { loginForm} from "./login";
import { signupForm } from "./signup";
import { forgotForm } from "./forgot";

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
const signupFormEle = document.querySelector('#signupSubmit') as HTMLButtonElement;
if(signupFormEle !== null){
    signupFormEle.addEventListener('click',(e:Event)=>{
        e.preventDefault();
        signupForm(signupFormEle);
    })
}
const loginFormEle = document.querySelector('#loginSubmit') as HTMLButtonElement;
if(loginFormEle !== null){
    loginFormEle.addEventListener('click',(e)=>{
        e.preventDefault();
        loginForm(loginFormEle);
    })
}

// const forgotFormEle = document.querySelector('#forgotSubmit') as HTMLButtonElement;
// forgotFormEle.addEventListener('click',(e:Event)=>{
//     e.preventDefault();
//     forgotForm(forgotFormEle);
// })

