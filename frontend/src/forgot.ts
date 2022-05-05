export const forgotForm = (button:HTMLButtonElement)=>{
  const emailElem = document.querySelector('#email') as HTMLInputElement;
  const errorElem = document.querySelector('.forgot-error') as HTMLSpanElement;
  const email:string = emailElem.value;
  if(!email){
    errorElem.innerHTML = 'Please enter email';
    //alert('Please enter email')
  }
  else{
    checkValidEmailOrNot(email,errorElem);
  }
}
const checkValidEmailOrNot=(email:string,errorElem:any)=>{
  if(!email.includes('@') || !email.includes(".com")){
    errorElem.innerHTML="Please enter valid email";
    //alert("Please enter valid email");
  }
  else callForgotApi(email,errorElem);
}
const callForgotApi=async(email:string,errorElem:any)=>{
  const success = document.querySelector('.success') as HTMLSpanElement;
 const res =await fetch('http://localhost:8080/forgot',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(email)
 })
 const json = await res.text()
 const obj = await JSON.parse(json);
 //alert(obj.message);
 if(obj.message==="Successful"){
   success.innerHTML=obj.message;
   
 } 
 errorElem.innerHTML = obj.message;
}
