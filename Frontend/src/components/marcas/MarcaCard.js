import React from 'react'
import { Link } from 'react-router-dom'

export const MarcaCard = (props) => {

    const {marca} = props;

  return (
    <div className="col">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{marca.nombre}</h5>
                <hr/>
                <p className="card-text">{`Estado: ${marca.estado}`}</p>
                <p className="card-text">{`Fecha de Actualizacion: ${marca.fechaActualizacion}`}</p>
                <p className="card-text">{`Fecha de Creacion: ${marca.fechaCreacion}`}</p>
                <p >
                    <Link to={`/marcas/edit/${marca._id}`}>Ver mas...</Link>
                </p>
             </div>
        </div>
    </div>
  )
}
