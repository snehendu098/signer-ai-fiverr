import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/firebase";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {

          return await signInWithEmailAndPassword(
            auth,
            (credentials as any).email || "",
            (credentials as any).password || "",
          )
            .then((userCredentials) => {
              if (userCredentials.user) {
                saveToDB(userCredentials.user.providerData[0].email);
                return { email: userCredentials.user.providerData[0].email };
              } else {
                return null;
              }
            })
            .catch((err) => console.log("err", err));
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
  },
};

const saveToDB = async (email: any) => {
  await setDoc(
    doc(db, "users", email),
    {
      timestamp: serverTimestamp(),
    },
    { merge: true },
  );
};
