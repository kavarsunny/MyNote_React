// import React, {useContext} from 'react'
// import noteContext from "../context/noteContext";
// const Noteitem = (props) => {
//   const context = useContext(noteContext);
//   const { deleteNote } = context;
//   const { note, updateNote } = props;
//   return (
    
//     <div className="col-my-3">
//       <div className="card md-3">
//         <div className="card-body">
//           <div className="d-flex align-items-center">
//             <h5 className="card-title">{note.title}</h5>
//             {/* <i className="fa-solid fa-trash-can"></i>
//             <i className="far fa-edit mx-2"></i> */}
//              <i className="fa-solid fa-trash-can" onClick={()=>{deleteNote(note._id);  props.showAlert("deleted","success");}}></i>
//              <i className="far fa-edit mx-2" onClick={()=>{updateNote(note) ;  props.showAlert("updated","success");}}></i>
//           </div>
//           <p className="card-text">{note.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Noteitem;
import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  return (
    <div className="col-md-3"> {/* Fixed Bootstrap class */}
      <div className="card mb-3"> {/* Fixed incorrect class */}
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
               
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
                
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
