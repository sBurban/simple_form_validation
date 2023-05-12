
import { useState, useReducer } from "react";
import './Form.css';
import { Gender, StudentSkills } from "../common/Types";
import { Validations } from '../utils/Validations';
import FormReducer from "./Form.reducer";
import { FormTypes,FormTypes2 } from "./Form.reducer";
import { FormState,FormErrorState } from "../common/Types";

const options = [
    {
      value: '',
      label: '-- Select Country--',
    },
    {
      value: 'Finland',
      label: 'Finland',
    },
    {
      value: 'Sweden',
      label: 'Sweden',
    },
    {
      value: 'Norway',
      label: 'Norway',
    },
    {
      value: 'Denmark',
      label: 'Denmark',
    },
];

// const EMPTY_FILE = Object.freeze(new File([""], "filename"));

const initValues:FormState = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    telephone: '',
    dateOfBirth: '',
    favoriteColor: '',
    weight: 0,
    gender: Gender.Female,
    file: null,
    bio: '',
    skills: {
        html: false,
        css: false,
        javascript: false,
    },
};

const initErrors:FormErrorState = {
    firstName: null,
    lastName: null,
    email: null,
    country: null,
    telephone: null,
    dateOfBirth: null,
    favoriteColor: null,
    weight: null,
    gender: null,
    file: null,
    bio: null,
    skills: null,
}

const skillsArrayFormat = (SkillsObj:StudentSkills) => {

    const formattedSkills = Object.entries(SkillsObj).map(([key,value]) =>
        value? key.toUpperCase() : null
    ).filter(r => r); //Filters the nulls out of the array

    return formattedSkills as string[];
}


const Form = () => {

    // const [formData, setFormData] = useState<FormState>(initValues);
    const [submitErrors, setSubmitErrors] = useState<FormErrorState>(initErrors);


    const [formData, dispatchFormData] = useReducer(FormReducer, initValues);


    const selectOptions = options.map((opt,i) =>
        <option key={i} value={opt.value}>{opt.label}</option>
    );

    const handleBlur = (e:React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // console.log(name, value);

        const validatedFields:FormErrorState = validate();
        const newErrors = {
            ...submitErrors,
            [name]: validatedFields[name as keyof FormErrorState]
        };
        // console.log("🚀 ~ file: Form.tsx:144 ~ handleBlur ~ newErrors:", newErrors)
        setSubmitErrors(newErrors);
    }


    const validate = () => {
        const errors = {
            firstName: Validations.name(formData.firstName, true, "First Name"),
            lastName: Validations.name(formData.lastName, true, "Last Name"),
            email: Validations.email(formData.email, true),
            country: Validations.country(formData.country, true),
            telephone: Validations.telephone(formData.telephone, true),
            dateOfBirth: Validations.date(formData.dateOfBirth, true),
            favoriteColor: Validations.text(formData.favoriteColor, true, "Favorite Color"),
            weight: Validations.weight(formData.weight, true),
            gender: Validations.gender(formData.gender, true),
            file: Validations.file(formData.file, true),
            bio: Validations.text(formData.bio, true, "Bio"),
            skills: Validations.skills( skillsArrayFormat(formData.skills), true)
        };

        return errors;
    }

    const handleSelect = ({ target, currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = currentTarget;
        // setFormData({...formData, [name]: value});

        dispatchFormData({type:FormTypes.COUNTRY, val: value});
    };

    const handleChange = ({target, currentTarget}: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value, type } = currentTarget;

        // const typeName = "SET_"+name.toUpperCase();
        // const typeName = "SET_"+name.toUpperCase() as FormTypes2;
        // const typeName:keyof typeof FormTypes = "SET_"+name.toUpperCase();
        const typeName = "SET_"+name.toUpperCase() as unknown as FormTypes;
        // FormTypes[typeName];

        if (type === "checkbox") {
            // Skills
            const isChecked = (target as HTMLInputElement).checked;
            // setFormData(prevState => {
            //     return {
            //         ...prevState,
            //         skills:{
            //             ...prevState.skills,
            //             [name]:isChecked
            //         }
            //     };
            // });

            // const newSkills = {...formData.skills, [name]:isChecked};
            dispatchFormData({type:FormTypes.SKILLS, val: isChecked, name })
        }else if(type === "file"){
            const files = (target as HTMLInputElement).files;
            const file = files? files[0] : null;
            // setFormData({...formData, [name]: file});

            dispatchFormData({type:FormTypes.FILE, val: file})
        }else{
            // setFormData({...formData, [name]: value});

            // const index:number = Object.values(FormTypes).indexOf(typeName);
            // const typeKey = Object.keys(FormTypes)[index];
            // dispatchFormData({type: FormTypes[typeKey], val: value});

            // dispatchFormData({type: typeName, val: value});
            console.log(name);

            if(name==="firstName") dispatchFormData({type:FormTypes.FIRSTNAME, val: value});
            if(name==="lastName") dispatchFormData({type:FormTypes.LASTNAME, val: value});
            if(name==="email") dispatchFormData({type:FormTypes.EMAIL, val: value});
            if(name==="country") dispatchFormData({type:FormTypes.COUNTRY, val: value});
            if(name==="telephone") dispatchFormData({type:FormTypes.TELEPHONE, val: value});
            if(name==="dateOfBirth") dispatchFormData({type:FormTypes.DATEOFBIRTH, val: value});
            if(name==="favoriteColor") dispatchFormData({type:FormTypes.FAVORITECOLOR, val: value});
            if(name==="weight") dispatchFormData({type:FormTypes.WEIGHT, val: value});
            if(name==="gender") dispatchFormData({type:FormTypes.GENDER, val: value});
            if(name==="bio") dispatchFormData({type:FormTypes.BIO, val: value});

        }
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //We destructure the FormData so we get only the Form values we want. (no touched)
        const {
            firstName,
            lastName,
            email,
            country,
            telephone,
            dateOfBirth,
            favoriteColor,
            weight,
            gender,
            file,
            bio,
            skills
        } = formData;



        console.log("FormData: ", formData);

        const data = {
            firstName,
            lastName,
            email,
            country,
            telephone,
            dateOfBirth,
            favoriteColor,
            weight,
            gender,
            file,
            bio,
            skills: skillsArrayFormat(skills)
        };

        const newErrors = validate();
        setSubmitErrors(newErrors)
    }

    return <div className="form_container">
        <h3>Add Student</h3>
        <form onSubmit={handleSubmit} >
            <div className="row">
                <div className="form-group">
                    <label className="label" htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formData.firstName}
                        onBlur={handleBlur}
                    />
                    <br/>
                    {submitErrors.firstName && <>
                        <small className="error">{submitErrors.firstName}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formData.lastName}
                        onBlur={handleBlur}
                    />
                    {submitErrors.lastName && <>
                        <br />
                        <small className="error">{submitErrors.lastName}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@testing.com"
                        onChange={handleChange}
                        value={formData.email}
                        onBlur={handleBlur}
                    />
                    {submitErrors.email && <>
                        <br />
                        <small className="error">{submitErrors.email}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="telephone">Telephone: </label>
                    <input
                        type="text"
                        name="telephone"
                        id="telephone"
                        placeholder="0000000"
                        onChange={handleChange}
                        value={formData.telephone}
                        onBlur={handleBlur}
                    />
                    {submitErrors.telephone && <>
                        <br />
                        <small className="error">{submitErrors.telephone}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="dateOfBirth">Date of Birth: </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="01/01/1991"
                        onChange={handleChange}
                        value={formData.dateOfBirth}
                        onBlur={handleBlur}
                    />
                    {submitErrors.dateOfBirth && <>
                        <br />
                        <small className="error">{submitErrors.dateOfBirth}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="favoriteColor">Favorite Color: </label>
                    <input
                        type="text"
                        name="favoriteColor"
                        id="favoriteColor"
                        placeholder="Favorite Color"
                        onChange={handleChange}
                        value={formData.favoriteColor}
                        onBlur={handleBlur}
                    />
                    {submitErrors.favoriteColor && <>
                        <br />
                        <small className="error">{submitErrors.favoriteColor}</small>
                    </>}

                </div>
                <div className="form-group">
                    <label className="label" htmlFor="weight">Weight: </label>
                    <input
                        type="number"
                        name="weight"
                        id="weight"
                        placeholder="Weight in Kg"
                        onChange={handleChange}
                        value={formData.weight}
                        onBlur={handleBlur}
                    />
                    {submitErrors.weight && <>
                        <br />
                        <small className="error">{submitErrors.weight}</small>
                    </>}

                </div>

                <div className="form-group">
                    <label className="label" htmlFor="country" id="country" >Country: </label>
                    <select
                        name="country"
                        id="country"
                        onChange={handleSelect}
                        onBlur={handleBlur}
                    >
                        {selectOptions}
                    </select>
                    {submitErrors.country && <>
                        <br />
                        <small className="error">{submitErrors.country}</small>
                    </>}

                </div>

                <div className="form-group" >
                    <p className="label">Gender</p>
                    <div className="box-group">
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value={Gender.Female}
                                onChange={handleChange}
                                checked={formData.gender===Gender.Female}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value={Gender.Male}
                                onChange={handleChange}
                                checked={formData.gender===Gender.Male}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value={Gender.Other}
                                onChange={handleChange}
                                checked={formData.gender===Gender.Other}
                            />
                            <label htmlFor="other">Other</label>
                        </div>
                        {submitErrors.gender && <>
                            <br />
                            <small className="error">{submitErrors.gender}</small>
                        </>}

                    </div>
                </div>

                <div className="form-group" >
                    <p className="label">Select your skills</p>
                    <div className="box-group">
                        <div>
                            <input
                                type="checkbox"
                                id="html"
                                name="html"
                                onChange={handleChange}
                            />
                            <label htmlFor="html">HTML</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="css"
                                name="css"
                                onChange={handleChange}
                            />
                            <label htmlFor="css">CSS</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="javascript"
                                name="javascript"
                                onChange={handleChange}
                            />
                            <label htmlFor="javascript">JavaScript</label>
                        </div>
                        {submitErrors.skills && <>
                            <br />
                            <small className="error">{submitErrors.skills}</small>
                        </>}

                    </div>
                </div>

                <div className="form-group vertical" >
                    <label htmlFor="Bio">Bio</label> <br />
                    <textarea
                        id="bio"
                        name="bio"
                        cols={120}
                        rows={10}
                        placeholder="Write about yourself..."
                        onChange={handleChange}
                        value={formData.bio}
                        onBlur={handleBlur}
                    />
                    {submitErrors.bio && <>
                        <br />
                        <small className="error">{submitErrors.bio}</small>
                    </>}

                </div>

                <div className="form-group" >
                    <label className="label" htmlFor="file"> File: </label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {submitErrors.file && <>
                        <br />
                        <small className="error">{submitErrors.file}</small>
                    </>}

                </div>

                <div className="submit_btn">
                    <button>Submit</button>
                </div>

            </div>
        </form>
    </div>
};

export default Form;