import { db } from "@/app/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface ReviewData {
  email: string;
  places: string;
  url: string;
  thumbnailUrl: string;
  review: string;
}

const getReviews = async (req: NextRequest) => {
  try {
    const docSnap = await getDocs(query(collection(db, "reviews")));

    const data: Record<string, ReviewData> = {};

    docSnap.forEach((doc) => {
      // Assert that doc.data() returns a ReviewData type
      const reviewData = doc.data() as ReviewData;
      data[doc.id] = reviewData;
    });

    return NextResponse.json({ doc: data });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
};

const createReviews = async (req: NextRequest) => {
  try {
    const { objData } = await req.json();

    const docSnap = await setDoc(
      doc(db, "reviews", `${new Date().toISOString()}.${objData.email}`),
      objData,
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
};

export { createReviews as POST, getReviews as GET };
