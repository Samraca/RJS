import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getUsuarioPorId, editUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2'; 

export const UsuarioUpdate = () => {

    const { userId = '' } = useParams();
    const [valoresForm, setValoresForm ] = useState({});
    const [usuario, setUsuario] = useState([]);
    const { nombre='', email='', estado=''} = valoresForm;

    const getUsuario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
              });
              Swal.showLoading();
            const {data} = await getUsuarioPorId(userId);
            setUsuario(data);
            Swal.close();
        } catch(error){
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

    useEffect (()=>{
        getUsuario();
    }, [ userId ]);

    const handleOnChange = ({target}) =>{
        const {name,value}=target;
        setValoresForm({...valoresForm, [name]: value  })
    }

    useEffect(() =>{
        setValoresForm({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
        });
    }, [ usuario ]);

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const usuario = {
            nombre, email, estado
        }
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await editUsuario(userId, usuario);
            Swal.close();
        }catch(error){
            console.log(error);
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje = 'Ocurrio un error, verfica los campos ingresados';
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
                        <h3>Detalle Activo</h3>
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
                            <label className="form-label">Email</label>
                            <input required type="text" name="email" className="form-control"value={email} onChange={(e) => handleOnChange(e)}/>
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
