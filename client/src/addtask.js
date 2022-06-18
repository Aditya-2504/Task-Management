import React,{useState} from "react";
import './addtask.css'

function Modal(props){
  const current_date=new Date();
  current_date.setMinutes(current_date.getMinutes()-current_date.getTimezoneOffset());
  let temp=[];
  let taskID;
  if(!props.isNew){
    temp=props.subTasks;
    taskID=props.taskID;
  }
  else{
    taskID=new Date().toString();
  }
  const [sub_Tasks,setsub_Tasks]=useState(temp);

  if(!props.isNew && props.current_title!==props.title){
    return null;
  }

  //add sub tasks
  function addSubTask(){;
    const newSubTasks=[{subtaskName:'Enter sub-task',deadline:current_date.toISOString().slice(0,16),id:new Date().toString()},...sub_Tasks];
    setsub_Tasks(newSubTasks);
  }

  //delete sub tasks
  function deleteSubTask(){
    const _newSubTasks=sub_Tasks.filter((sub_task)=>document.getElementById(sub_task.id).checked!==true);
    setsub_Tasks(_newSubTasks);
  }

  //saving subTasks
  function saveSubTask(){
    const newTitle=document.getElementById('inputTitle').value;
    const _saveSubTasks=sub_Tasks.map((sub_task)=>{
      return ({
        subtaskName:document.getElementById(sub_task.id+sub_task.subtaskName).value,
        deadline:document.getElementById(sub_task.id+sub_task.deadline).value,
        id:sub_task.id
      })
    })
    let _newTasks=props.tasks.map((task)=>{
      if(task.id===taskID){
        task={taskName:newTitle,subTasks:_saveSubTasks,id:taskID};
      }
      return task;
    });
    if(props.isNew){
      _newTasks.push({taskName:newTitle,subTasks:_saveSubTasks,id:taskID});
    }
    fetch(`http://localhost:5000/userNotes?userName=${props.userName}`,{
      method:"PATCH",
      body:JSON.stringify(_newTasks),
      headers: {
        "Content-type": "application/json",
        "charset":"UTF-8" 
      }
    })
    .then(props.onSave(_newTasks));
  }

  let modal_title=props.isNew===true?'Enter the title':props.title;
  return(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title"><strong>{props.isNew?'Add new task':'Edit task'}</strong></div>
        </div>
        <div className="modal-body">
          <div className="body-header">
            <input type='text' id='inputTitle' defaultValue={modal_title}/>
            <div className="addSubTask" onClick={()=>setTimeout(addSubTask,1000)}>+
              <div className="tooltip" >Add sub-task</div>
            </div>
          </div>
          <div className="task-headings">
            <div>Sub-tasks</div>
            <div>Deadline</div>                    
          </div>
          <div className="sub-tasks">
              {sub_Tasks.map((sub_task)=>{
                const form_id=sub_task.deadline.slice(0,16)>=current_date.toISOString().slice(0,16)?"_subtask":"_missed";
                const sub_id=sub_task.deadline.slice(0,16)>=current_date.toISOString().slice(0,16)?"_sub":"_missed_sub";
                const deadline_id=sub_task.deadline.slice(0,16)>=current_date.toISOString().slice(0,16)?"_deadline":"_missed_deadline";
                return(
                  <form className={form_id} key={sub_task.id}>
                    <input id={sub_task.id} type="checkbox"/>
                    <textarea className={sub_id} id={sub_task.id+sub_task.subtaskName} defaultValue={sub_task.subtaskName}/>
                    <input className={deadline_id} id={sub_task.id+sub_task.deadline} type="datetime-local" 
                    defaultValue={sub_task.deadline.slice(0,16)} min={current_date.toISOString().slice(0,16)}/>
                  </form>
                );})
              }
          </div>           
        </div>
        <div className="modal-footer">
          <button style={{cursor:"pointer"}} className="modal-save" onClick={saveSubTask}>Save</button>
          <button style={{cursor:"pointer"}} className="modal-delete" onClick={deleteSubTask}>Delete</button>          
          <button style={{cursor:"pointer"}} className="modal-close" onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
    )
}

export default Modal


// import React,{useState} from "react";
// import './addtask.css'

// function Modal(props){
//   const [taskAdd,setTaskAdd]=useState(false);
//   const current_date=new Date();
//   current_date.setMinutes(current_date.getMinutes()-current_date.getTimezoneOffset());
//   if(!props.isNew && props.current_title!==props.title){
//     return null
//   }
//   let modal_title=props.isNew===true?'Enter the title':props.title;
//   return(
//     <div className="modal">
//       <div className="modal-content">
//         <div className="modal-header">
//           <div className="modal-title"><strong>{props.isNew?'Add new task':'Edit task'}</strong></div>
//         </div>
//         <div className="modal-body">
//           <div className="body-header">
//             <input type='text' className="inputTitle" defaultValue={modal_title}/>
//             <div className="addSubTask" onClick={()=>setTaskAdd(true)}>+
//               <div className="tooltip" >Add sub-task</div>
//             </div>
//           </div>
//           <div className="task-headings">
//             <div>Sub-tasks</div>
//             <div>Deadline</div>                    
//           </div>
//           <div className="sub-tasks">
//             {taskAdd && 
//             <form id="_subtask">
//               <input type="checkbox"/>
//               <textarea id="_sub"  defaultValue='Enter sub-task'/>
//               <input id="_deadline" type="datetime-local" defaultValue={current_date.toISOString().slice(0,16)}
//               min={current_date.toISOString().slice(0,16)}/>
//             </form>
//             }
//             {!props.isNew && 
//             <div>          
//               {props.subTasks.map((sub_task)=>{
//                 const form_id=sub_task.deadline.slice(0,16)>current_date.toISOString().slice(0,16)?"_subtask":"_missed";
//                 const sub_id=sub_task.deadline.slice(0,16)>current_date.toISOString().slice(0,16)?"_sub":"_missed_sub";
//                 const deadline_id=sub_task.deadline.slice(0,16)>current_date.toISOString().slice(0,16)?"_deadline":"_missed_deadline";
//                 // const form_id=sub_task.deadline.toISOString().slice(0,16)>current_date.toISOString().slice(0,16)?"_subtask":"_missed";
//                 // const sub_id=sub_task.deadline.toISOString().slice(0,16)>current_date.toISOString().slice(0,16)?"_sub":"_missed_sub";
//                 // const deadline_id=sub_task.deadline.toISOString().slice(0,16)>current_date.toISOString().slice(0,16)?"_deadline":"_missed_deadline";
//                 return(
//                   <form id={form_id} key={sub_task.subtaskName}>
//                     <input type="checkbox"/>
//                     <textarea id={sub_id}  defaultValue={sub_task.subtaskName}/>
//                     <input id={deadline_id} type="datetime-local" 
//                     defaultValue={sub_task.deadline.slice(0,16)} min={current_date.toISOString().slice(0,16)}/>
//                   </form>
//                 );})
//               }
//             </div>}    
//           </div>           
//         </div>
//         <div className="modal-footer">
//           <button style={{cursor:"pointer"}} className="modal-save">Save</button>
//           <button style={{cursor:"pointer"}} className="modal-delete">Delete</button>          
//           <button style={{cursor:"pointer"}} className="modal-close" onClick={props.onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//     )
// }

// export default Modal