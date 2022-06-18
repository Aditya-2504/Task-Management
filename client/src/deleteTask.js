import React from "react";
import './deletetask.css'
import './addtask.css'

function DeleteTask(props){
  function deleteAPI(){
    const newTasks=props.tasks.filter((task)=>task.taskName!==props.taskName);
    fetch(`/userNotes?userName=${props.userName}`,{
          method:"PATCH",
          body: JSON.stringify(newTasks),
          headers: {
            "Content-type": "application/json",
            "charset":"UTF-8" 
          }
        })
    .then(props.onDelete(newTasks));
  }
  return(
    <div className="delete">
      <div className="delete-content">
        <div className="modal-header">
          <div className="modal-title"><strong>Delete task</strong></div>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this task? 
        </div>
        <div className="modal-footer">
          <button style={{cursor:"pointer"}} className="task-delete" onClick={deleteAPI}>Delete</button>          
          <button style={{cursor:"pointer"}} className="delete-cancel" onClick={props.onClose}>Cancel</button>
        </div>
      </div>
    </div>
    )
}

export default DeleteTask