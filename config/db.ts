import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose" 


export default function dbConnect() {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
        console.error('!!!! Error: DB_URI is not defined in environment variables !!!!');
        return;
    }
    mongoose.connect(dbUri).then((response) => {
        console.log('😊 Success connection')
    }).catch((error) => {
        console.log('!!!! Error connection !!!!', error)
    })
}
