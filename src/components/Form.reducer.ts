import { FormState, StudentSkills, Gender } from "../common/Types";

export enum FormTypes {
    FIRSTNAME = "SET_FIRSTNAME",
    LASTNAME = "SET_LASTNAME",
    EMAIL = "SET_EMAIL",
    COUNTRY = "SET_COUNTRY",
    TELEPHONE = "SET_TELEPHONE",
    DATEOFBIRTH = "SET_DATEOFBIRTH",
    FAVORITECOLOR = "SET_FAVORITECOLOR",
    WEIGHT = "SET_WEIGHT",
    GENDER = "SET_GENDER",
    FILE = "SET_FILE",
    BIO = "SET_BIO",
    SKILLS = "SET_SKILLS"
}

type Action =
 | { type: FormTypes.FIRSTNAME|FormTypes.LASTNAME|FormTypes.EMAIL|FormTypes.COUNTRY
    |FormTypes.TELEPHONE|FormTypes.DATEOFBIRTH|FormTypes.FAVORITECOLOR|FormTypes.WEIGHT|FormTypes.BIO,
    val:string
}
| { type: FormTypes.GENDER, val:Gender }
| { type: FormTypes.FILE, val: File|null }
| { type: FormTypes.SKILLS, val: boolean, name:string }
// | { type: Omit<FormTypes, FormTypes.GENDER|FormTypes.FILE|FormTypes.SKILLS>, val:string }

const FormReducer = (state:FormState, action:Action):FormState => {
    if(action.type==FormTypes.FIRSTNAME){

        return {...state, firstName: action.val};
    }
    if(action.type==FormTypes.LASTNAME){

        return {...state, lastName: action.val};
    }
    if(action.type==FormTypes.EMAIL){

        return {...state, email: action.val};
    }
    if(action.type==FormTypes.COUNTRY){

        return {...state, country: action.val};
    }
    if(action.type==FormTypes.TELEPHONE){

        return {...state, telephone: action.val};
    }
    if(action.type==FormTypes.DATEOFBIRTH){

        return {...state, dateOfBirth: action.val};
    }
    if(action.type==FormTypes.FAVORITECOLOR){

        return {...state, favoriteColor: action.val};
    }
    if(action.type==FormTypes.WEIGHT){

        return {...state, weight: action.val};
    }
    if(action.type==FormTypes.GENDER){

        return {...state, gender: action.val};
    }
    if(action.type==FormTypes.FILE){
        return {...state, file: action.val};
    }
    if(action.type==FormTypes.BIO){
        return {...state, bio: action.val};
    }
    if(action.type==FormTypes.SKILLS){
        const newSkills = {...state.skills, [action.name]:action.val };
        return {...state, skills: newSkills};
    }

    return state;
}

// export type FormTypes2 = "SET_FIRSTNAME"|
// "SET_LASTNAME"|
// "SET_EMAIL"|
// "SET_COUNTRY"|
// "SET_TELEPHONE"|
// "SET_DATEOFBIRTH"|
// "SET_FAVORITECOLOR"|
// "SET_WEIGHT"|
// "SET_GENDER"|
// "SET_FILE"|
// "SET_BIO"|
// "SET_SKILLS"

// type Action2 =
//  | { type: "SET_FIRSTNAME"|"SET_LASTNAME"|"SET_EMAIL"|"SET_COUNTRY"
//     |"SET_TELEPHONE"|"SET_DATEOFBIRTH"|"SET_FAVORITECOLOR"|"SET_WEIGHT"|"SET_BIO",
//     val:string
// }
// | { type: "SET_GENDER", val:Gender }
// | { type: "SET_FILE", val: File|null }
// | { type: "SET_SKILLS", val: boolean, name:string, }
// // | { type: Omit<FormTypes2, "SET_GENDER"|"SET_FILE"|"SET_SKILLS">, val:string }



// const FormReducer2 = (state:FormState, action:Action2):FormState => {
//     if(action.type=="SET_FIRSTNAME"){

//         return {...state, firstName: action.val};
//     }
//     if(action.type=="SET_LASTNAME"){

//         return {...state, lastName: action.val};
//     }
//     if(action.type=="SET_EMAIL"){

//         return {...state, email: action.val};
//     }
//     if(action.type=="SET_COUNTRY"){

//         return {...state, country: action.val};
//     }
//     if(action.type=="SET_TELEPHONE"){

//         return {...state, telephone: action.val};
//     }
//     if(action.type=="SET_DATEOFBIRTH"){

//         return {...state, dateOfBirth: action.val};
//     }
//     if(action.type=="SET_FAVORITECOLOR"){

//         return {...state, favoriteColor: action.val};
//     }
//     if(action.type=="SET_WEIGHT"){

//         return {...state, weight: action.val};
//     }
//     if(action.type=="SET_GENDER"){

//         return {...state, gender: action.val};
//     }
//     if(action.type=="SET_FILE"){
//         return {...state, file: action.val};
//     }
//     if(action.type=="SET_BIO"){
//         return {...state, bio: action.val};
//     }
//     if(action.type=="SET_SKILLS"){
//         const newSkills = {...state.skills, [action.name]:action.val };
//         return {...state, skills: newSkills};
//     }

//     return state;
// }

export default FormReducer;