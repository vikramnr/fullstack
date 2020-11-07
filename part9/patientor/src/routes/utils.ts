/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient } from '../types';

const toNewPatient = (object: any) : NewPatient => ({
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
});

const isString = (text: any) : text is string => {
    return typeof text === 'string' || text instanceof String;
 };

const isGender = (param:any) : param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseString = (text:any) : string => {
    if(!isString(text)) {
        throw new Error(`Incorrect or missing ${text}`);
    }
    return text;
};

const parseGender = (gender: any) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing visibility ${gender}`);
    }
    return gender;
};




export default toNewPatient;

