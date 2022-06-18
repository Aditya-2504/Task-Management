import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './index.css'

function Home(){
  const [userName,setUserName] =useState('');
  const [passWord,setpassWord] =useState('');
  const navigate=useNavigate();
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!userName){
      alert("Username is required");
      setUserName('');
      setpassWord('');
    }
    else if(!passWord){
      alert("Password is required");
      setUserName('');
      setpassWord('');
    }
    else{
      fetch(`/login?userName=${userName}&password=${passWord}`)
      .then(res=>res.json())
      .then(res=>{
        if(res.msg==='user not found'){
          alert('Incorrect username or password');
          setUserName('');
          setpassWord('');
        }
        else{
          const url=res.urlid;
          navigate(`/user/${url}/${userName}`);
        }
      });
    }
    // setUserName('');
    // setpassWord('');
  }
  return (
  <> 
    <div className='header'>
      <Link to="/" style={{color: 'gold',textDecoration:'none'}}>TASK MANAGEMENT</Link>
    </div>
    <form className='login_box'>      
    <p>Enter details to sign in your account</p>
      <label htmlFor='field_user'>Username: </label>
      <input id='field_user' type='text' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
      <br/>
      <label htmlFor='field_pass'> Password: </label>
      <input id='field_pass' type='password' name='passWord' value={passWord} onChange={(e)=>setpassWord(e.target.value)} />
      <br/>
      <button className='login_button' type='button' onClick={handleSubmit}>Login</button>
      <p>Don't have an account? <Link to="/register" style={{color:'white'}}>Click here to Register</Link></p>
    </form>
  </>);
}

export default Home;


// import React,{useState} from 'react'
// import { Link,useNavigate } from 'react-router-dom';
// import './index.css'
// import Data from './data'

// function Home(){
//   const [userName,setUserName] =useState('');
//   const [passWord,setpassWord] =useState('');
//   const navigate=useNavigate();
  
//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     if(!userName){
//       alert("Username is required");
//     }
//     else if(!passWord){
//       alert("Password is required");
//     }
//     else{
//       const newUser=Data.find((person)=>person.userName===userName && person.passWord===passWord);
//       if(newUser){
//         navigate(`/user/${userName}`);
//       }
//       else{
//         alert('Incorrect username or password');
//       }
//     }
//     setUserName('');
//     setpassWord('');
//   }
//   return (
//   <> 
//     <div className='header'>
//       <Link to="/" style={{color: 'gold',textDecoration:'none'}}>TASK MANAGEMENT</Link>
//     </div>
//     <form className='login_box'>      
//     <p>Enter details to sign in your account</p>
//       <label htmlFor='field_user'>Username: </label>
//       <input id='field_user' type='text' name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
//       <br/>
//       <label htmlFor='field_pass'> Password: </label>
//       <input id='field_pass' type='password' name='passWord' value={passWord} onChange={(e)=>setpassWord(e.target.value)} />
//       <br/>
//       <button className='login_button' type='button' onClick={handleSubmit}>Login</button>
//       <p>Don't have an account? <Link to="/register" style={{color:'white'}}>Click here to Register</Link></p>
//     </form>
//   </>);
// }

// export default Home;
