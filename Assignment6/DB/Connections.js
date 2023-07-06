import mongoose from "mongoose";

export const DBConnection = async ()=>{
return await mongoose
.connect('mongodb://127.0.0.1:27017/Assignment6')
.then((res) => console.log('Connection has been established successfully.'))
.catch((error)=>console.error('Unable to connect to the database:', error))
}