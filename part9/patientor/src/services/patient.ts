import { NonSSNPatients, Patient } from '../types';
import patientData from '../../data/patients';


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

export default {
    getAllPatientData,
    getAllNonSSNPatientData
};

