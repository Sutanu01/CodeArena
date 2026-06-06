import cron from "node-cron";
import { fetchAndStoreQuestions } from "./utility.js";

const fetchAndStoreQuestionsMonthly = () => {
    cron.schedule('0 0 1 * *', async () => {
        await fetchAndStoreQuestions();
    }, { timezone: 'Asia/Kolkata' });
}

const initialiseCronJobs = () =>{
    fetchAndStoreQuestionsMonthly();
};

export default initialiseCronJobs;