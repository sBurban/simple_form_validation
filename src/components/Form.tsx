
import { useState } from "react";
import './Form.css';

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

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

type StudentSkills = {
    html: boolean,
    css: boolean,
    javascript: boolean
}

interface FormState  {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    telephone: string,
    dateOfBirth: string,
    favoriteColor: string,
    weight: number,
    gender: Gender|string,
    file: unknown
    bio: string,
    skills: StudentSkills,
    touched: {
        firstName: boolean,
        lastName: boolean
    }
}

const initValues:FormState = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    telephone: '',
    dateOfBirth: '',
    favoriteColor: '',
    weight: 0,
    gender: '',
    file: '',
    bio: '',
    skills: {
        html: false,
        css: false,
        javascript: false,
    },
    touched: {
        firstName: false,
        lastName: false,
    }
};


const Form = () => {

    const [formData, setFormData] = useState<FormState>(initValues);


    const selectOptions = options.map((opt,i) =>
        <option key={i} value={opt.value}>{opt.label}</option>
    );

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        //todo
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

        const tempSkills = {...skills};
        // const tempSkills = {...formData.skills};
        const formattedSkills = [];
        for (const key in tempSkills) {
            console.log(key);
            if (tempSkills[key as keyof StudentSkills]) {
                formattedSkills.push(key.toUpperCase())
            }
        }

        // console.log("FormData: ", formData);

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
            skills: formattedSkills
        };

        console.log("Submit Data: ", data);
        // console.log("FormData after: ", formData);
    }

    const handleSelect = ({ target, currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = currentTarget;
        setFormData({...formData, [name]: value});
    };

    const handleChange = ({target, currentTarget}: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        // const { name, value, type, checked } = currentTarget;
    // const handleChange = ({target, currentTarget}: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    // const handleChange = ({target, currentTarget}: React.ChangeEvent<HTMLButtonElement>) => {
    // const handleChange = ({target, currentTarget}: React.MouseEvent<HTMLButtonElement>) => {
        const { name, value, type } = currentTarget;

        if (type === "checkbox") {
            const isChecked = (target as HTMLInputElement).checked;
            // const isChecked = checked;
            setFormData(prevState => {
                return {
                    ...prevState,
                    skills:{
                        ...prevState.skills,
                        [name]:isChecked
                    }
                };
            });
        }else if(type === "file"){
            //todo
            const files = (target as HTMLInputElement).files;
            const file = files? files[0] : null;

            // const file = currentTarget.files? currentTarget.files[0] : null;
            setFormData({...formData, [name]: file});
        }else{
            setFormData({...formData, [name]: value});
        }
        // console.log(name, value, type);
    };

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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="country" id="country" >Country: </label>
                    <select name="country" id="country" onChange={handleSelect} >
                        {selectOptions}
                    </select>
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
                    />
                </div>

                <div className="form-group" >
                    <label className="label" htmlFor="file"> File: </label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleChange}
                    />
                </div>

                <div className="submit_btn">
                    <button>Submit</button>
                </div>

            </div>
        </form>
    </div>
};

export default Form;