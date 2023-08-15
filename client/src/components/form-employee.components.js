import React from "react";
import PropTypes from "prop-types";
// Services
import { EmployeeService } from "../services/employees.services";
// Utils
import { Alert } from "../utils/alert";
// Components
import { InputGroup } from "./input-group.components";

export const FormEmployee = ({ edit, employee, setEmployee, refreshData }) => {
  const handleChangeForm = (event) => {
    const { value, name } = event.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const addEmployee = async () => {
    try {
      await EmployeeService.add(employee);
      Alert.showSuccess(
        "<strong>Registro Exitoso!</strong>",
        `<i>El empleado <strong>${employee.nombre}</strong> fue registrado con éxito</i>`
      );
      refreshData();
    } catch (error) {
      Alert.showError("No se logró registrar el empleado!");
      console.log(error);
    }
  };

  const updateEmployee = async () => {
    try {
      await EmployeeService.update(employee);

      Alert.showSuccess(
        "<strong>Actualización Exitosa!</strong>",
        `<i>El empleado <strong>${employee.nombre}</strong> fue actualizado con éxito</i>`
      );
      refreshData();
    } catch (error) {
      Alert.showError("No se logró actualizar el empleado!");
      console.log(error);
    }
  };

  return (
    <div className="card text-center">
      <div className="card-header">GESTIÓN DE EMPLEADOS</div>

      <div className="card-body">
        <InputGroup
          span="Nombre:"
          type="text"
          handleChangeForm={handleChangeForm}
          employee={employee.nombre}
          placeholder="Ingrese un nombre"
          name="nombre"
          arialabel="Nombre"
        />

        <InputGroup
          span="Edad:"
          type="number"
          handleChangeForm={handleChangeForm}
          employee={employee.edad}
          placeholder="Ingrese su edad"
          name="edad"
          arialabel="Edad"
        />

        <InputGroup
          span="País:"
          type="text"
          handleChangeForm={handleChangeForm}
          employee={employee.pais}
          placeholder="Ingrese un país"
          name="pais"
          arialabel="Pais"
        />

        <InputGroup
          span="Cargo:"
          type="text"
          handleChangeForm={handleChangeForm}
          employee={employee.cargo}
          placeholder="Ingrese su cargo"
          name="cargo"
          arialabel="cargo"
        />

        <InputGroup
          span="Años"
          type="number"
          handleChangeForm={handleChangeForm}
          employee={employee.anios}
          placeholder="Ingrese sus años de experiencia"
          name="anios"
          arialabel="anios"
        />
      </div>

      <div className="card-footer text-muted">
        {edit ? (
          <div>
            <button className="btn btn-warning m-2" onClick={updateEmployee}>
              Actualizar
            </button>
            <button className="btn btn-danger m-2" onClick={refreshData}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={addEmployee}>
            Registrar
          </button>
        )}
      </div>
    </div>
  );
};

FormEmployee.propsTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    edad: PropTypes.number,
    pais: PropTypes.string,
    cargo: PropTypes.string,
    anios: PropTypes.number,
  }).isRequired,
  setEmployee: PropTypes.func.isRequired,
  getListEmployees: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  refreshData: PropTypes.func.isRequired,
};
