import { db } from "@/app/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Define an interface for the review data structure for the reviews
interface ReviewData {
  email: string;
  places: string;
  url: string;
  thumbnailUrl: string;
  review: string;
}

const getData = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    // get the collections and data from the database
    const docSnap = await getDocs(
      query(collection(db, "reviews"), where("email", "==", email)),
    );

    // Type the data as a Record<string, ReviewData>
    //  to allow indexing with doc.id
    const data: Record<string, ReviewData> = {};

    docSnap.forEach((doc) => {
      // Assert that doc.data() returns a ReviewData type
      const reviewData = doc.data() as ReviewData;
      data[doc.id] = reviewData;
    });

    return NextResponse.json({ doc: data });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 402 });
  }
};

export { getData as GET };
