export const checkValidity = (value, rules) =>{
    let isValid = true;

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    if(rules.isNumeric){
        const pattern = /^\d+$/;
        isValid=pattern.test(value) && isValid;
    }
    if(rules.isEmail){
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
        isValid=pattern.test(value) && isValid;
    }
    return isValid;
}