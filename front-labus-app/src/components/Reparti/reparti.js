import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteReparti } from '../../actions/RepartiActions';

function Reparti({ reparti, qytetiId, spitaliId }) { // Destructure props here
    const dispatch = useDispatch();

    const onDeleteTaskClick = (qytetiId, spitaliId, repartiId) => {
        console.log('qytetiId:', qytetiId); // Debug: Log the qytetiId
        console.log('spitaliId:', spitaliId); // Debug: Log the spitaliId
        console.log('repartiId:', repartiId); // Debug: Log the repartiId
        dispatch(deleteReparti(qytetiId, spitaliId, repartiId));
        window.location.reload();
    };

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h2>{reparti.name}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'>
                        <Link to={`/pacinetList/${qytetiId}/${spitaliId}/${reparti.id}`} className='list-group-item'>
                                Pacinetet
                            </Link>
                            <Link to={`/infermiertList/${qytetiId}/${spitaliId}/${reparti.id}`} className='list-group-item'>
                                Infermiert
                            </Link>

                            <Link to={`/mjeketList/${qytetiId}/${spitaliId}/${reparti.id}`} className='list-group-item'>
                                Mjeket board
                            </Link>
                            <Link to={`/updateRepartiform/${qytetiId}/${spitaliId}/${reparti.id}`} className='list-group-item'>
                                Update board
                            </Link>
                            <button
                                onClick={() => onDeleteTaskClick(qytetiId, spitaliId, reparti.id)}
                                className='list-group-item list-group-item-action'
                            >
                                Delete board
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reparti;
/*import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteReparti } from '../../actions/RepartiActions';
function Reparti(props) {
    const dispatch = useDispatch();
    const {reparti} = props;
    const qytetiId = props.qytetiId;
    const spitaliId = props.spitaliId;
   

    const onDeleteTaskClik = (qytetiId,spitaliId,repartiId) =>{
        dispatch(deleteReparti(qytetiId,spitaliId,repartiId));
        console.log('qytetId:', qytetiId);  // Debug: Log the qytetId
        console.log('spitaliId:', spitaliId);  // Debug: Log the spitaliId
        console.log('repartiId:', repartiId);  // Debug: Log the repartiId
       // window.location.reload();
    }

    return (
        <div className='container d-flex flex-row'>
            <div className='card card-body'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div className='container'>
                            <h2>{reparti.name}</h2>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <ul className='list-group d-flex flex-column'>
                            <Link to={`/employeeList/${reparti.id}`} className='list-group-item'>
                                Qyteti board
                            </Link>
                            <Link to={`/updateQytetiform/${reparti.id}`} className='list-group-item'>
                                Update board
                            </Link>
                            <button
                                onClick={() => onDeleteTaskClik(qytetiId, spitaliId, reparti.id)}
                                className='list-group-item list-group-item-action'
                            >
                                Delete board
                            </button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reparti;*/
