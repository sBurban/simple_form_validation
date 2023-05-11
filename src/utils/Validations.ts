import { Gender } from "../common/Types";

const validateName = (value:string, required:boolean, name="Field") =>{
    if(!value && required){
        return `${name} is required.`;
    }
    if(value.length <3 || value.length > 12){
        return `${name} must be between 2 and 12`;
    }
    return null;
}

const validateEmail = (value:string, required:boolean) => {
    if(!value && required){
        return "Email is required.";
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
        return 'Email is invalid.';
    }
    return null;
}

const validateCountry = (value:string, required:boolean) => {
    if(!value && required){
        return "Country is required."
    }
    return null;
}

const validateTelephone = (value:string, required:boolean) =>{
    if(!value && required){
        return "Phone is required";
    }
    if(value.length !== 10){
        return "Phone expects 10 digits";
    }
    return null;
}

const validateDate = (value:string, required:boolean) => {
    if(!value && required){
        return "Date is required."
    }

    return null;
}

const validateWeight = (value:number|string, required:boolean) => {
    if(!value && required){
        return "Weight is required.";
    }
    if(typeof value === "string" && isNaN(Number(value)) ){
        return "Weight must not be an exponential number.";
    }
    if (Number(value) === 0) {
        return "Weight must be higher than 0.";
    }
    return null;
}

const validateGender = (value:Gender, required:boolean) => {
    if(!value && required){
        return "Gender is required.";
    }
    return null;
}

const validateFile = (value:(File|null), required:boolean) => {
    if(!value && required){
        return "File is required.";
    }
    if(value && value.type !== 'image/png' && value.type !== 'image/jpeg'){
        return "File must not be an image.";
    }
    return null;
};

const validateText = (value:string, required:boolean, name="Field") => {
    if(!value && required){
        return `${name} is required.`;
    }
    return null;
}

const validateSkills = (value:string[], required:boolean) => {
    if(value.length === 0 && required){
        return "Must select at least 1 skill";
    }
    return null;
}

export const Validations = {
    name: validateName,
    email: validateEmail,
    country: validateCountry,
    telephone: validateTelephone,
    date: validateDate,
    weight: validateWeight,
    gender: validateGender,
    file: validateFile,
    text: validateText,
    skills: validateSkills
}
