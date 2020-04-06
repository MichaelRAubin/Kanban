import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListSchema = new Schema(
    {
        title: { type: String, required: true },
        board: { type: Schema.Types.ObjectId, rel: "board", required: true },
        creatorEmail: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

ListSchema.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
});

export default ListSchema;