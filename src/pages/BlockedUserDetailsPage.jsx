import { usePageTitle } from "../hooks/usePageTitle";
import { UserDetailsCard } from "./UserDetailsPage";

export function BlockedUserDetailsPage() {
  usePageTitle("Blocked User");

  return (
    <div className="grid min-h-[calc(100vh-110px)] place-items-center rounded-[14px] bg-transparent p-4">
      <UserDetailsCard actionLabel="Unlock" actionTo="/user" />
    </div>
  );
}
