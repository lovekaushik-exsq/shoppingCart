
export const signupForm=(button:HTMLButtonElement)=>{
const name = document.querySelector('#signup-name') as HTMLInputElement;
const email = document.querySelector('#signup-email') as HTMLInputElement;
const address = document.querySelector('#signup-address') as HTMLInputElement;
const password = document.querySelector('#signup-password') as HTMLInputElement;
const confirmPassword = document.querySelector('#signup-confirm_password') as HTMLInputElement;
const error = document.querySelector(".signup-error") as HTMLSpanElement;
const success = document.querySelector(".successfull-signup") as HTMLSpanElement;
interface UserSignup{
   name:string,
   email:string,
   address:string,
   password:string
}
   const user:UserSignup = {
      name: name.value,
      email: email.value,
      address: address.value,
      password: password.value
   }
   // console.log(Object.values(user).every(o=>o===null));
   // console.log(!Object.values(user).every(o=>o===null));
   // console.log(Object.values(user).some(o=>o===null));
   // console.log(!Object.values(user).some(o=>o===null))

   if(Object.values(user).every(o=>o===null)){
    emailValidation(user.name,user.email,user.address,user.password,confirmPassword.value ,error,success);
   }
   else{
      error.innerHTML = 'Please enter all fields.'
   }
} 
const emailValidation = (name:string,email:string,address:string,password:string,confirmPassword:string,error:any,success:any)=>{
   var filter = /^[a-zA-Z.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)+$/;
   if(!email.match(filter)){
      error.innerHTML='Please provide a valid email address.';
   }
   else{
    passwordValidation(name,email,address,password,confirmPassword,error,success);
   } 
}  
const passwordValidation =  async(name:string,email:string,address:string,password:string,confirmPassword:string,error:any,success:any)=>{
   if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)) {
      error.innerHTML = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
   }
   else if(password!==confirmPassword){
      error.innerHTML="Confirm password didn't match";
   }else{
      callApi(name,email,address,password,confirmPassword,error,success);
   }
}
const callApi=async(name:string,email:string,address:string,password:string,confirmPassword:string,error:any,success:any)=>{
   const url: string = "http://localhost:5000/signup";
   const res = await fetch(url, {
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
    })
    const json = await res.text()
    const obj = await JSON.parse(json);
    //var msg:string = obj.message
    if (obj.message==="Successfully Registered."){
     success.innerHTML=obj.message;
     window.location.href='./homePage.html'
    }
    else{
      error.innerHTML = obj.message;  

    }  
  
}
