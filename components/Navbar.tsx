import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans transition-all duration-300 ease-in-out">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={20}
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="relative group transition-colors duration-300"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
                <span className="absolute inset-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="relative group transition-colors duration-300"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                  <span className="absolute inset-0 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10 transition-transform duration-300 hover:scale-110">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="relative group transition-colors duration-300"
              >
                Login
                <span className="absolute inset-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
