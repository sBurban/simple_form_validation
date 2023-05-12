export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type StudentSkills = {
    html: boolean,
    css: boolean,
    javascript: boolean
}
export interface FormState  {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    telephone: string,
    dateOfBirth: string,
    favoriteColor: string,
    weight: number|string,
    gender: Gender,
    file: File|null,
    bio: string,
    skills: StudentSkills,
}

export type FormErrorState = Record<keyof FormState, (null|string)>;