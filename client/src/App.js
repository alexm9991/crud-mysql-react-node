import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Alert } from "./utils/alert";
import { EmployeeService } from "./services/employees.services";
import { TableEmployees } from "./components/table-employees.components";

const initialEmployeeState = {
  id: "",
  nombre: "",
  edad: "",
  pais: "",
  cargo: "",
  anios: "",
};

function App() {
  const [employee, setEmployee] = useState(initialEmployeeState);

  const [edit, setedit] = useState(false);

  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getListEmployees();
  }, []);

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

      getListEmployees();
      cleanFiles();

      Alert.showSuccess(
        "<strong>Registro Exitoso!</strong>",
        `<i>El empleado <strong>${employee.nombre}</strong> fue registrado con éxito</i>`
      );
    } catch (error) {
      Alert.showError("No se logró registrar el empleado!");
      console.log(error);
    }
  };

  const editEmployee = (employee) => {
    setedit(true);

    setEmployee(employee);
  };

  const getListEmployees = async () => {
    const { data } = await EmployeeService.getList();
    setEmployeesList(data);
  };

  const updateEmployee = async () => {
    try {
      await EmployeeService.update(employee);

      getListEmployees();
      cleanFiles();

      Alert.showSuccess(
        "<strong>Actualización Exitosa!</strong>",
        `<i>El empleado <strong>${employee.nombre}</strong> fue actualizado con éxito</i>`
      );
    } catch (error) {
      Alert.showError("No se logró actualizar el empleado!");
      console.log(error);
    }
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

  const cleanFiles = () => {
    setEmployee(initialEmployeeState);
    setedit(false);
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={handleChangeForm}
              className="form-control"
              value={employee.nombre}
              placeholder="Ingrese un nombre"
              name="nombre"
              aria-label="Nombre"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              onChange={handleChangeForm}
              className="form-control"
              value={employee.edad}
              placeholder="Ingrese su edad"
              name="edad"
              aria-label="Edad"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              País:
            </span>
            <input
              type="text"
              onChange={handleChangeForm}
              className="form-control"
              value={employee.pais}
              placeholder="Ingrese un país"
              name="pais"
              aria-label="Pais"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              onChange={handleChangeForm}
              className="form-control"
              value={employee.cargo}
              placeholder="Ingrese un cargo"
              name="cargo"
              aria-label="Cargo"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              onChange={handleChangeForm}
              className="form-control"
              value={employee.anios}
              placeholder="Ingrese un nombre"
              name="anios"
              aria-label="Anios"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="card-footer text-muted">
          {edit ? (
            <div>
              <button className="btn btn-warning m-2" onClick={updateEmployee}>
                Actualizar
              </button>
              <button className="btn btn-danger m-2" onClick={cleanFiles}>
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

      <TableEmployees
        employees={employeesList}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default App;
