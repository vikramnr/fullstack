import { Diagnosis } from '../types';
import diagnosisData from '../../data/diagnosis';


const getAllDiagnosisData = () : Diagnosis[] => {
    return diagnosisData;
};

export default {
    getAllDiagnosisData
};

