import React from 'react';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();
  
  const cerrarSesion = () =>{
    localStorage.removeItem("token");
    navigate("/");
}
  return (
    <header className="px-4 py-5 bg-yellow-200 border-b">
    <div className="md:flex md:justify-between">
      <h2 className="text-4xl text-red-600 font-bold text-center mb-5 md:mb-0">
        Panel de Administrador de la aplicacion
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-4">
      <input type="submit"
        value="Cerrar Sesión"
        className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
        onClick={cerrarSesion}
      />
      </div>
    </div>
  </header>
    );
}

export default Header;