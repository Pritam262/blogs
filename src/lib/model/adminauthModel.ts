import mongoose from "mongoose";


const adminUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export const AdminAuthModel = mongoose.models.admin || mongoose.model("admin", adminUserSchema);