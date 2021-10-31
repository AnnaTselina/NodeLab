import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/GameStore').then(()=>{
    console.log("Mongo db connected");
}, (e) => {
    console.log(e);
});