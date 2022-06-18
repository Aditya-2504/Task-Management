import React, { useState } from 'react'
import './index.css'
import {Link,useNavigate} from 'react-router-dom';
function Register(){
  const [userName,setUserName]=useState('');
  const [passWord,setPassWord]=useState('');
  const [emailId,setEmailId]=useState('');
  const navigate=useNavigate();
  const handleRegister=(e)=>{
      e.preventDefault();
      if(!emailId){
        alert("Email-id is required");
      }
      else if(!userName){
        alert("Username is required");
      }
      else if(!passWord){
        alert("PassWord is required");
      }
      else{
        fetch("/registerUser",{
          method:"POST",
          body: JSON.stringify({
            email:emailId,
            userName:userName,            
            password:passWord,
            tasks:[]
          }),
          headers: {
            "Content-type": "application/json",
            "charset":"UTF-8" 
          }
        })
        .then(res=>res.json())
        .then(res=>{
          alert(res.msg);
          if(res.msg==='Successfully registered'){
            navigate("/");
          }
        })
      }
      setEmailId('');
      setPassWord('');
      setUserName('');
  }
  return (
  <> 
    <div className='header'>
        <Link to="/" style={{color: 'gold',textDecoration:'none'}}>TASK MANAGEMENT</Link>
    </div>
    <form className='register_box'>      
    <p>Enter details to register</p>
      <label htmlFor='register_email'>Email-id: </label>
      <input id='register_email' type='text' name='emailId' value={emailId} onChange={(e)=>setEmailId(e.target.value)}>
      </input>
      <br/>
      <label htmlFor='register_field_user'>Username: </label>
      <input id='register_field_user' type='text' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <br/>
      <label htmlFor='register_field_pass'> Password: </label>
      <input id='register_field_pass' type='password' name='passWord' value={passWord} onChange={(e)=>setPassWord(e.target.value)}/>
      <br/>
      <button className='register_button' type='button' onClick={handleRegister}>Register</button>
    </form>
  </>);
}

export default Register;

// import React, { useState } from 'react'
// import './index.css'
// import {Link,useNavigate} from 'react-router-dom';
// import Data from './data'
// function Register(){
//   const [userName,setUserName]=useState('');
//   const [passWord,setPassWord]=useState('');
//   const [emailId,setEmailId]=useState('');
//   const [registered,setRegistered]=useState(Data);
//   const navigate=useNavigate();
//   const handleRegister=(e)=>{
//       e.preventDefault();
//       if(!emailId){
//         alert("Email-id is required");
//       }
//       else if(!userName){
//         alert("Username is required");
//       }
//       else if(!passWord){
//         alert("PassWord is required");
//       }
//       else{
//         const tempUser=registered.find((user)=>user.userName===userName);
//         if(tempUser){
//             alert("Username not available");
//         }
//         else{
//             const newId=registered[registered.length-1].id;
//             const newUser={id: newId+1,emailId: emailId,passWord:passWord,userName:userName};
//             setRegistered((registered)=>{return [...registered,newUser]});
//             alert("Successfully registered");
//             navigate("/");
//         }
//       }
//       setEmailId('');
//       setPassWord('');
//       setUserName('');
//   }
//   return (
//   <> 
//     <div className='header'>
//         <Link to="/" style={{color: 'gold',textDecoration:'none'}}>TASK MANAGEMENT</Link>
//     </div>
//     <form className='register_box'>      
//     <p>Enter details to register</p>
//       <label htmlFor='register_email'>Email-id: </label>
//       <input id='register_email' type='text' name='emailId' value={emailId} onChange={(e)=>setEmailId(e.target.value)}>
//       </input>
//       <br/>
//       <label htmlFor='register_field_user'>Username: </label>
//       <input id='register_field_user' type='text' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
//       <br/>
//       <label htmlFor='register_field_pass'> Password: </label>
//       <input id='register_field_pass' type='password' name='passWord' value={passWord} onChange={(e)=>setPassWord(e.target.value)}/>
//       <br/>
//       <button className='register_button' type='button' onClick={handleRegister}>Register</button>
//     </form>
//   </>);
// }

// export default Register;