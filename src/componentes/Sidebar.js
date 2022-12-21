import React from 'react';
import {Link} from 'react-router-dom';



const Sidebar = () => {

  return (
    <aside className="md:w-60 lg:w-90 px-5 py-10 bg-gray-500">
      <p className="text-x1 font-bold">Administrador</p>
      <Link to ={"/crear-categorias"} className="bg-red-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg">
        Crear Categorias</Link>
    </aside>
  );
}

export default Sidebar;