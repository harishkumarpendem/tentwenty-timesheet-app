import axios from "./axios";

export const getTimesheets = () =>
  axios.get("/timesheets");

export const createTimesheet = (data) =>
  axios.post("/timesheets", data);

export const updateTimesheet = (id, data) =>
  axios.put(`/timesheets/${id}`, data);

export const deleteTimesheet = (id) =>
  axios.delete(`/timesheets/${id}`);
