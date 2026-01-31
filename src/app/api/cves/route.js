import { connectDB } from "../../../lib/mongodb";
import CVE from "../../../models/CVE";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  try {
    const saved = await CVE.create(body);

    return Response.json({
      success: true,
      message: "CVE saved successfully",
      cve: saved,
    });
  } catch {
    return Response.json({
      success: false,
      message: "CVE already saved",
    });
  }
}

export async function GET() {
  await connectDB();

  const savedCVEs = await CVE.find().sort({ createdAt: -1 });

  return Response.json(savedCVEs);
}

export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await CVE.findByIdAndDelete(id);

  return Response.json({
    success: true,
    message: "CVE removed successfully",
  });
}
