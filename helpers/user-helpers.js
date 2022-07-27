var db = require('../config/connection')
const category = require('../models/category')
const { resolve } = require('path')
const async = require('hbs/lib/async')
const user = require('../models/user')
var bcrypt = require('bcrypt') 

var objectId = require('mongodb').ObjectId

module.exports = {
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(product )
        })
    },
    doSignup :(userData)=>{
        console.log(userData);
        return new Promise(async(resolve,reject)=>
        {
            const exist =await user.findOne({email:userData.email})
            if(exist){
                console.log("user exist");
                var userExist =true
        
                
                resolve(userExist)
            }else{
                userData.password = await bcrypt.hash(userData.password,10)
             user.create({name:userData.name,email : userData.email,password:userData.password})
                    var userExist =false
                    resolve(userExist)

            
            
        } 
        })
       },
       userLogin : (userData)=>{
        return new Promise(async(resolve,reject)=>{
            
            let response = {}
            let user = await user.findOne({email:userData.email})
            console.log(user);
            
            if(user){
                 const password = await  bcrypt.compare(userData.password,user.password)
                    if(password){  
                        response.userDetails =user;
                        response.status = true;
                        console.log('vendor approved');
                        resolve(response)
                    }else{
                        response.status = false;
                        resolve(response)
                        
                    }
                
                    
            }else{
                console.log('vendor not exist');
                response.user = false;
                resolve(response)
            }
        })
    }
}