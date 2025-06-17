import cron from "node-cron";
import UserModel from "../models/User.js";

const SetDailyLoginStatus = () =>{
    cron.schedule('0 0 * * *',async ()=>{
        const now = new Date();
        const day = now.getDate();
        const allUsers = await UserModel.find({});

        for(const user of allUsers){
            user.maxStreak=Math.max(user.maxStreak,user.currentStreak); 
            //this gotta update everynight, we can also implement current streak and max streak updates
             //  in puzzlse route when sucessfully solve a puzzle but for now i kept it here
            if(user.daily_login === true){
                user.currentStreak+=1;
                user.login_data[day-1]=true;
            }else{
                user.currentStreak=0;
            }
            user.daily_login=false; 
            await user.save();
        }

    }
,{timezone: 'Asia/Kolkata'})};

// const getRenderServerUp = () =>{
//     cron.schedule('*/2 * * * *',async ()=>{
//         console.log("Render server is Up");
//     }
// ,{timezone: 'Asia/Kolkata'})};

const initialiseCronJobs = () =>{
    SetDailyLoginStatus();
    // getRenderServerUp();
};

export default initialiseCronJobs;



//node-cron got minute control only
//node-schedule got second precision but we dont need it ig so i used node-cron
// * * * * * *
// | | | | | |
// | | | | | +-- Day of the Week (0 - 7) (Sunday can be both 0 and 7)
// | | | | +---- Month (1 - 12)
// | | | +------ Day of the Month (1 - 31)
// | | +-------- Hour (0 - 23)
// | +---------- Minute (0 - 59)
// +------------ Second (0 - 59) (optional)