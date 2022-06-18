const User=require('../Models/user');

//login 
const singleUser=async (req,res)=>{
  try{
    const {userName,password}=req.query;
    const currentUser=await User.findOne({userName:userName,password:password});
    if(!currentUser) 
      return res.json({msg:'user not found'});
    res.json({...currentUser,msg:'successful login',urlid:currentUser._id.toString()});
    }
  catch(error){
    res.status(404).json({msg:error});
  }   
}

//register new user
const registerUser= async(req,res)=>{
  try{
    const tempUser=req.body;
    const findUser=await User.findOne({userName:tempUser.userName});
    if(!findUser){
      const newUser=await User.create(tempUser);
      res.json({msg:'Successfully registered'});
    }
    else{
      res.json({msg:'Username not available'});
    }
  }
  catch(error){
    res.status(404).json({msg:error});
  }    
}

//user notes
const userPage= async(req,res)=>{
  try{
    const username=req.query.userName;
    const currentUser=await User.findOne({userName:username});
    res.json(currentUser);//send objectId as string
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}

//save and delete task
const updateTask= async(req,res)=>{
  try{
    const username=req.query.userName;
    const newTasks=req.body;
    const currentUser=await User.findOneAndUpdate({userName:username},{tasks:newTasks},{new:true});    
    res.json(currentUser);//send objectId as string
  }
  catch(error){
    res.status(404).json({msg:error});
  }
}
module.exports={registerUser,userPage,singleUser,updateTask};