import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Uupdatespecializimi() {
    const {mjketId}  = useParams();
  return (
    <div className='container mt-3'> 
      <Link to={`update-specializimi/${mjketId}`} className='btn btn-danger'> 
        uptade specializimi
      </Link>
      <hr></hr>
    </div>
  );
}

export default Uupdatespecializimi;