import { connectMongoDB } from "../../../../lib/mongodb";
import Review from "../../../../models/review";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { Title, Content, Chapter, Start, Finish, User, Rate, UserEmail } = await req.json();
        console.log({ Title, Content, Chapter, Start, Finish, User, Rate, UserEmail });

        // Connect to MongoDB
        await connectMongoDB();
        console.log("MongoDB connected successfully");

        // Create a new review
        const review = await Review.create({
            title: Title,
            content: Content,
            chapter: Chapter,
            datestart: new Date(Start),  // Ensure it's a Date object
            dateend: new Date(Finish),   // Ensure it's a Date object
            person: User,
            rate: parseInt(Rate, 10),    // Parse as an integer
            useremail: UserEmail
        });
        console.log("Review created:", review);

        return NextResponse.json({ message: "Review created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create a review" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const review = await Review.find({});
        return NextResponse.json({ review });
    } catch (error) {
        console.error("Error fetching review:", error);
        return NextResponse.error(new Error("Failed to fetch review"), { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    
    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        await connectMongoDB();
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Review deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting Review:", error);
        return NextResponse.json({ error: "Failed to delete Review" }, { status: 500 });
    }
}
