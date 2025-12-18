import OurWorkDetailsPage from "./OurWorkDetailsPage";

export const metadata = {
  title: "Our Work Details - African Traditional Architecture",
  description: "Our Work Details African Traditional Architecture",
};

function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <OurWorkDetailsPage />
    </div>
  );
}

export default page;
