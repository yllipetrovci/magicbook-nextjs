import { Suspense } from "react";
import SignUpClient from "./SignupClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignUpClient />
    </Suspense>
  );
}