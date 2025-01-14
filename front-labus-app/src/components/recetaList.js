import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecetas } from '../actions/RecetaAction';
import Receta from './Receta/receta';
import useAuthentication from '../actions/auth';

function RecetaList() {
    const receptailist = useSelector((state) => state.recetetaReducerContent.recetas);
    const { repartiId, mjekuId } = useParams();  
    const dispatch = useDispatch();

   
    useEffect(() => {
        dispatch(getRecetas(repartiId, mjekuId));
    }, [dispatch, repartiId, mjekuId]);

    const isAuthenticated = useAuthentication(); 
    if (isAuthenticated === null) {
        return <p>Loading...</p>;
      }
    
      if (isAuthenticated === false) {
        return window.location.href="/";
      }
    
    return (
        <div className="container">
            <Link to={`/addreceta/${mjekuId}`} className="btn btn-danger">
                Create Receta
            </Link>
            <hr />
            {receptailist.map((receta) => (
                <Receta
                    key={receta.id}
                    receta={receta}
                    mjekuId={mjekuId}
                    repartiId={repartiId}
                />
            ))}
        </div>
    );
}

export default RecetaList;
