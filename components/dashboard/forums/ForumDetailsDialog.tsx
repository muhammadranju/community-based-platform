import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { costumFormatDate } from "@/components/shared/DateTime";
import { IDiscussionPost } from "@/app/dashboard/forums/page";

const getIconSrc = (type: string) => {
  const iconMap: Record<string, string> = {
    introductions: "/Icons/Introductions.png",
    cultural: "/Icons/Cultural.png",
    rebuilding: "/Icons/Rebuilding.png",
    materials: "/Icons/Materials.png",
    interactive: "/Icons/Interactive.png",
  };
  return iconMap[type] || "/Icons/Community.png";
};

interface ForumDetailsDialogProps {
  post: IDiscussionPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ForumDetailsDialog({
  post,
  open,
  onOpenChange,
}: ForumDetailsDialogProps) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            Post Details
          </DialogTitle>
          <DialogDescription>
            Review the complete information for this forum post
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4">
            <img
              src={getIconSrc(post.type)}
              alt={post.type}
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {post.type}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Title</p>
            <h3 className="text-xl font-semibold text-gray-900">
              {post.title}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-3">Owner Information</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="font-medium">{post.owner.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email:</span>
                <span className="font-medium">{post.owner.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Role:</span>
                <span className="font-medium">{post.owner.role}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  post.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : post.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Type</p>
              <p className="font-medium text-gray-900 capitalize">
                {post.type}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Created At</p>
              <p className="text-gray-900">
                {costumFormatDate(post.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Updated At</p>
              <p className="text-gray-900">
                {costumFormatDate(post.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
