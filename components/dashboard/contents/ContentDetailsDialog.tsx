import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { customFormatDate } from "@/components/shared/DateTime";
import { IPost } from "@/app/dashboard/contents/page";
import { costumFormatDate } from "@/components/shared/DateTime";
// import { IPost } from "./ContentTable";

interface ContentDetailsDialogProps {
  post: IPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContentDetailsDialog({
  post,
  open,
  onOpenChange,
}: ContentDetailsDialogProps) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            {post.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {post.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            {[
              "category",
              "status",
              "country",
              "region",
              "owner.name",
              "createdAt",
            ].map((key) => {
              const label = key.includes(".")
                ? "Owner"
                : key.charAt(0).toUpperCase() + key.slice(1);
              const value =
                key === "owner.name"
                  ? post.owner.name
                  : key === "createdAt"
                  ? costumFormatDate(post.createdAt)
                  : (post as any)[key];
              return (
                <div key={key}>
                  ``
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-medium capitalize">{value}</p>
                </div>
              );
            })}
          </div>

          <Tabs defaultValue="description" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="images">
                Images ({post.images.length})
              </TabsTrigger>
              <TabsTrigger value="medias">
                Videos ({post.medias.length})
              </TabsTrigger>
              <TabsTrigger value="pdfs">PDFs ({post.pdfs.length})</TabsTrigger>
            </TabsList>

            {/* Reusable tab content logic here — same as before */}
            {/* ... (description, images carousel, videos grid, pdf links) */}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
