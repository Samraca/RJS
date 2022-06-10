import React, {useState} from 'react';
import { crearEstadoEquipo } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2'; 

export const EstadoNew = ({handleOpenModal, listarEstados}) => {

    const [valoresForm, setValoresForm ] = useState({});
    const { nombre='', estado=''} = valoresForm;

    const handleOnChange = ({target}) =>{
        const {name,value}=target; 
        setValoresForm({...valoresForm, [name]: value  })
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const estadoEquipo = {
            nombre, estado
        }
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await crearEstadoEquipo(estadoEquipo);
            console.log(data);
            Swal.close();
            handleOpenModal();
            listarEstados();
        }catch(error){
            console.log(error);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje = 'Estamos teniendo problemas en nuestra base de datos, vuelve mas tarde';
            }
            Swal.fire('Error', mensaje, 'error');
        }

    }

  return (
    <div className="sidebar">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="sidebar-header">
                        <h3>Nuevo Estado de Equipo</h3>
                        <i className="fa-solid fa-xmark" onClick={ handleOpenModal }></i>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr />
                </div>
            </div>
            <form onSubmit={(e)=> handleOnSubmit(e)}>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input required type="text" name="nombre" className="form-control" value={nombre} onChange={(e) => handleOnChange(e)}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3">
                        <label className="form-label">Estado</label>
                            <input required type="text" name="estado" className="form-control"value={estado} onChange={(e) => handleOnChange(e)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
 