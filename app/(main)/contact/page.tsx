import ContactPage from "./ContactPage";

export const metadata = {
  title: "Contact Us",
  description: "Contact Us",
}

export default function page() {
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 max-w-7xl mx-auto">
      <ContactPage />
    </div>
  );
}
