const bcrypt = require("bcryptjs/dist/bcrypt");
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";


let createNewUser = async (data)=>{
    return new Promise (async(resolve, reject)=>{
        try{

            let hashPasswordFromBcrypt = await hashUserPassword(data.password); 
            await db.User.create({
                email: data.email,
                password:hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender=== '1' ? true : false,
                roleId: data.roleId,
               
            })
            resolve('ok  create new user successed     ')

        }catch(e){
            reject(e);
        }
    
    })
}

let hashUserPassword = (password)=>{
    return new Promise (async (resolve, reject) =>{

        try{
            var hashPassWord = await bcrypt.hashSync(password,salt);
            resolve(hashPassWord)
        }
        catch(e){
            reject(e);
        }
    })
}

let getAllUser =()=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let users = db.User.findAll({
                raw:true,
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    })

}
let getUserInfoById=(userId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let user = db.User.findOne({
                where : {id: userId},
                raw :true,
            })
            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        }
        catch(e){
                reject(e);
        }
        
    })

}
let updateUserData =(data)=>{
   return new Promise(async(resolve, reject)=>{
       try{
           let user = await db.User.findOne({
               where:{id: data.id}
           })
           if(user){
               user.firstName = data.firstName;
               user.lastName = data.lastName;
               user.address = data.address;


               await user.save();
               let allUsers = await db.User.findAll();
               resolve(allUsers);
           }else{
               resolve();

           }
           await db.User.update({

           })
       }catch(e){
           console.log(e);
       }
   })
}

let deleteUserById = (userId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let user= await db.User.findOne({
                where:{id : userId}
            })
            if(user){
                user.destroy();
            }
            resolve();

        }catch(e){
            reject(e);
        }
    })
}

module.exports ={
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData: updateUserData ,
    deleteUserById:deleteUserById
}