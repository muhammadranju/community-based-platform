"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { IPost } from "@/app/dashboard/contents/ContentsPage";
import { UpdateContentForm } from "./UpdateContentForm";

interface UpdateContentDialogProps {
  post: IPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function UpdateContentDialog({
  post,
  open,
  onOpenChange,
  onSuccess,
}: UpdateContentDialogProps) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px]! w-[95vw] h-[95vh] overflow-y-auto p-4 md:p-8 bg-gray-50 border-none [&>button]:hidden">
        <DialogTitle className="sr-only">
          Edit Content: {post.title}
        </DialogTitle>
        <UpdateContentForm
          post={post}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
