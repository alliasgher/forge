import Link from "next/link";
import { Hammer } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-heading text-xl font-bold text-navy dark:text-mint">
            <Hammer className="h-6 w-6 text-mint" />
            Forge
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
