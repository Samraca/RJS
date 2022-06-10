import React, {useState, useEffect} from 'react'
import { getUsuarios } from '../../services/usuarioService';
import { UsuarioCard} from '../usuarios/UsuarioCard';
import Swal from 'sweetalert2';
import { UsuarioNew } from './UsuarioNew';

export const UsuariosView = () => {

  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarUsuarios = async () =>{
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getUsuarios();
      setUsuarios(data);
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
    listarUsuarios();
  }, [])

  const handleOpenModal=()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          usuarios.map((usuario) =>{
            return <UsuarioCard key = { usuario._id } usuario={ usuario }/>
          })
        }
      </div>
      {
        openModal ? //if terciario
        <UsuarioNew listarUsuarios={listarUsuarios} handleOpenModal = { handleOpenModal }/>
        :
        <button className="btn btn-primary fab">
          <i className="fa-solid fa-plus" onClick={handleOpenModal}></i>
        </button>
      }
    </div>
  )
}
