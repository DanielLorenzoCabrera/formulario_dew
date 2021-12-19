document.addEventListener("DOMContentLoaded", ()=>{

    const validate = document.querySelector(".validar");
    validate.addEventListener("click", checkData);

})



function checkData(){
    const emptyFields = checkEmptyFields();
    const errors = document.querySelector(".errors");
    errors.innerHTML = "";
    
    if(emptyFields.length > 0){
        emptyFields.forEach(field => errors.innerHTML += field);
        return;
    }

    const wrongFields = checkWrongFields();

}


function checkEmptyFields(){
    const emptyFields = [];
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
        input.value === "" ? emptyFields.push(`<p>El campo <span>${input.dataset.name}</span> está vacío.</p>`) : '';
    })

    return emptyFields;
}


function checkWrongFields(){
    const wrongFields = [];
    const inputs = document.querySelectorAll(".input");
    inputs.forEach(input =>{
        const data = input.value;
        switch(input.dataset.name){
            case "nombre":
                validateString(data,3,20) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "apellido1":
                validateString(data,3,20) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "apellido2":
                validateString(data,3,20) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "edad":
                checkAge(data) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "matricula":
                checkRegister(data) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "N-expediente":
                checkRange(data, 340000000000, 349999999999) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "fecha-permiso":
                checkDate(data) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "importe":
                checkImport(data) ? '' : wrongFields.push(errorMessage(input.dataset.name));
        }


    })
    console.log(wrongFields)
}


const validateString = (data, minLength, maxLength) => (data.length < minLength || data.length  > maxLength || containNumbers(data)) ? false : true;


function containNumbers(string){
    for(let i = 0; i < string.length ; i++){
        if(!isNaN(parseInt(string[i]))) return true;
    }
    return false;

}

const errorMessage = field => `El campo ${field} es erróneo.`;


function checkAge(age){
    for(let i = 0 ; i < age.length ; i++){
        if(isNaN(parseInt(age[i]))) return false;
    }

    if(parseInt(age) < 18 || parseInt(age) > 120) return false;
    return true;
}

function checkRegister(data){
    const regExp = /^\d{4}[BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPQRSTVWXYZ][BCDFGHJKLMNPORSTVWXYZ]$/;
    return data.search(regExp) === 0 ? true : false;
}


const checkRange = (data, min, max) => data < min || data > max || containNaN(data) ? false : true;


function containNaN(data){
    for(let i = 0; i < data.length ; i++){
        if(isNaN(parseInt(data[i]))){
            return true;
        }
    }
    return false;
}

function checkDate(date){
    const [year, month, day] = date.split("-");
    return (
        isEmpty(year) || isEmpty(month) || isEmpty(day) || // check empty
        year < 0 || month < 0 || month > 12 || day < 0 || day > 31  // check range
        || containNaN(year) || containNaN(month) || containNaN(day) // check nan elements
        ? false : true);
    
}


const isEmpty = element => element === "" ? true : false;

const checkImport = cost => ( isNaN(cost) || cost < 0 ) ? false : true ;
