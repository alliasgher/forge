"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSiteStore } from "@/lib/stores/site-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { updateSite, deleteSite } from "@/lib/api/sites";
import { toast } from "sonner";

export default function SettingsPage() {
  const { site, setSite, clear } = useSiteStore();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      business_name: site?.business_name || "",
      tagline: site?.tagline || "",
      phone: site?.phone || "",
      email: site?.email || "",
      address: site?.address || "",
    },
  });

  async function onSubmit(data: any) {
    if (!site) return;
    setSaving(true);
    try {
      const updated = await updateSite(site.id, data);
      setSite(updated);
      toast.success("Settings saved");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!site) return;
    if (!confirm("Are you sure? This will permanently delete your site and all its content.")) return;
    setDeleting(true);
    try {
      await deleteSite(site.id);
      clear();
      toast.success("Site deleted");
      router.push("/dashboard/new");
    } catch { toast.error("Failed to delete"); setDeleting(false); }
  }

  if (!site) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your business details.</p>
        </div>
        <Button onClick={handleSubmit(onSubmit)} disabled={saving} className="bg-navy hover:bg-navy-light text-white gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input {...register("business_name")} className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input {...register("tagline")} className="bg-background" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...register("phone")} className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} type="email" className="bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea {...register("address")} className="bg-background" rows={2} />
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <h3 className="font-heading text-sm font-semibold">Site URL</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your site is available at: <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono">/site/{site.slug}</code>
          </p>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-destructive/30 bg-card">
        <CardContent className="pt-6">
          <h3 className="font-heading text-sm font-semibold text-destructive">Danger Zone</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Permanently delete your site and all its content. This cannot be undone.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-destructive text-destructive hover:bg-destructive hover:text-white gap-2"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete Site
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
