"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";

interface FormData {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
}

export function StepBusinessDetails() {
  const store = useOnboardingStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      businessName: store.businessName,
      tagline: store.tagline,
      phone: store.phone,
      email: store.email,
      address: store.address,
    },
  });

  function onSubmit(data: FormData) {
    store.setBusinessDetails(data);
    store.setStep(3);
  }

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-deep dark:text-white">
        Tell us about your business
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        This info will appear on your website.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            placeholder="e.g., Iron Forge Fitness"
            {...register("businessName", { required: "Business name is required" })}
            className="bg-card"
          />
          {errors.businessName && <p className="text-xs text-destructive">{errors.businessName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            placeholder="e.g., Transform your body, transform your life"
            {...register("tagline")}
            className="bg-card"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="(555) 123-4567" {...register("phone")} className="bg-card" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hello@business.com" {...register("email")} className="bg-card" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" placeholder="123 Main St, City, State" {...register("address")} className="bg-card" rows={2} />
        </div>
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={() => store.setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-navy hover:bg-navy-light text-white">
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
