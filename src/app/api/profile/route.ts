import { db } from "@/app/firebase";
import { collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const getProfie = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    // Ensure email is not null before creating a DocumentReference
    if (!email) {
      return NextResponse.json({ doc: null }, { status: 400 }); // Return error if email is missing
    }

    // Create a DocumentReference from a CollectionReference
    const usersCollection = collection(db, "users");
    const docRef = doc(usersCollection, email);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ doc: docSnap.data() });
    } else {
      return NextResponse.json({ doc: null });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
};

// ... (setProfile function remains unchanged)


const setProfile = async (req: NextRequest) => {
  try {
    const { name, email } = await req.json();

    await setDoc(
      doc(db, "users", email),
      {
        name: name,
        timestamp: serverTimestamp(),
      },
      { merge: true },
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 400 });
  }
};

export { getProfie as GET, setProfile as POST };
