var button = document.querySelector('#clickBtn');
var nameElm = document.querySelector('#name');
var error = document.querySelector(".todo-error");
var list = document.querySelector("#box");
error.innerHTML = "";
var flag = false;
button.addEventListener('click', function (e) {
    if (flag === true) {
        if (nameElm.value === "") {
            error.innerHTML = 'Please enter value';
        }
        else {
            todoFunctionality();
        }
        flag = false;
    }
    else {
        if (nameElm.value === "") {
            error.innerHTML = 'Please enter value';
        }
        else {
            todoFunctionality();
        }
    }
    nameElm.value = "";
});
var todoFunctionality = function () {
    var removeEle = document.createElement('remove');
    var listEle = document.createElement('li');
    removeEle.className = "remove";
    removeEle.textContent = 'DELETE';
    callRemoveEle(removeEle);
    var editEle = document.createElement('edit');
    editEle.className = 'edit';
    editEle.textContent = 'EDIT';
    callEditEle(editEle, listEle);
    listEle.textContent = nameElm.value;
    listEle.appendChild(removeEle);
    listEle.appendChild(editEle);
    var pos = list.firstElementChild;
    if (pos === null) {
        list.appendChild(listEle);
    }
    else {
        list.insertBefore(listEle, pos);
    }
};
var callRemoveEle = function (removeEle) {
    removeEle.addEventListener('click', function (e) {
        if (e.target !== null) {
            var li = e.target.parentNode;
            list.removeChild(li);
        }
    });
};
var callEditEle = function (editEle, listEle) {
    editEle.addEventListener('click', function (e) {
        var editEle = e.target.parentNode.firstChild;
        nameElm.value = editEle.nodeValue;
        flag = true;
        var updatedValue = document.querySelector('#name');
        if (updatedValue.value === "") {
            error.innerHTML = 'Please enter some value to update';
        }
        editEle.nodeValue = updatedValue.value;
    });
};
