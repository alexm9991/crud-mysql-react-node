import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Services
import { EmployeeService } from "../services/employees.services";
// Utils
import { Alert } from "../utils/alert";
// Components
import { TableEmployees } from "../components/table-employees.components";
import { FormEmployee } from "../components/form-employee.components";
import { initialEmployeeState } from "../components/initial-state-employee";

export const EmployeeView = () => {
  const [edit, setedit] = useState(false);
  const [employee, setEmployee] = useState(initialEmployeeState);

  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getListEmployees();
  }, []);

  const getListEmployees = async () => {
    const { data } = await EmployeeService.getList();
    setEmployeesList(data);
  };

  const cleanFiles = () => {
    setEmployee(initialEmployeeState);
    setedit(false);
  };

  const refreshData = () => {
    getListEmployees();
    cleanFiles();
  };

  const editEmployee = (employee) => {
    setedit(true);
    setEmployee(employee);
  };

  const deleteEmployee = async (employee) => {
    const { isConfirmed } = await Alert.showConfirm(
      `Desea borrar el empleado <strong>${employee.nombre}</strong> ?`
    );

    if (!isConfirmed) return;

    try {
      await EmployeeService.delete(employee.id);

      getListEmployees();
      cleanFiles();

      Alert.showSuccess(
        `El empleado <strong>${employee.nombre}</strong> fue eliminado con éxito`
      );
    } catch (error) {
      Alert.showError("No se logró eliminar el empleado!");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <FormEmployee {...{ employee, setEmployee, getListEmployees, edit, refreshData }} />

      <TableEmployees
        employees={employeesList}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};
