import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from "../conexiones/crud.js";
import swal from 'sweetalert';


const Admin = () => {

  const navigate= useNavigate();

  // validar existencia de token para evitar la entrada a la direccion de navegacion
  useEffect(()=>{
    const autenticarUsuario= async ()=> {
      const token= localStorage.getItem("token")
      //console.log(token);
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]); //[]el useEffect se ejecutara solo una vez

  const [categoria, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria`);
    //console.log(response);
    setCategorias(response.categoria);
  }
  useEffect(() => {
    cargarCategorias();
  },[]) 

  const borrarCategoria = async (idCategoria) => {
    swal({
      title: "Estas seguro de eliminar la categoria?",
      text: "Una vez eliminado, no se podra recuperar esta categoria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        
        if(response){
          swal("Tu categoria ha sido borrada correctamente", {
            icon: "success",
          });
        }
    cargarCategorias();
  } else {
    swal("Se cancelo la accion");
  }
});
  }

    return (
      <>
      <Header/>
      <div className="md:flex md:min-h-screen">
      <Sidebar/>
      <main className="flex-1">
      <h1 className="inline bg-gradient-to-r from-indigo-200 via-red-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
        Listado de Categorias
      </h1>
      <table className="table table-bordered">
        <thead className="bg-white">
          <tr>
            <th style={{width:"10%"}}>Imagen</th>
            <th style={{width:"75%"}}>Nombre</th>
            <th style={{width:"15%"}}>Opciones</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {
            categoria.map(
              item => 
              <tr key={item._id}>
                <td><img src={item.imagen}></img></td>
                <td>{item.nombre}</td>
                <td>
                  <Link to= {`/home-productos/${item._id}`}
                  >Crear Producto</Link>&nbsp;&nbsp;
                  <Link to={`/actualizar-categoria/${item._id}`}>
                    Editar
                  </Link>&nbsp;&nbsp;
                  <button onClick={()=> borrarCategoria(item._id)}>
                    Eliminar
                  </button>
                </td>               
              </tr>
            )
          }
        </tbody>        
      </table>
    </main>
    </div>
      
    </>
  );
}

export default Admin;