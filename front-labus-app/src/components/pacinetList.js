import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuthentication from '../actions/auth';
import { getPacinets } from '../actions/PacinetActions';
import Pacient from './Pacinet/pacinet';


function PacinetList() {
    const { qytetiId ,spitaliId,repartiId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPacinets(qytetiId ,spitaliId,repartiId));
    }, [dispatch,qytetiId ,spitaliId,repartiId]);

    const pacinetlist = useSelector((state) => state.pacinetReducerContent.pacinets);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
  
      
    if (!Array.isArray(pacinetlist)) {
        return <div>No data available</div>;
    }

    return (
        <div className="container">
            <Link to={`/addPacinet/${qytetiId}/${spitaliId}/${repartiId}`} className="btn btn-danger">
                Create Employee
            </Link>
            <hr />
            {pacinetlist.map((pacient) => (
                <Pacient
                    key={pacient.id}
                    pacient={pacient}
                     qytetiId={qytetiId} // Pass qytetiId here
                    spitaliId={spitaliId} 
                    repartiId={repartiId}// Pass spitaliId here
                />
            ))}
        </div>
    );
}

export default PacinetList;