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
    if(wrongFields.length > 0){
        wrongFields.forEach(field => errors.innerHTML += field);
        return;
    }
    errors.innerHTML = "<p>¡Genial! Todos los campos son <span>correctos</span></p>";
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
                break;
            case "N-tarjeta":
                checkCardNumber(data) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "month-exp":
                checkRange(data,1,12) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
            case "year-exp":
                checkRange(data,2001,2100) ? '' : wrongFields.push(errorMessage(input.dataset.name));
                break;
        }
    })
    return wrongFields;
}

const validateString = (data, minLength, maxLength) => (data.length < minLength || data.length  > maxLength || containNumbers(data)) ? false : true;

function containNumbers(string){
    for(let i = 0; i < string.length ; i++){
        if(!isNaN(parseInt(string[i]))) return true;
    }
    return false;
}

const errorMessage = field => `<p>El campo <span>${field}</span> es erróneo.</p>`;

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

function checkCardNumber(data){
    if(containNaN(data)) return false;
    const cardType = getCardType(data);
    if(!cardType) return false;

    const dataArray = data.split("");
    const numbers = dataArray.map(number => parseInt(number));
    dataArray.reverse();

    for(let i = 0 ; i < numbers.length ; i++){
        if((i + 1) % 2 === 0){
            numbers[i] *= 2;
            if(numbers[i] > 9){
                const simplified = simplifyNumber(numbers[i]);
                numbers[i] = simplified;
            }
        }
    }
    let total = 0;
    numbers.forEach(number => total += number);
 
    return total % 10 === 0 ? true : false;
}

function simplifyNumber(number){
    const numberToString =  new String(number);
    return parseInt(numberToString[0]) + parseInt(numberToString[1]);
}

function getCardType(data){
    if(data.length < 13 || data.length > 16) return false;
    const oneSuffix = data.substring(0,1);
    const twoSufix = data.substring(0,2);
    const threeSufix = data.substring(0,3);
    const dataLength = data.length;

    switch(dataLength){
        case 13:
            if(oneSuffix === "4") return "VS";
            return false;
        case 14:
            if(twoSufix === "36" ||twoSufix === "38" || threeSufix >= "300" &&  threeSufix <= "305") return "DC";
            return false;
        case 15:
            if(twoSufix === "34" || twoSufix === "37") return "AE";
            return false;
        case 16:
            if(oneSuffix === "4")return "VS";
            if(twoSufix >= "51" && twoSufix <= "55") return "MC";
            return false;
        default : return false;
    }
}