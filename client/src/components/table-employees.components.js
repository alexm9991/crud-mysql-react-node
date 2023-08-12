import React from "react";

export const TableEmployees = ({employees , editEmployee , deleteEmployee}) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Pais</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, key) => {
          return (
            <tr key={employee.id}>
              <th scope="row">{employee.id} </th>
              <td>{employee.nombre} </td>
              <td>{employee.edad} </td>
              <td>{employee.pais} </td>
              <td>{employee.cargo} </td>
              <td>{employee.anios} </td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    onClick={() => {
                      editEmployee(employee);
                    }}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteEmployee(employee);
                    }}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
