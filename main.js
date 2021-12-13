document.addEventListener("DOMContentLoaded", obtainInputs);

let people = [];


function obtainInputs(){
    const visualizarDatos = document.querySelector(".visualize");
    visualizarDatos.addEventListener("click", visualizeData);

    const add = document.querySelector(".add");
    add.addEventListener("click",addPerson);

    const remove = document.querySelector(".remove");
    remove.addEventListener("click", removePerson);
}


function visualizeData(){
 
    
}


function addPerson(){
    if(checkEmptyFields()){
        checkEmptyFields();
        return;
    }else{
        const validEmail = validateEmail();
        validEmail ? saveData() : alert("Email inválido");
    }
}


function removePerson(){

}

function checkEmptyFields(){
    const errors = document.querySelector(".errors");
    errors.innerHTML = "";
    let errorExists = false;
    const inputs =  document.querySelectorAll("input[type='text']");
    inputs.forEach(element => {
        if((element.value).trim() === ""){
            errors.innerHTML = `${errors.innerHTML} <p>El campo <span>${element.id}</span> se encuentra vacío</p>`;
            errorExists = true;
        }
    })
    return errorExists;
}



function validateEmail(){
    const email = document.querySelector("#email").value;
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if(email.search(regexp) === 0) {
        return true;
    }
    return false;
}



function saveData(){
    const data = document.querySelectorAll(".data");
    data.forEach(element => console.log(element.value))
}