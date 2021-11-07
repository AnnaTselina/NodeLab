import mongoDBConnect from './mongoDB'

export const dbConnection = () => {
    mongoDBConnect();
}