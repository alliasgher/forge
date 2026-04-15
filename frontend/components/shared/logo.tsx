import Link from "next/link";
import { Hammer } from "lucide-react";

export function Logo({ href = "/", size = "default" }: { href?: string; size?: "default" | "sm" }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 font-heading font-bold text-navy dark:text-mint ${
        size === "sm" ? "text-base" : "text-lg"
      }`}
    >
      <Hammer className={`text-mint ${size === "sm" ? "h-4 w-4" : "h-5 w-5"}`} />
      Forge
    </Link>
  );
}
