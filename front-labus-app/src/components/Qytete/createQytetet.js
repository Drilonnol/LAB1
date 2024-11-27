import React from 'react';
import { Link } from 'react-router-dom';

function CreateQytetButton() {
  return (
    <div className='container mt-3'> 
      <Link to='/createQytetiForm' className='btn btn-danger'> 
        Create Qytetin
      </Link>
      <hr></hr>
    </div>
  );
}

export default CreateQytetButton;
