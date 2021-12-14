document.addEventListener("DOMContentLoaded", obtainInputs);

const people = [];
const options = {
    a : "Al azar",
    b : "Le indicaron la URL de la página",
    c : "a través de un buscador",
    d : "Mediante un enlace desde otra página"
}


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
    if(!existsGenre()){
        errors.innerHTML = `${errors.innerHTML} <p>Debes de seleccionar el <span>sexo</span></p>`;
        errorExists = true;
    } 
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
    const infoOpt = document.querySelectorAll(".info");
    let info = []
    infoOpt.forEach(element => element.checked ? info.push(element.id) : '')
    people.push({
        name : data[0].value,
        surname: data[1].value,
        email : data[2].value,
        genre: getGenre(),
        reason : options[data[3].value],
        info : info
    })
    console.log(people)
    
}

function existsGenre(){
    let genre = getGenre();
    let existGenre = genre !== "hombre" && genre !== "mujer" ? false : true ;
    return existGenre;
        
}

function getGenre(){
    const genres = document.querySelectorAll("input[name='sexo']");
    let genre;
    genres.forEach(element =>{
        if(element.checked){
            genre = element.value;
        }
    })

    return genre;
}
