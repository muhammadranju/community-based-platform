import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import "video-react/dist/video-react.css";

export const metadata = {
  title: "African Traditional Architecture",
  description: "African Traditional Architecture",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
