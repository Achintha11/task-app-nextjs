import prisma from "@/src/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, isCompleted, isImportant } =
      await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing Required Fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: " Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        isCompleted,
        isImportant,
        date,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK", error);
    return NextResponse.json({ status: 500 });
  }
}

export async function GET(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: {
        date: "asc", // Sort by date in descending order
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASKS", error);
    return NextResponse.json({ status: 500 });
  }
}

export async function PUT(req) {
  const { userId } = auth();
  const { isCompleted, id } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  try {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}
