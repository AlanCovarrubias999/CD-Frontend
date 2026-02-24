import axios from "./axios";

export const getAppointmentsRequest = () => axios.get(`/appointments`);
export const createAppointmentRequest = (appointment) => axios.post(`/appointments`, appointment);
export const deleteAppointmentRequest = (id) => axios.delete(`/appointments/${id}`);
export const updateAppointmentRequest = (id, data) => axios.put(`/appointments/${id}`, data);