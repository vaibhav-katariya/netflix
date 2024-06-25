import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    episode: {
      type: Number,
      required: true,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Series = mongoose.model("Series", seriesSchema);
