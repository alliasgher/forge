import { redirect } from "next/navigation";

// Lead details are shown in a dialog on the leads list — this route only exists
// for old links, so send them to the list rather than a dead page.
export default function LeadDetailPage() {
  redirect("/dashboard/leads");
}
