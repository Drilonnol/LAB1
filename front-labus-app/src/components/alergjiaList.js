import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import{ useDispatch, useSelector } from 'react-redux';
import { getAlergjit } from '../actions/AlergjiaActions'; 
import Alergjia from './Alergjia/alergjia';
import useAuthentication from '../actions/auth';
function AlergjiaList() {
    const { repartiId, pacinetiId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlergjit(repartiId, pacinetiId));
    }, [dispatch, repartiId, pacinetiId]);

    const repartilist = useSelector((state) => state.alergjiaReducerContent.alergjis);
    const isAuthenticated = useAuthentication();  
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    return (
        <div className="container">
            <Link to={`/createAlergjiaForm/${repartiId}/${pacinetiId}`} className="btn btn-danger">
                Create Alergji
            </Link>
            <hr />
            {repartilist.map((alergjia) => (
                <Alergjia
                    key={alergjia.id}
                    alergjia={alergjia}
                    repartiId={repartiId} // Pass qytetiId here
                    pacinetiId={pacinetiId} // Pass spitaliId here
                />
            ))}
        </div>
    );
}

export default AlergjiaList;