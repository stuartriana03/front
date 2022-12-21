import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Login = () => {
  const navigate= useNavigate();

  const [usuario, setUsuario] = useState({
    email:'',
    password:'',
  })

  const { email, password} = usuario;

  const onChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  
  const autenticarUsuario = async () =>{
    const data = {
      email: usuario.email,
      password: usuario.password
      }

      const response = await crud.POST (`/api/auth`, data);
      const mensaje = response.msg;
      console.log(mensaje);
      if (mensaje === "El usuario no existe"){
        const mensaje = "El usuario no existe";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons:{
          confirm:{
            text:'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      })
      }else if(mensaje === "Password incorrecto"){
        const mensaje = "Password incorrecto";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons:{
            confirm:{
              text:'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        })
      }else{

        const jwt= response.token;
        localStorage.setItem("token", jwt);
        
        navigate("/admin");
      }
    }
    const onSubmit = (e) => {
      e.preventDefault();
      autenticarUsuario();
    }
    return (
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/2">
          <h1 className="inline bg-gradient-to-r from-indigo-200 via-red-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                E-commerce Compra-YA!!!
          </h1>
          <form 
            className="my-10 bg-white shadow-orange-500 rounded-lg p-10"
            onSubmit={onSubmit}>
            <div className= "my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input
                type="email" 
                id= "email"
                name="email"
                placeholder="Email de Registro"
                className="w-full mt-3 p-3 border rounder-lg bg-gray-50"
                value= {email}
                onChange= {onChange}/>

              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input
                type= "password"
                id= "password"
                name="password"
                placeholder="Password de Ingreso"
                className="w-full mt-3 p-3 border rounder-lg bg-gray-50"
                value={password}
                onChange={onChange}/>
              </div>

              <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
            <Link to ={"/crear-cuenta"} className="block text-center my-5 text-violet-600 uppercase text-sm">Crear Cuenta</Link>
            
          </form>
        </div>
        
      </main>
    );
}

export default Login;