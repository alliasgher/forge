import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-center font-heading text-lg">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-mint hover:text-mint-dark font-medium">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
