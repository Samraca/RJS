import React, {useState, useEffect} from 'react'
import { getEstadoEquipo } from '../../services/estadoEquipoService';
import { EstadoCard } from '../estados/EstadoCard';
import Swal from 'sweetalert2';
import { EstadoNew } from './EstadoNew';

export const EstadoView = () => {

  const [estados, setEstados] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarEstados = async () =>{
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getEstadoEquipo();
      setEstados(data);
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
    listarEstados();
  }, [])

  const handleOpenModal=()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          estados.map((estado) =>{
            return <EstadoCard key = { estado._id } estadoEquipo={ estado }/>
          })
        }
      </div>
      {
        openModal ? //if terciario
        <EstadoNew listarEstados={ listarEstados} handleOpenModal = { handleOpenModal }/>
        :
        <button className="btn btn-primary fab">
          <i className="fa-solid fa-plus" onClick={handleOpenModal}></i>
        </button>
      }
    </div>
  )
}
