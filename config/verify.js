const client = require('twilio')('AC25e13d899d8dbb5bd10cc6b694009013', '3fc0c437bf6b7171430cf77814d69e50');
const serviceSid = 'VA7f056a6c2991fa09f8a5cd65ba16ec6e';

module.exports ={
    doSms:(noData)=>{
        let res = {}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verifications.create({
                to : `+91${noData.phonenumber}`,
                channel:"sms"
            }).then((res)=>{
                res.valid =false
                resolve(res)
                console.log(res);
            })
        })
    },
    otpVerify:(otpData,nuData)=>{
        let resp = {}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verificationChecks.create({
                to: `+91${nuData.phonenumber}`,
                code: otpData.otp
            }).then((resp)=>{   
                console.log('verification failed');
                console.log(resp);
                resolve(resp)
            })
        })
    },
    adminLogin:()=>{
        let res = {}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verifications.create({
                to : `+91${9633802594}`,
                channel:"sms"
            }).then((res)=>{
                res.valid =false
                resolve(res)
                console.log(res);
            })
        })
    },
    otpAdminVerify:(otpData)=>{
        let resp = {}
        return new Promise(async(resolve,reject)=>{
            client.verify.services(serviceSid).verificationChecks.create({
                to: `+91${9633802594}`,
                code: otpData.otp
            }).then((resp)=>{
                console.log('verification failed');
                console.log(resp);
                resolve(resp)
            })
        })
    }
}