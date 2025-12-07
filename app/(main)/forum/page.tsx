import ForumPage from "./ForumPage";

export const metadata = {
  title: "Forum - ATA",
  description: "Forum ATA",
};

export default function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <ForumPage />
    </div>
  );
}
