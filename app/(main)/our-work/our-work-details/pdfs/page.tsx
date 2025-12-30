import { Suspense } from "react";
import PdfsPage from "./PdfsPage";

export const metadata = {
  title: "PDFs - African Traditional Architecture",
  description: "PDFs Page",
};
function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PdfsPage />
      </Suspense>
    </>
  );
}

export default page;
