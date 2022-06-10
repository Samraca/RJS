import React from 'react'
import { Link } from 'react-router-dom'

export const TiposCard = (props) => {

  const { tipo } = props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{tipo.nombre}</h5>
                <hr/>
                <p className="card-text">{`Estado: ${tipo.estado}`}</p>
                <p className="card-text">{`Fecha de Actualizacion: ${tipo.fechaActualizacion}`}</p>
                <p className="card-text">{`Fecha de Creacion: ${tipo.fechaCreacion}`}</p>
                <p >
                    <Link to={`/tipoEquipos/edit/${tipo._id}`}>Ver mas...</Link>
                </p>
             </div>
        </div>
    </div>
  )
}
