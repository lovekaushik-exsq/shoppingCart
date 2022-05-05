const button = document.querySelector('#clickBtn') as HTMLInputElement;
const nameElm = document.querySelector('#name') as HTMLInputElement;
const error = document.querySelector(".todo-error") as HTMLSpanElement;
const list = document.querySelector("#box") as HTMLUListElement;
error.innerHTML="";
var flag:boolean=false;

button.addEventListener('click',(e:Event)=>{
    if(flag===true){
        if(nameElm.value===""){
            error.innerHTML='Please enter value';
        }
        else{
            todoFunctionality();
        }
        flag = false;
    }
    else{
        if(nameElm.value===""){
            error.innerHTML='Please enter value';
        }
        else{
            todoFunctionality();   
        } 
    }
    nameElm.value="";
})


const todoFunctionality=()=>{
    const removeEle = document.createElement('remove') as HTMLButtonElement;
    const listEle = document.createElement('li') as HTMLLIElement;
    removeEle.className = "remove";
    removeEle.textContent = 'DELETE';
    callRemoveEle(removeEle);
    const editEle = document.createElement('edit') as HTMLButtonElement;
    editEle.className='edit';
    editEle.textContent='EDIT';
    callEditEle(editEle,listEle);

    listEle.textContent = nameElm.value;
    listEle.appendChild(removeEle);
    listEle.appendChild(editEle);
    
    const pos = list.firstElementChild;
    if(pos===null){
        list.appendChild(listEle);
    }
    else{
        list.insertBefore(listEle,pos)
    }
    
}
const callRemoveEle=(removeEle:HTMLButtonElement)=>{
    removeEle.addEventListener('click',(e:any)=>{
        if(e.target !==null){
            const li = e.target.parentNode;
            list.removeChild(li);
        }  
    })
}
const callEditEle=(editEle:HTMLButtonElement,listEle:HTMLLIElement)=>{
    editEle.addEventListener('click',(e:any)=>{
        var editEle = e.target.parentNode.firstChild;
        nameElm.value= editEle.nodeValue;
        flag=true;
        const updatedValue = document.querySelector('#name') as HTMLInputElement; 
        if(updatedValue.value===""){
            error.innerHTML = 'Please enter some value to update';

        }
        editEle.nodeValue= updatedValue.value;
        
    })      
}
