"use client";

// Wait, I used local state in ForumPage. I should act consistently.
// I will use local state here too.

import { ForumUploadModal } from "@/components/forums/ForumUploadModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ForumFilterButtonsProps {
  onSuccess?: () => void;
}

export default function ForumFilterButtons({
  onSuccess,
}: ForumFilterButtonsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    handleCloseModal();
    if (onSuccess) onSuccess();
  };

  return (
    <>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          onClick={handleOpenModal}
          className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          Topics
        </Button>
        <Button
          onClick={handleOpenModal}
          className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors"
        >
          Posts
        </Button>
      </div>

      <ForumUploadModal isOpen={isModalOpen} onClose={handleSuccess} />
    </>
  );
}
