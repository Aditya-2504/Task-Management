import React,{useState,useRef,useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import Modal from './addtask';
import Logo from './noteimage.png'
import Bin from './binimage.png'
import DeleteTask from './deleteTask';
import './user.css'

function UserPage(){
  const [show,setShow]=useState(false);
  const {_id,_username}=useParams();
  const [isLoading,setisLoading]=useState(true);
  const [tasks,setTasks]=useState([]);
  const url=useRef(`/userNotes?id=${_id}&userName=${_username}`);
  const len=tasks.length;
  useEffect(()=>{
    fetch(url.current)
  .then(res=>res.json())
  .then(res=>{setTasks(res.tasks);
              setisLoading(false)});
},[])
  function Empty(){
    // console.log(tasks);
    return(
        <div className='empty-grid'>
            <strong>Get started</strong> with the task manager.
        </div>
    )
  }
  function DisplayNotes(){
    const [noteshow,setNoteshow]=useState(false);
    const [deleteTask,setDeleteTask]=useState(false);
    const note_title=useRef('');
    return(
      <div className='notes-grid' /*key={list.taskTitle}*/>
        {tasks.map((task)=>{
            return(
                <div key={task.id} className='grid-item'>
                    <img id="logo" src={Logo} alt="Loading.." onClick={()=>{
                        note_title.current=task.taskName;
                        setNoteshow(true);
                    }}/>
                    {noteshow || show?<div style={{paddingTop:"10%"}}/>:<img id="bin" src={Bin} alt="Delete" onClick={()=>{
                        setDeleteTask(true);
                        note_title.current=task.taskName;
                    }}/> }
                    <div id="title-id">{task.taskName}</div>  
                    {deleteTask && <DeleteTask onDelete={(x)=>{setTasks(x);
                                                              setDeleteTask(false);}
                                                        } 
                      onClose={()=>setDeleteTask(false)} tasks={tasks} userName={_username} taskName={note_title.current} />}                     
                    {noteshow && <Modal tasks={tasks} isNew={false} onClose={()=>setNoteshow(false)} 
                    show={noteshow} taskID={task.id} title={task.taskName} subTasks={task.subTasks} 
                    current_title={note_title.current} userName={_username} onSave={(x)=>{setNoteshow(false);setTasks(x);}}/>}                
                </div>
            );
          })}
      </div>
    );
  }
  if(isLoading){
    return (
  <>     
    <div className='user_header'>
      <div id='heading1'>TASK MANAGEMENT</div>
      <div id='heading2'>Welcome, {_username}</div>
    </div>
    <div className='user_options'>
      <div id='add_note' style={{cursor:'pointer'}} onClick={()=>setShow(true)}>+ Add Task</div>
      {show && <Modal isNew={true} onClose={()=>setShow(false)} show={show} title='Enter the title'/>}
      <Link to='/' id='logout'>Logout</Link>
    </div>
  </>);
  }
  else{
    return (
  <>     
    <div className='user_header'>
      <div id='heading1'>TASK MANAGEMENT</div>
      <div id='heading2'>Welcome, {_username}</div>
    </div>
    <div className='user_options'>
      <div id='add_note' style={{cursor:'pointer'}} onClick={()=>setShow(true)}>+ Add Task</div>
      {show && <Modal tasks={tasks} isNew={true} onClose={()=>setShow(false)} onSave={(x)=>{setShow(false);setTasks(x);}} 
                show={show} title='Enter the title' userName={_username}/>}
      <Link to='/' id='logout'>Logout</Link>
    </div>
    {len>0? <DisplayNotes/>:<Empty/>}
  </>);
  }
}

export default UserPage;