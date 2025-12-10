import SubOurWork from "./SubOurWork";

export const metadata = {
  title: "Our Work Details - African Traditional Architecture",
  description: "Our Work Details African Traditional Architecture",
};

function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <SubOurWork />
    </div>
  );
}

export default page;
