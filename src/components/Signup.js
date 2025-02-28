// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// const signup = () => {
//   const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//      const {name,email,password}=credentials;
//       const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,email,password
//         }),
//       });

//       const json = await response.json();
//       console.log(json);

//       if (json.success) {
//         localStorage.setItem("token", json.authtoken);
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("An error occurred while logging in. Please try again.");
//     }
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             aria-describedby="emailHelp"
//             onchange={onchange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name='email'
//             aria-describedby="emailHelp"
//             onchange={onchange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             {" "}
//             confirm Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             id="cpassword"
//             onchange={onchange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="cpassword" className="form-label">
//            confirm Password
//           </label>
//           <input
//           name="cpassword"
//             type="password"
//             className="form-control"
//             id="cpassword"
//             onchange={onchange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default signup;
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("account created","success")
      } else {
        props.showAlert("invalid value","danger")
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h3 style={{ padding: "20px", textAlign: "center" }}>
  Signin for create notebook
</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            value={credentials.cpassword}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
