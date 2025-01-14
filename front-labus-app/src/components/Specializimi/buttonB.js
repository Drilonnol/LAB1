import React from 'react';
import { Link, useParams } from 'react-router-dom';

function CreatespecializimiButton() {
    const {mjketId}  = useParams();
  return (
    <div className='container mt-3'> 
      <Link to={`/create-specializimi/${mjketId}`} className='btn btn-danger'> 
        Create specializimi
      </Link>
      <hr></hr>
    </div>
  );
}

export default CreatespecializimiButton;