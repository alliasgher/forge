import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-center font-heading text-lg">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          Login form will go here.
        </p>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-mint hover:text-mint-dark font-medium">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
