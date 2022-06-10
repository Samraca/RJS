import React, {useState, useEffect} from 'react'
import { getMarca } from '../../services/marcaService';
import { MarcaCard } from '../marcas/MarcaCard';
import Swal from 'sweetalert2';
import { MarcaNew } from './MarcaNew';

export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarMarcas = async () =>{
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const {data} = await getMarca();
      setMarcas(data);
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
    listarMarcas();
  }, [])

  const handleOpenModal=()=>{
    setOpenModal(!openModal);
  }

  return (
    <div className="container-fluid">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-3 g-4">
        {
          marcas.map((marca) =>{
            return <MarcaCard key = { marca._id } marca={ marca }/>
          })
        }
      </div>
      {
        
        openModal ? //if terciario
        <MarcaNew listarMarcas={listarMarcas} handleOpenModal = { handleOpenModal }/>
        :
        <button className="btn btn-primary fab">
          <i className="fa-solid fa-plus" onClick={handleOpenModal}></i>
        </button>
      }
    </div>
  )
}
