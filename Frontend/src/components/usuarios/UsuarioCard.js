import React from 'react'
import { Link } from 'react-router-dom'

export const UsuarioCard = (props) => {

    const {usuario} = props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{usuario.nombre}</h5>
                <hr/>
                <p className="card-text">{`Email: ${usuario.email}`}</p>
                <p className="card-text">{`Estado: ${usuario.estado}`}</p>
                <p className="card-text">{`Fecha de Actualizacion: ${usuario.fechaActualizacion}`}</p>
                <p className="card-text">{`Fecha de Creacion: ${usuario.fechaCreacion}`}</p>
                <p >
                    <Link to={`/usuarios/edit/${usuario._id}`}>Ver mas...</Link>
                </p>
             </div>
        </div>
    </div>
  )
}
