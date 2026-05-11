"use client";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginInner() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";

  const onSubmit = async (formData) => {
    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL,
      });
      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }
      toast.success("Logged in successfully");
      router.push(callbackURL);
      router.refresh();
    } catch (e) {
      toast.error(e?.message || "Something went wrong. Try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
      if (error) toast.error(error.message || "Google login failed");
    } catch (e) {
      toast.error(e?.message || "Google login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-indigo-950">Welcome back</h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Sign in to borrow books and track your reading.
          </p>
        </div>

        <div>
          <label htmlFor="email"           className="mb-1 block text-sm font-medium text-slate-700">
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
          <label htmlFor="password"           className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-950 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-xs text-stone-400">or</p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 py-2.5 text-sm font-semibold transition-colors hover:bg-stone-50"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          New to ReadVault?{" "}
          <Link href="/Registration" className="font-semibold text-indigo-700 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

const Login = () => {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
};

export default Login;
