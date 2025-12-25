import { Suspense } from "react";
import ReadStoryClient from "./ReadStoryClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ReadStoryClient />
    </Suspense>
  );
}
