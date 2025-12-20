import { Suspense } from "react";
import PdfsPage from "./PdfsPage";

function page() {
  return (
    <>
      <title>PDFs - African Traditional Architecture</title>
      <Suspense fallback={<div>Loading...</div>}>
        <PdfsPage />
      </Suspense>
    </>
  );
}

export default page;
