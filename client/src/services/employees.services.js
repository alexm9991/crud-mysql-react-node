import Axios from "axios";
import { BASE_API } from "../utils/constants";

export const EmployeeService = {
  add: (employee) => {
    return Axios.post(`${BASE_API}/create`, employee);
  },

  getList: () => {
    return Axios.get(`${BASE_API}/empleados`);
  },

  update: (employee) => {
    return Axios.put(`${BASE_API}/update`, employee);
  },

  delete: (id) => {
    return Axios.delete(`${BASE_API}/delete/${id}`)
  },
};
