import mongoose from "mongoose";

const CVESchema = new mongoose.Schema(
  {
    cveId: {
      type: String,
      unique: true,
    },
    description: String,
    published: String,
    score: Number,
    severity: String,
    link: String,
  },
  { timestamps: true }
);

export default mongoose.models.CVE || mongoose.model("CVE", CVESchema);
