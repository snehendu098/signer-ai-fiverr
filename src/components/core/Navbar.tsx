import { getSession, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const session = useSession();
  const pathName = usePathname();

  const handleLogOut = async () => {
    try {
      await signOut();
    } catch (err) {
      toast({ title: "Error Occurred" });
    }
  };

  // Employ a single condition for clarity
  const shouldShowNavBar = pathName !== "/login" && pathName !== "/signup" && pathName !== "/forgot";

  return (
    <>
      {shouldShowNavBar && (
        <div className='absolute z-20 bg-background top-0 w-full p-4 px-10 border-b border-b-foreground-muted flex items-center justify-between'>
          <p className='font-semibold md:text-2xl text-xl'>
            <Link href={"/"}>Signer.ai</Link>
          </p>
          <div className='flex space-x-1 md:space-x-2'>
            {session.status === "authenticated" ? (
              <>
                <Button variant={"ghost"} asChild>
                  <Link href={"/profile"}>Profile</Link>
                </Button>
                <Button variant={"ghost"} asChild>
                  <Link href={"/reviews"}>Reviews</Link>
                </Button>
                <Button onClick={handleLogOut}>Log Out</Button>
              </>
            ) : (
              <Button asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
