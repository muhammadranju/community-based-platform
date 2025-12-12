import NotFoundPage from "@/components/home/NotFoundPage";
import React from "react";

export const metadata = {
  title: "Not Found",
  description: "Page Not Found",
};

const page: React.FC = () => {
  return <NotFoundPage />;
};

export default page;
