import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventarioPorId, editInventario } from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarca } from '../../services/marcaService';
import { getTipoEquipo } from '../../services/tipoEquipoService';
import { getEstadoEquipo } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2'; 

export const InventarioUpdate = () => {
    const { id = '' } = useParams();
    const [inventario, setInventario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [valoresForm, setValoresForm ] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', 
            fechaCompra = '', precio = '', usuario, marca, tipo, estado } = valoresForm;

    const getInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
              });
              Swal.showLoading();
            const {data} = await getInventarioPorId(id);
            setInventario(data);
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
        getInventario();
    }, [ id ]);

    useEffect(() =>{
            setValoresForm({
                serial: inventario.serial,
                modelo: inventario.modelo,
                descripcion: inventario.descripcion,
                color: inventario.color,
                foto: inventario.foto,
                fechaCompra: inventario.fechaCompra,
                precio: inventario.precio,
                usuario: inventario.usuario,
                marca: inventario.marca,
                tipo: inventario.tipoEquipo,
                estado: inventario.estadoEquipo,
            });
    }, [ inventario ]);

    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio, 
            usuario:{
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                _id: tipo
            },
            estadoEquipo: {
                _id: estado
            }
        }
        try{
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const {data} = await editInventario(id, inventario);
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

    const handleOnChange = ({target}) =>{
        const {name,value}=target;
        setValoresForm({...valoresForm, [name]: value  })
    }

    const listarUsuarios = async ()=>{
        try{
            const { data } = await getUsuarios()
            setUsuarios(data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect( ()=>{
       listarUsuarios();
    }, [])

    const listarMarcas = async () =>{
        try{
            const { data } = await getMarca()
            setMarcas(data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect( ()=>{
        listarMarcas();
    }, [])

    const listarTipos= async ()=>{
        try{
            const { data } = await getTipoEquipo()
            setTipos(data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect( ()=>{
        listarTipos();
    }, [])

    const listarEstados = async () =>{
        try{
            const { data } = await getEstadoEquipo()
            setEstados(data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect( ()=>{
        listarEstados();
    }, [])

    return (
        <div className="container-fluid mt-3 mb-2">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Detalle Activo</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-5">
                            <img src={inventario?.foto} alt=""/>
                        </div>
                        <div className="col-md-7">
                            <form onSubmit={(e)=> handleOnSubmit(e)}>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input required type="text" name="serial" className="form-control" value={serial} onChange={(e) => handleOnChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Modelo</label>
                                            <input required type="text" name="modelo" className="form-control" value={modelo} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <input required type="text" name="descripcion" className="form-control"value={descripcion} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <input required type="text" name="color" className="form-control"value={color} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Foto</label>
                                            <input required type="text" name="foto" className="form-control"value={foto} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Compra</label>
                                            <input required type="date" name="fechaCompra" className="form-control"value={fechaCompra} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input required type="number" name="precio" className="form-control"value={precio} onChange={(e) => handleOnChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Usuario</label>
                                            <select required className="form-select" onChange={(e) => handleOnChange(e)} name="usuario" value={usuario}>
                                                <option value="">--SELECCIONE--</option>
                                                    {
                                                        usuarios.map(({_id, nombre}) =>{
                                                            return <option key={_id} value={_id}>{nombre}</option>
                                                        })
                                                    }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Marca</label>
                                            <select required className="form-select" onChange={(e) => handleOnChange(e)} name="marca" value={marca}>
                                                <option value="">--SELECCIONE--</option>
                                                    {
                                                        marcas.map(({_id, nombre}) =>{
                                                            return <option key={_id} value={_id}>{nombre}</option>
                                                        })
                                                    }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Tipo Equipo</label>
                                            <select required className="form-select" onChange={(e) => handleOnChange(e)} name="tipo" value={tipo}>
                                                <option value="">--SELECCIONE--</option>
                                                    {
                                                        tipos.map(({_id, nombre}) =>{
                                                            return <option key={_id} value={_id}>{nombre}</option>
                                                        })
                                                    }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Estado Equipo</label>
                                            <select required className="form-select" onChange={(e) => handleOnChange(e)} name="estado" value={estado}>
                                            <option value="">--SELECCIONE--</option>
                                                {
                                                    estados.map(({_id, nombre}) =>{
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>
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
                </div>
            </div>
        </div>
    )
}