import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-center font-heading text-lg">Welcome back</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
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
