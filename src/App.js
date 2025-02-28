// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Alert from "./components/Alert";
// import Home from "./components/Home";
// import About from "./components/About";
// import NoteState from "./context/NoteState";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import { useState } from "react";

// function App() {
//   const [alert,setAlert]=useState;
//   const showAlert=(message,type)=>{
//     setAlert({
//       msg:message,
//       type:type
//     }) 
//     setTimeout(()=>{
//       setAlert(null);
//   },1500);
// }
//   return (
//     <>
//       <NoteState>
//         <Router>
//           <Navbar />
//           <Alert  alert={alert}/>
//           <div className="container">
//             <Routes>
//               <Route path="/" element={<Home showAlert={showAlert} />} />
//               <Route path="/About" element={<About />} />
//               <Route path="/Login" element={<Login showAlert={showAlert} />} />
//               <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
//             </Routes>
//           </div>
//         </Router>
//       </NoteState>
//     </>
//   );
// }

// export default App;
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null); // Fixed useState initialization

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/About" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert} />} />
              <Route path="/Signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
