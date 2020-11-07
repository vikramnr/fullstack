/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NonSSNPatients, Patient, NewPatient } from '../types';
import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';



const getAllPatientData = () : Patient[] => {
    return patientData;
};

const getAllNonSSNPatientData = (): NonSSNPatients[] => {
    return patientData.map(({id,name,dateOfBirth,gender,occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNewPatient = (patient: NewPatient) : Patient => {
    const newPatinet  = {
        
        id: uuidv4() as string,
        ...patient
    };
    patientData.push(newPatinet);
    return newPatinet;
};

export default {
    getAllPatientData,
    getAllNonSSNPatientData,
    addNewPatient
};

