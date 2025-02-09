import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 glass-effect font-work-sans transition-all duration-300 ease-in-out border-b border-gray-200 dark:border-gray-800 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={20}
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-gray-900 dark:text-white">
          {session?.user ? (
            <>
              {/* Create Button */}
              <Link
                href="/startup/create"
                className="hover-underline flex items-center gap-1 transition-colors duration-300"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              {/* Logout Button */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="hover-underline flex items-center gap-1 text-red-600 dark:text-red-400 transition-colors duration-300"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden" />
                </button>
              </form>

              {/* User Avatar */}
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10 transition-transform duration-300 hover:scale-110">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            /* Login Button */
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="hover-underline relative group transition-colors duration-300 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
