import mongoose from 'mongoose';
const mongoDBconnection = process.env['MONGODB_CONNECTION'];

const mongoDBConnect = () => {
    if (mongoDBconnection) {
        mongoose.connect(mongoDBconnection).then(()=>{
            console.log("Mongo db connected");
        }, (e) => {
            console.log(e);
        });
    }
}

export default mongoDBConnect;