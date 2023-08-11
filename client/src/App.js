import './App.css';
import { useState, useEffect } from "react";
import  Axios  from "axios";
import { BASE_API } from './utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {

  const [ nombre, setNombre ] = useState("");
  const [ edad, setEdad ] = useState();
  const [ pais, setPais ] = useState("");
  const [ cargo, setCargo ] = useState("");
  const [ anios, setAnios ] = useState();
  const [ id, setId ] = useState();

  const [ editar, setEditar ] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, [])

  const add = () => {
    Axios.post(`${BASE_API}/create`, {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();

      Swal.fire({
        title: "<strong>Registro Exitoso!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue registrado con éxito</i>`,
        icon: 'success',
        timer:2000
      })

    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title:'Oops...',
        text:'No se logró registrar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get(`${BASE_API}/empleados`).then((response)=>{
      setEmpleados(response.data);
    });
  };

  const update = () => {
    Axios.put(`${BASE_API}/update`, {
      id:id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();

      Swal.fire({
        title: "<strong>Actualización Exitosa!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue actualizado con éxito</i>`,
        icon: 'success',
        timer:2000
      })

    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title:'Oops...',
        text:'No se logró actualizar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const deleteEmp = (val) => {

    Swal.fire({
      title: 'Está seguro?',
      html: `Desea borrar el empleado <strong>${val.nombre}</strong> ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`${BASE_API}/delete/${val.id}`).then(()=>{
            getEmpleados();
            limpiarCampos();
            Swal.fire({
              icon: 'success',
              title:`El empleado <strong>${val.nombre}</strong> fue eliminado con éxito`,
              showConfirmButton:false,
              timer:2000
            });
          }).catch(function(error){
            Swal.fire({
              icon: 'error',
              title:'Oops...',
              text:'No se logró eliminar el empleado!',
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            });
          });
          }
        })
  };


  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false)
  }

  return (
    <div className="container">

      <div className="card text-center">

        <div className="card-header">
            GESTIÓN DE EMPLEADOS
        </div>

        <div className="card-body">

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event)=>{
              setNombre(event.target.value);
              }}
              className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number"
              onChange={(event)=>{
              setEdad(event.target.value);
              }}
              className="form-control" value={edad} placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País:</span>
            <input type="text"
              onChange={(event)=>{
              setPais(event.target.value);
              }}
              className="form-control" value={pais} placeholder="Ingrese un país" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text"
              onChange={(event)=>{
              setCargo(event.target.value);
              }}
              className="form-control" value={cargo} placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
            <input type="number"
              onChange={(event)=>{
              setAnios(event.target.value);
              }}
              className="form-control" value={anios} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

        </div>

        <div className="card-footer text-muted">

          {
            editar?
            <div>
              <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
              <button className='btn btn-danger m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :
            <button className='btn btn-success' onClick={add}>Registrar</button>

          }
        </div>

      </div>

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

          {
            empleadosList.map((val,key)=>{
            return <tr key={val.id}>
                      <th scope="row">{val.id} </th>
                      <td>{val.nombre} </td>
                      <td>{val.edad} </td>
                      <td>{val.pais} </td>
                      <td>{val.cargo} </td>
                      <td>{val.anios} </td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={ () => {
                            editarEmpleado(val);
                          } }
                          className="btn btn-info">Editar</button>
                          <button type="button"
                          onClick = {() => {
                            deleteEmp(val);
                          }}className="btn btn-danger">Eliminar</button>
                        </div>                      
                      </td>
                    </tr>
                  
            })
          }

          </tbody>
      </table>

    </div>
  );
}

export default App;
