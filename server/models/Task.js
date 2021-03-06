import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        listId: { type: Schema.Types.ObjectId, rel: "list", required: true },
        boardId: { type: Schema.Types.ObjectId, rel: "board", required: true },
        creatorEmail: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

TaskSchema.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default TaskSchema;