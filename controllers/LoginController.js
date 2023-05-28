const user= require('../modules/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const SignUp=async (req,res)=>{
    try{
        const User = new user({
            name:req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password,10),
        })
        
        const resuta = await User.save();
        return res.status(200).json({resuta ,token: jwt.sign({userId: User._id},'RANDOM_TOKEN_SECRET',{expiresIn:"24h"})});   
            
            // verification de email est existe déja ou non
        // const verifEmail= await user.findOne({email: req.body.email});
        // if(verifEmail){
        //     res.status(404).json({error:"utilisateur existe déja"});
        // }else{
        //     const resuta = await User.save();
        //     return res.status(200).json({resuta ,token: jwt.sign({userId: User._id},'RANDOM_TOKEN_SECRET',{expiresIn:"24h"})});   
        // }
        
    }
    catch(err){
        res.status(301).json(err)
    }

}

const Login =async(req,res)=>{
    const User= await user.findOne({email:req.body.email});
    if(!User){
        res.status(404).json({error:"ustilisateur non trouvé"});
    }
    bcrypt.compare(req.body.password,User.password).then((valid)=>{
        if(!valid){
            res.status(404).json({error:'password non correct'});
        }else{
            res.status(200).json('good ')
        }
    })
}

module.exports={SignUp,Login}
