"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { authClient, useSession } from "@/lib/auth-client";

const UpdateProfile = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/Login?callbackURL=/UpdateProfile");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("image", session.user.image || "");
    }
  }, [session, setValue]);

  const onSubmit = async (formData) => {
    const image = (formData.image || "").trim();

    if (image) {
      try {
        const u = new URL(image);
        if (u.protocol !== "http:" && u.protocol !== "https:") {
          toast.error("Image must be an http or https URL.");
          return;
        }
      } catch {
        toast.error("Image must be a valid URL.");
        return;
      }
    }

    try {
      const { error } = await authClient.updateUser({
        name: formData.name.trim(),
        ...(image ? { image } : {}),
      });
      if (error) {
        toast.error(error.message || "Update failed.");
        return;
      }
      toast.success("Profile updated successfully!");
      router.push("/Profile");
    } catch (e) {
      toast.error(e?.message || "Update failed. Try again.");
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-10">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-6 h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!session?.user) return null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10 pb-16">
        <Link
          href="/Profile"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50"
        >
          <MdArrowBack className="text-lg" aria-hidden />
          Back to profile
        </Link>

        <div className="mx-auto max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm"
          >
            <div>
              <h1 className="text-center text-2xl font-bold text-indigo-950">
                Update Information
              </h1>
              <p className="mt-1 text-center text-sm text-slate-500">
                Change your display name or profile picture.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="Your display name"
                {...register("name", { required: "Name is required." })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="mb-1 block text-sm font-medium text-slate-700">
                Profile image URL{" "}
                <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="image"
                type="url"
                className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                placeholder="https://..."
                {...register("image")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-950 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
