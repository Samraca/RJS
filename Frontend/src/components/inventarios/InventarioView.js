import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';
import { InventarioCard} from '../inventarios/InventarioCard';
import { InventarioNew } from '../inventarios/InventarioNew';
import Swal from 'sweetalert2'; 

export const InventarioView = () => {
  const [inventarios, setInventarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarInventarios = async () =>{
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getInventarios();
      setInventarios(data);
      Swal.close();
    }catch (error){
      console.log(error);
      Swal.close();
      let mensaje;
      if(error && error.response && error.response.data){
        mensaje = error.response.data;
      }else{
        mensaje = 'El servicio no se encuentra disponible actualmente, vuelve mas tarde';
      }
      Swal.fire('Error', mensaje, 'error');
    }
  }
  
  useEffect(()=>{
    listarInventarios();
  }, [])

  const handleOpenModal=()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          inventarios.map((inventario) =>{
            return <InventarioCard key = { inventario._id } inventario={ inventario }/>
          })
        }
      </div>
      {
        openModal ? //if terciario
        <InventarioNew listarInventarios = {listarInventarios} handleOpenModal = { handleOpenModal }/>
        :
        <button className="btn btn-primary fab">
          <i className="fa-solid fa-plus" onClick={handleOpenModal}></i>
        </button>
      }
    </div>
  )
}
