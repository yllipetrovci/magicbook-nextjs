import { requireAuth } from "@/lib/authServer";

export const getServerSideProps = requireAuth;
