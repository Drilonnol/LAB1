
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUser } from '../SingupAction';
function SignupPage() {
    const dispatch = useDispatch();
    const [pacinetData, setPacinetData] = useState({
        fullName: "",
        email: "",
        password: "",
        mobile: ""
    });

    const onChange = (event) => {
        const { name, value } = event.target;
        setPacinetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const newPacinet = {
          fullName: pacinetData.fullName,
          email: pacinetData.email,
          password: pacinetData.password,
          mobile: pacinetData.mobile,
          role: "ROLE_CUSTOMER",
        };
        dispatch(createUser(newPacinet));
    };
    return (
      <div className="row">
          <div className="col-md-10 m-auto">
              <h1 className="text-center">regjistrou</h1>
              <hr />
              <form onSubmit={onSubmit}>
                  <input
                      type="text"
                      className={`form-control form-control-lg mt-4`}
                      placeholder="Employee name"
                      name="fullName"
                      value={pacinetData.fullName}
                      onChange={onChange}
                      required
                  />
                  <input
                      type="text"
                      className={`form-control form-control-lg mt-4`}
                      placeholder="Employee address"
                      name="email"
                      value={pacinetData.email}
                      onChange={onChange}
                      required
                  />
                  <input
                      type="text"
                      className={`form-control form-control-lg mt-4`}
                      placeholder="Employee email"
                      name="password"
                      value={pacinetData.password}
                      onChange={onChange}
                      required
                  />
                  <input
                      type="text"
                      className={`form-control form-control-lg mt-4`}
                      placeholder="Employee phone number"
                      name="mobile"
                      value={pacinetData.mobile}
                      onChange={onChange}
                      required
                  />
                  <input type="submit" className="btn btn-danger mt-4" value="Create Employee" />
              </form>
          </div>
      </div>
  ); 
} 

export default SignupPage; 

