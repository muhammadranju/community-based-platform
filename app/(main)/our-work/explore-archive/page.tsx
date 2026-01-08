import OurWorkDetails from "./OurWorkDetails";

export const metadata = {
  title: "Explore Archive - African Traditional Architecture",
  description: "Explore Archive Page",
};
function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <OurWorkDetails />
    </div>
  );
}

export default page;
