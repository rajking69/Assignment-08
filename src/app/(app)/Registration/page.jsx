"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) toast.error(error.message || "Google sign-up failed");
    } catch (e) {
      toast.error(e?.message || "Google sign-up failed");
    }
  };

  const onSubmit = async (formData) => {
    const picture = (formData.picture || "").trim();

    if (picture) {
      try {
        const u = new URL(picture);
        if (u.protocol !== "http:" && u.protocol !== "https:") {
          toast.error("Picture must be an http or https URL.");
          return;
        }
      } catch {
        toast.error("Picture must be a valid URL.");
        return;
      }
    }

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        ...(picture ? { image: picture } : {}),
      });
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }
      toast.success("Account created. Welcome!");
      router.push("/");
      router.refresh();
    } catch (e) {
      toast.error(e?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-indigo-950">Create your account</h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Join ReadVault and start borrowing books for free.
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
            placeholder="Your name"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="you@email.com"
            {...register("email", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="picture" className="mb-1 block text-sm font-medium text-slate-700">
            Profile picture URL <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id="picture"
            type="url"
            className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="https://..."
            {...register("picture")}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="At least 8 characters"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">Password must be at least 8 characters.</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-950 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-xs text-slate-400">or</p>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 py-2.5 text-sm font-semibold transition-colors hover:bg-stone-50"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/Login" className="font-semibold text-indigo-700 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
