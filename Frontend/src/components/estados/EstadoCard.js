import React from 'react'
import { Link } from 'react-router-dom'

export const EstadoCard = (props) => {

    const { estadoEquipo } = props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{estadoEquipo.nombre}</h5>
                <hr/>
                <p className="card-text">{`Estado: ${estadoEquipo.estado}`}</p>
                <p className="card-text">{`Fecha de Actualizacion: ${estadoEquipo.fechaActualizacion}`}</p>
                <p className="card-text">{`Fecha de Creacion: ${estadoEquipo.fechaCreacion}`}</p>
                <p >
                    <Link to={`/estadoEquipos/edit/${estadoEquipo._id}`}>Ver mas...</Link>
                </p>
             </div>
        </div>
    </div>
  )
}
