const Users=require('../model/userModel.js')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const useCtrl={
    register:async(req,res)=>{
        try{
            const {name,email,password}=req.body;
            const user=await Users.findOne({email})
            if(user) return res.status(400).json({msg:"email already exits"});
            if (password.length<6) return res.status(400).json({msg:"password should greater than 6"});
            const passwordhash=await bcrypt.hash(password,10);
            const newUser=new Users({
                name,
                email,
                password:passwordhash
            })
            await newUser.save()
            const accesstoken=createAccessToken({id:newUser._id});
            const refreshtoken=createRefreshToken({id:newUser._id});
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })
            res.json({accesstoken})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    refreshtoken:async(req,res)=>{
        try{
            const refresh_token= req.cookies.refreshtoken;
            if(!refresh_token) return res.status(400).json({msg:"please login or register"});
            jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(400).json({msg:"please login or register"});
                const accesstoken=createAccessToken({id:user.id});
                res.json({user,accesstoken})
            })
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "User not found" });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
            const accesstoken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            });
            res.json({
                accesstoken,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role, 
                },
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    logout:async (req,res)=>{
        try{
            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
            res.json({msg:"Logged out"})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getuser:async(req,res)=>{
        try{
            const user=await Users.findById(req.user.id).select('-password');
            if(!user) return res.status(400).json({msg:"user not found"})
            res.json(user)
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    }
}
const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}
module.exports=useCtrl