"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ForumUploadForm } from "./ForumUploadForm";

interface ForumUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForumUploadModal({ isOpen, onClose }: ForumUploadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            Create Forum Post
          </DialogTitle>
          <DialogDescription>
            Share your thoughts, ask questions, or start a discussion.
          </DialogDescription>
        </DialogHeader>
        <ForumUploadForm
          onSuccess={onClose}
          className="p-0 shadow-none border-none"
        />
      </DialogContent>
    </Dialog>
  );
}
