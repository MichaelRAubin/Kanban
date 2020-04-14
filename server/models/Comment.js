import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        title: { type: String, required: true },
        taskId: { type: Schema.Types.ObjectId, rel: "task", required: true },
        listId: { type: Schema.Types.ObjectId, rel: "list", required: true },
        boardId: { type: Schema.Types.ObjectId, rel: "board", requird: true },
        creatorEmail: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default CommentSchema;