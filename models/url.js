import mongoose from "mongoose";

const schema = new mongoose.Schema({
    originalUrl: {
        type: String
    },
    shortUrl: {
        type: String
    }

}, {timestamps: true})

const urlmodel = mongoose.models.urlmodel || mongoose.model("urlmodel", schema);
export default urlmodel;

