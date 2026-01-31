import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: {
      type: String,
      unique: true, // Prevent duplicate saves
    },
    date: String,
  },
  { timestamps: true }
);

export default mongoose.models.Report ||
  mongoose.model("Report", ReportSchema);
