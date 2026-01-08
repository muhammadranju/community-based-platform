import CustomBadge from "@/components/shared/SharedBadge";
import getUser from "@/components/shared/UserInfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

export const ForumBanner: React.FC = () => {
  const user = getUser();
  return (
    <div className="w-full bg-primary-color rounded-3xl px-12 py-16 text-white relative overflow-hidden my-10 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Left Content */}
        <div className="flex-1 space-y-6 lg:max-w-2xl">
          <CustomBadge>EXPLORE CONTENT IN THE ARCHIVE</CustomBadge>

          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-white">
            African Traditional Architecture Discussions
          </h2>

          <p className="text-white text-sm md:text-base leading-relaxed  max-w-xl">
            You can join ongoing discussions in the forum or create new topics
            and invite your friends to join the conversation.
          </p>
        </div>

        {/* Right Auth Card */}
        <div className="w-full lg:w-auto shrink-0 flex justify-center lg:justify-end">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-primary-color mb-2">
              {user ? "Explore Now" : "Join Us"}
            </h3>
            <p className="text-primary-color font-semibold text-base mb-8 leading-relaxed">
              {user
                ? "Explore all of contents and forums and start a new discussion or join an existing one "
                : "By registering for a new account or logging to an existing account"}
            </p>

            <div className="flex gap-4">
              {user ? (
                <Link href="/forum">
                  <Button className="px-6 py-5 bg-amber-600 hover:bg-amber-600 text-white rounded-full">
                    Explore Now
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button className="px-6 py-5 bg-amber-600 hover:bg-amber-600 text-white rounded-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="px-6 py-5 text-black rounded-full hover:bg-gray-100 border border-orange-600 bg-transparent">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
