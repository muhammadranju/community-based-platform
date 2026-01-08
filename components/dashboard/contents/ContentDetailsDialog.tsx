import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { costumFormatDate } from "@/components/shared/DateTime";
import { IPost } from "@/app/dashboard/contents/ContentsPage";
import { FileText, ExternalLink } from "lucide-react";

// Helper to construct valid URLs
const getFileUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("https")) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

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

        <div className="mt-4 space-y-4 flex-1 flex flex-col min-h-0">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg shrink-0">
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
                  ? post?.owner?.name
                  : key === "createdAt"
                  ? costumFormatDate(post.createdAt)
                  : (post as any)[key];
              return (
                <div key={key}>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-medium capitalize">{value}</p>
                </div>
              );
            })}
          </div>

          <Tabs
            defaultValue="description"
            className="flex-1 flex flex-col min-h-0"
          >
            <TabsList className="grid w-full grid-cols-4 shrink-0">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="images">
                Images ({post.images?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="medias">
                Videos ({post.medias?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="pdfs">
                PDFs ({post.pdfs?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="flex-1 min-h-0 mt-2">
              <ScrollArea className="h-full w-full p-4 rounded-md border text-justify">
                <p className="whitespace-pre-wrap text-emerald-900 leading-relaxed text-sm">
                  {post.description}
                </p>
              </ScrollArea>
            </TabsContent>

            <TabsContent
              value="images"
              className="flex-1 min-h-0 flex items-center justify-center p-4 mt-2"
            >
              {post.images && post.images.length > 0 ? (
                <div className="w-full max-w-xl">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {post.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1 border rounded-lg overflow-hidden shadow-sm">
                            <img
                              src={getFileUrl(img)}
                              alt={`Slide ${index}`}
                              className="w-full h-[300px] md:h-[400px] object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p>No images available.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="medias" className="flex-1 min-h-0 mt-2">
              <ScrollArea className="h-full p-4">
                {post.medias && post.medias.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.medias.map((video, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-black rounded-lg overflow-hidden shadow-sm border border-gray-200"
                      >
                        <video
                          src={getFileUrl(video)}
                          width="100%"
                          height="100%"
                          controls
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                    <p>No videos available.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="pdfs" className="flex-1 min-h-0 mt-2">
              <ScrollArea className="h-full p-4">
                {post.pdfs && post.pdfs.length > 0 ? (
                  <div className="grid gap-3">
                    {post.pdfs.map((pdf, index) => (
                      <a
                        key={index}
                        href={getFileUrl(pdf)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="bg-red-50 p-2 rounded-lg mr-4 group-hover:bg-red-100 transition-colors">
                          <FileText className="h-6 w-6 text-red-500" />
                        </div>
                        <span className="truncate flex-1 font-medium text-gray-700">
                          {`Document ${index + 1}`}
                        </span>
                        <ExternalLink className="ml-auto h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                    <p>No PDFs available.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
