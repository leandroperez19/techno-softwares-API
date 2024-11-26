import mongoose from "mongoose";

const logModel = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            maxLength: 255,
        },
        module: {
            type: String,
            required: true,
            maxLength: 50,
            enum: ["Auth", "Sales", "Categories"],
        },
        userId: {
            type: Number,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100,
        },
    },
    {
        timestamps: true,
    },
);

export const Log = mongoose.model("Log", logModel);
