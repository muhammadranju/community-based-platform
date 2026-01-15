"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with DOMMatrix/canvas in react-pdf
const UploadContentForm = dynamic(
  () =>
    import("@/components/upload/UploadContentForm").then(
      (mod) => mod.UploadContentForm
    ),
  { ssr: false }
);

const ArchiveHeader: React.FC<{ isAuthtenticated: any }> = ({
  isAuthtenticated,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleSubmitClick = () => {
    if (!isAuthtenticated) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-900 shadow-sm mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-900  mb-8 tracking-tight">
        Contribute Photos, Videos & Documents To The Archive
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          variant="outline"
          className="px-8 py-2 h-auto text-sm font-semibold w-full sm:w-auto rounded-full border-secondary-color text-emerald-900"
          onClick={handleSubmitClick}
        >
          Submit Content
        </Button>

        {!isAuthtenticated && (
          <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href={`/signup?redirect=${pathname}`}>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none rounded-full px-6 py-2 h-auto border-gray-300 text-brand-dark hover:bg-gray-50 text-sm font-semibold"
              >
                Sign up
              </Button>
            </Link>
            <Link href="/login">
              <Button className="flex-1 sm:flex-none px-6 py-2 h-auto text-sm font-semibold shadow-none bg-amber-600 rounded-full hover:bg-amber-600/80">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto w-full">
          <DialogTitle className="sr-only">Upload Content</DialogTitle>
          <div className="py-4">
            <UploadContentForm onSuccess={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArchiveHeader;
