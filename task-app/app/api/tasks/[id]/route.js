import prisma from "@/src/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params;
  const { userId } = auth();
  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    console.log("TASK DELETED", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting Task", status: 500 });
  }
}
