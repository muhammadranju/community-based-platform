"use client";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  router.push("/our-work");
}

export default page;
