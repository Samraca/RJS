import { axiosInstance } from '../helpers/axios-config';

const getInventarios = () =>{
    return axiosInstance.get('inventario', {
        headers:{
            'Content-type':'application/json'
        }
    });
}

const crearInventario = (data) =>{
    return axiosInstance.post('inventario', data, {
        headers:{
            'Content-type':'application/json'
        }
    });
}

const editInventario = (inventarioId, data) =>{
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers:{
            'Content-type':'application/json'
        }
    });
}

const getInventarioPorId = ( inventarioId ) =>{
    return axiosInstance.get(`inventario/${inventarioId}`, {
        headers:{
            'Content-type':'application/json'
        }
    });
}

export {
    getInventarios, crearInventario, editInventario, getInventarioPorId
}