import axios from "./axios";

export const getPatientsRequest = () => axios.get(`/patient`);
export const createPatientRequest = (patient) => axios.post(`/patient`, patient);
export const deletePatientRequest = (id) => axios.delete(`/patient/${id}`);
export const updatePatientRequest = (id, data) => axios.put(`/patient/${id}`, data);
