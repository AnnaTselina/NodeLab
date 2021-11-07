import mongoose from 'mongoose';

const mongoDBConnect = () => {
    mongoose.connect('mongodb://localhost:27017/GameStore').then(()=>{
    console.log("Mongo db connected");
}, (e) => {
    console.log(e);
});
}

export default mongoDBConnect;