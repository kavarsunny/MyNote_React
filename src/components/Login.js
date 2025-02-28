// import React from 'react'

// const login = () => {

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         fetch()
//         const response = async fetch("http://localhost:5000/api/auth/login", {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
              
//             },
//         })
//         const json=await response.json()
//         console.log(json)
//     }
//   return (
//     <div>
//     <form>
//   <div className="form-group">
//     <label for="Email">Email address</label>
//     <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="emailpassword"placeholder="Enter email">
//     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//   </div>
//   <div className="form-group">
//     <label for="password">Password</label>
//     <input type="password" className="form-control" id="password"name="password" placeholder="Password">
//   </div>
 
//   <button type="submit" className="btn btn-primary"onsubmit={handleSubmit} >Submit</button>
// </form>
//     </div>
//   )
// }

// export default login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
      
        props.showAlert("valid user")
        navigate("/");
      } else {
        props.showAlert("invalid value")
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3 style={{ padding: "20px", textAlign: "center" }}>
  Login to read your notebook
</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Login;

