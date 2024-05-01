
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => new Date(),
    }
})

// Create text index on title and description fields
blogSchema.index({ title: 'text', description: 'text', id: 'text' });
export const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema);