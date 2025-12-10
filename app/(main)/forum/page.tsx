import ForumPage from "./ForumPage";

export const metadata = {
  title: "Forum - African Traditional Architecture",
  description: "Forum African Traditional Architecture",
};

export default function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <ForumPage />
    </div>
  );
}
