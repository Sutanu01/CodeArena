import cron from "node-cron";
import UserModel from "../models/User.js";

const SetDailyLoginStatus = () =>{
    cron.schedule('0 0 * * *',async ()=>{
        const allUsers = await UserModel.find({});

        for(const user of allUsers){
            if(user.daily_login === true){
                user.currentStreak+=1;
                user.login_data.shift();
                user.login_data.push(true);
            }else{
                user.currentStreak=0;
            }
            user.daily_login=false; 
            user.maxStreak=Math.max(user.maxStreak,user.currentStreak);
            await user.save();
        }

    }
,{timezone: 'Asia/Kolkata'})};

const initialiseCronJobs = () =>{
    SetDailyLoginStatus();
};

export default initialiseCronJobs;