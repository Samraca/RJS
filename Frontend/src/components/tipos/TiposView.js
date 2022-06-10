import React, {useState, useEffect} from 'react'
import { getTipoEquipo } from '../../services/tipoEquipoService';
import { TiposCard} from '../tipos/TiposCard';
import Swal from 'sweetalert2';
import { TiposNew } from './TiposNew';

export const TiposView = () => {

  const [tipos, setTipos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarTipos = async () =>{
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getTipoEquipo();
      setTipos(data);
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
    listarTipos();
  }, [])

  const handleOpenModal=()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          tipos.map((tipo) =>{
            return <TiposCard key = { tipo._id } tipo={ tipo }/>
          })
        }
      </div>
      {
        openModal ? //if terciario
        <TiposNew listarTipos={listarTipos} handleOpenModal = { handleOpenModal }/>
        :
        <button className="btn btn-primary fab">
          <i className="fa-solid fa-plus" onClick={handleOpenModal}></i>
        </button>
      }
    </div>
  )
}
