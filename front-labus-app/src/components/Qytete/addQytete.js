import React, { useState } from 'react';
import { createQyteti } from '../../actions/QyteteAction';
import { useDispatch, useSelector } from 'react-redux';
import useAuthentication from "../../actions/auth";
function AddQyteti() {
  const dispatch = useDispatch();
  const [emri, setName] = useState();
  const errors = useSelector((state) =>state.errorReducerContent);
  const onchange = (event) =>{
    setName(event.target.value);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const newDepartment = {emri};
    dispatch(createQyteti(newDepartment));
    alert('Department created successfully!');
  }
  const isAuthenticated = useAuthentication(); 
  if (isAuthenticated === null) {
      return <p>Loading...</p>;
    }
  
    if (isAuthenticated === false) {
      return window.location.href="/";
    }
  return (
    <div className='container d-flex justify-content-center mt-5'> {/* Përdorimi i d-flex dhe justify-content-center për të vendosur elementet në qendër */}
      <div className='col-md-8'>
        <h5 className='text-center'>Create Department Form</h5>
        <hr />
        <form onSubmit={onSubmit} className='d-flex flex-column'> {/* Përdorimi i d-flex dhe flex-column për vendosjen e elementeve në kolonë */}
          <div className='form-group'>
            <input
              type='text'
              className={`form-control form-control-lg ${errors.emri ? "is-invalid" : ""}`}
              placeholder='Department Name'
              name='emri'
              value={emri}
              onChange={onchange}
            />
            {errors.emri && <p className='invalid-feedback'>{errors.emri}</p>}
          </div>
          <input
            type='submit'
            className='btn btn-primary btn-block mt-4'
            value='Create Department' // Ndryshimi i inputit nga <input> në <button> dhe shtimi i vlerës së tij
          />
        </form>
      </div>
    </div>
  );
}

export default  AddQyteti;
/*import React from 'react'
import { useState } from 'react';
import { createDepartment } from '../../actions/departmentactions';
import { useDispatch,useSelector} from 'react-redux';

function AddDepartment() {

  const dispatch = useDispatch();
  const [name, setName] = useState();
  const errors = useSelector((state) =>state.errorReducerContent);

  const onchange = (event) =>{
    setName(event.target.value);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const newDepartment = {name};
    dispatch(createDepartment(newDepartment));

  }
  return (
    <>
    <div className='row'>
        <div className='col-md-8 m-auto'>
            <h5 className='text-center'>Create Departament Form</h5>
            <hr/>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input 
                    type='text' 
                    className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                    placeholder='Department Name'
                    name='name'
                    onChange={onchange}
                    ></input>
                    {
                      errors.name && <p className='invalid-feedback'>{errors.name}</p>
                    }
                </div>
                    <input 
                    type='submit' 
                    className='btn btn-primary btn-block mt-4'></input>

            </form>
        </div>

    </div>
    </>
  )
}

export default AddDepartment ma beje dhe ky te pershtatet me displayflex */