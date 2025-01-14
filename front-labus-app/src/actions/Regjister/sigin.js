
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, verifikimi } from '../SingupAction';
import { Link } from 'react-router-dom';

function Signin() {
  const dispatch = useDispatch();
  const [pacinetData, setPacinetData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setPacinetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newPacinet = {
      email: pacinetData.email,
      password: pacinetData.password,
    };

    const response = await dispatch(login(newPacinet));

    if (response.status) {
      setMessage(response.message);

      const token = response.jwt;
      const verifyResponse = await dispatch(verifikimi(token));

      if (verifyResponse.status) {
        window.location.href = '/qytetiList';
      } else {
        setMessage(verifyResponse.message);
      }
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        
        <h1 className="text-center">login</h1>
        <hr />
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control form-control-lg mt-4"
            placeholder="Employee email"
            name="email"
            value={pacinetData.email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            className="form-control form-control-lg mt-4"
            placeholder="Employee password"
            name="password"
            value={pacinetData.password}
            onChange={onChange}
            required
          />
          <input type="submit" className="btn btn-danger mt-4" value="Login" />
          
          <li className="list-group-item update mr-2">
                            <Link to={"/s"}>
                                <i className="fa fa-edit pr-1"></i>regjistrou
                            </Link>
                        </li>
      
        </form>
        {message && <p>{message}</p>}
      </div>

    </div>
  );
}

export default Signin;


