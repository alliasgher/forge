"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Trash2, Globe, Lock, ExternalLink, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteStore } from "@/lib/stores/site-store";
import { updateSite, deleteSite } from "@/lib/api/sites";
import { api } from "@/lib/api-client";
import { publicSiteUrl } from "@/lib/utils";
import { toast } from "sonner";

export default function SettingsPage() {
  const { site, setSite, clear } = useSiteStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [slugEditing, setSlugEditing] = useState(false);
  const [slugValue, setSlugValue] = useState(site?.slug || "");
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      business_name: site?.business_name || "",
      tagline: site?.tagline || "",
      phone: site?.phone || "",
      email: site?.email || "",
      address: site?.address || "",
    },
  });

  // The site loads asynchronously, so defaultValues are empty on first render.
  // Without this the form stays blank and saving would wipe the business details.
  useEffect(() => {
    if (!site) return;
    reset({
      business_name: site.business_name || "",
      tagline: site.tagline || "",
      phone: site.phone || "",
      email: site.email || "",
      address: site.address || "",
    });
    setSlugValue(site.slug);
  }, [site, reset]);

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

  async function handlePublishToggle() {
    if (!site) return;
    setPublishing(true);
    try {
      const updated = await api.fetch<any>(`/api/sites/${site.id}/publish`, {
        method: "PUT",
        body: JSON.stringify({ isPublished: !site.is_published }),
      });
      setSite(updated);
      toast.success(updated.is_published ? "Site is now live!" : "Site set to draft");
    } catch { toast.error("Failed to update publish status"); }
    finally { setPublishing(false); }
  }

  async function checkSlug(slug: string) {
    if (slug === site?.slug || !slug.trim()) { setSlugAvailable(null); return; }
    setSlugChecking(true);
    try {
      await api.fetch(`/api/public/sites/${slug}`);
      setSlugAvailable(false); // taken
    } catch (err: any) {
      setSlugAvailable(err.status === 404); // 404 = available
    } finally { setSlugChecking(false); }
  }

  async function saveSlug() {
    if (!site || !slugAvailable || !slugValue.trim()) return;
    setSaving(true);
    try {
      const updated = await updateSite(site.id, { slug: slugValue.trim().toLowerCase().replace(/\s+/g, "-") });
      setSite(updated);
      setSlugEditing(false);
      setSlugAvailable(null);
      toast.success("URL updated");
    } catch { toast.error("Failed to update URL"); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!site) return;
    if (!confirm("Are you sure? This permanently deletes your site and all its content.")) return;
    setDeleting(true);
    try {
      await deleteSite(site.id);
      clear();
      toast.success("Site deleted");
      router.push("/dashboard/new");
    } catch { toast.error("Failed to delete"); setDeleting(false); }
  }

  if (!site) return null;

  const siteUrl = publicSiteUrl(site.slug);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Publish status */}
      <Card className={`border-2 ${site.is_published ? "border-mint/30 bg-mint/5" : "border-border"}`}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 rounded-full p-2 ${site.is_published ? "bg-mint/15" : "bg-muted"}`}>
                {site.is_published ? <Globe className="h-4 w-4 text-mint" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">
                    {site.is_published ? "Your site is live" : "Your site is a draft"}
                  </h3>
                  <Badge variant={site.is_published ? "default" : "secondary"} className="text-[10px]">
                    {site.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                {site.is_published ? (
                  <a href={siteUrl} target="_blank" rel="noreferrer"
                    className="mt-1 flex items-center gap-1 text-xs text-mint hover:text-mint-dark transition-colors">
                    {siteUrl} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">Publish to make your site visible to the world.</p>
                )}
              </div>
            </div>
            <Button
              onClick={handlePublishToggle}
              disabled={publishing}
              className={site.is_published ? "shrink-0" : "shrink-0 bg-mint hover:bg-mint-dark text-white"}
              variant={site.is_published ? "outline" : "default"}
            >
              {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> :
                site.is_published ? "Unpublish" : "Publish Site"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Site URL / Slug editor */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-sm mb-4">Site URL</h3>
          {!slugEditing ? (
            <div className="flex items-center justify-between">
              <div>
                <code className="text-xs rounded bg-muted px-2 py-1 font-mono">/site/{site.slug}</code>
              </div>
              <Button variant="outline" size="sm" onClick={() => { setSlugValue(site.slug); setSlugEditing(true); }}>
                Change URL
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground shrink-0">/site/</span>
                <div className="relative flex-1">
                  <Input
                    value={slugValue}
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-");
                      setSlugValue(val);
                      setSlugAvailable(null);
                    }}
                    onBlur={() => checkSlug(slugValue)}
                    className="bg-background font-mono text-sm pr-8"
                    placeholder="your-business-name"
                  />
                  {slugChecking && <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />}
                  {slugAvailable === true && <Check className="absolute right-2 top-2.5 h-4 w-4 text-mint" />}
                </div>
              </div>
              {slugAvailable === false && <p className="text-xs text-destructive">This URL is already taken.</p>}
              {slugAvailable === true && <p className="text-xs text-mint">This URL is available!</p>}
              <div className="flex gap-2">
                <Button size="sm" onClick={saveSlug} disabled={!slugAvailable || saving} className="bg-navy text-white">
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save URL"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => { setSlugEditing(false); setSlugAvailable(null); }}>Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Business details */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Business Details</h3>
            <Button onClick={handleSubmit(onSubmit)} disabled={saving} size="sm" className="bg-navy hover:bg-navy-light text-white gap-1.5">
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Save
            </Button>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label>Business Name</Label>
                <Input {...register("business_name")} className="bg-background" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Tagline</Label>
                <Input {...register("tagline")} className="bg-background" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input {...register("phone")} className="bg-background" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input {...register("email")} type="email" className="bg-background" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Address</Label>
                <Textarea {...register("address")} className="bg-background" rows={2} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Danger zone */}
      <Card className="border-destructive/30 bg-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-sm text-destructive mb-1">Danger Zone</h3>
          <p className="text-xs text-muted-foreground mb-4">Permanently delete your site and all its content. Cannot be undone.</p>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white gap-2"
            onClick={handleDelete} disabled={deleting}>
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete Site
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
