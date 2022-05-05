interface User {
  email : string,
  password : string
}

export const loginForm=async(button:HTMLButtonElement)=>{
  const emailElm = document.querySelector('#login-email') as HTMLInputElement;
  const passwordElm = document.querySelector('#login-password') as HTMLInputElement;
  const errorElm = document.querySelector('.login-error') as HTMLSpanElement;
 
  if(!emailElm.value || !passwordElm.value){
   errorElm.innerHTML="Please enter all fields.";
  }
  else{
   const msg = await callLoginApi(emailElm.value,passwordElm.value);
   errorElm.innerHTML=msg;

  }  
}
const callLoginApi = async(email:string,password:string)=>{
  const successElm = document.querySelector('.successfull-login') as HTMLSpanElement;
  const res = await fetch('http://localhost:5000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify({
    email:email,
    password:password
  })
  })
  const json = await res.text()
  const obj = await JSON.parse(json);
  if (obj.message === "Login Successfully.") {
    window.location.href = './homePage.html' 
    successElm.innerHTML=obj.message;
  }
  return obj.message;
}





