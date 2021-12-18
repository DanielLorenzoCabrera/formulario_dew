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
    inputs.forEach(input =>{
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
                checkRegister(data);
            
        }


    })
    console.log(wrongFields)
}



function validateString(data,minLength, maxLength){
    if(data.length < minLength || data.length > maxLength || containNumbers(data)) return false;
    return true;
}



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
    const amigo = data.search(regExp)
    console.log(amigo)

}