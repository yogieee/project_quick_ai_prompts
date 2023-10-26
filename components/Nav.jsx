"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Quick Prompts logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Quick Prompts</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="bg-blue-500 text-white rounded-full px-5 py-2 text-sm hover:bg-blue-700"
            >
              Create Post
            </Link>
            <button
              type="button"
              className="outline_btn"
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/"); // Redirect to the dashboard page after signing out
                });
              }}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                width={37}
                height={37}
                alt="profile"
                src={session?.user?.image}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              className="rounded-full"
              width={37}
              height={37}
              alt="profile"
              src={session?.user?.image}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ redirect: false }).then(() => {
                      router.push("/"); // Redirect to the dashboard page after signing out
                    });
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
