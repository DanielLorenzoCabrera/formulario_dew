document.addEventListener("DOMContentLoaded", obtainInputs);

const options = {
    a : "Al azar",
    b : "Le indicaron la URL de la página",
    c : "A través de un buscador",
    d : "Mediante un enlace desde otra página"
}


function obtainInputs(){
    updateList();  

    const visualizarDatos = document.querySelector(".visualize");
    visualizarDatos.addEventListener("click", visualizeData);

    const add = document.querySelector(".add");
    add.addEventListener("click",addPerson);

    const remove = document.querySelector(".remove");
    remove.addEventListener("click", removePerson);

    
}


function existSelection(){
    const peopleList = document.querySelectorAll(".people");
    let selection = false;
    peopleList.forEach(element => {
        if(element.selected) {
            selection = (JSON.parse(localStorage.getItem(element.value)));
            
        }
    })

    return selection;
}


function visualizeData(){
    
    let selected = existSelection();
   
    selected ? 
        alert(`
        Nombre: ${selected.name}
        Apellidos: ${selected.surname}
        Email: ${selected.email}
        Sexo: ${selected.genre}
        Motivo: ${selected.reason}
        Desea información sobre: ${selected.info}`)
    : alert("nada seleccionado");
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
    let selected = existSelection();
    selected ? localStorage.removeItem(selected.name): alert("nada seleccionado");
    updateList();
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
    window.localStorage.setItem(`${data[0].value}`, JSON.stringify({
        name : data[0].value,
        surname: data[1].value,
        email : data[2].value,
        genre: getGenre(),
        reason : options[data[3].value],
        info : info
    }));
    updateList();
    
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


function updateList(){
    const profiles =  document.querySelector(".perfiles");
    profiles.innerHTML = "";
    for(let i = 0; i < localStorage.length ; i++){
        const person = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const opt = `<option value="${person.name}" class='people'>${person.surname}, ${person.name} | ${person.email}</option>`;
        profiles.innerHTML = `${profiles.innerHTML} ${opt}`;
        }
}


function changeSelection(){
    console.log(this)
}