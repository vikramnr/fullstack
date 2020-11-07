export interface Diagnosis {
    code: string;
    name: string;
    latin?:string
}

export type NonSSNPatients = Omit <Patient,'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'others'
}

export type NewPatient = Omit<Patient,'id'>;

export interface Patient {
    id: string;
    name:string;
    dateOfBirth: string;
    ssn:string;
    gender:string;
    occupation:string;
}