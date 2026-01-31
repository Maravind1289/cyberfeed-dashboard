import { connectDB } from "../../../lib/mongodb";
import Report from "../../../models/Report";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  try {
    const newReport = await Report.create(body);
    return Response.json({ success: true, report: newReport });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Report already saved",
    });
  }
}

export async function GET() {
  await connectDB();

  const reports = await Report.find().sort({ createdAt: -1 });

  return Response.json(reports);
}

export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await Report.findByIdAndDelete(id);

  return Response.json({ message: "Report deleted successfully" });
}
