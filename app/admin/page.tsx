import type { Metadata } from "next";
import Image from "next/image";
import { getMissingAdminEnvironmentVariables, isAdminAuthenticated } from "../lib/admin-auth";
import { AdminEditor } from "./admin-editor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: { absolute: "Content Admin | Move2Marbella" },
};

const errorMessages: Record<string, string> = {
  config: "The admin environment variables are not configured yet.",
  invalid: "The password is incorrect.",
  origin: "The login request could not be verified.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const missingVariables = getMissingAdminEnvironmentVariables();
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    return <AdminEditor />;
  }

  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f253d] px-5 py-12 text-[#172033]">
      <section className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-2xl sm:p-8">
        <Image
          src="/m2m_logo_blue_web.png"
          alt="Move2Marbella"
          height={52}
          width={208}
          className="h-auto w-52"
          priority
        />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[#aa8447]">
          Private administration
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#0f253d]">Content Admin</h1>
        <p className="mt-3 text-sm leading-6 text-[#625f59]">
          Sign in to edit the multilingual app and valuation copy. Publishing creates a
          versioned GitHub commit and starts a Vercel deployment.
        </p>

        {missingVariables.length > 0 ? (
          <div className="mt-6 rounded-[6px] border border-[#e5b8b2] bg-[#fff3f1] p-4 text-sm text-[#8f2f27]">
            <p className="font-semibold">Admin setup is incomplete.</p>
            <p className="mt-2">Add these Vercel environment variables:</p>
            <code className="mt-2 block whitespace-pre-wrap font-mono text-xs">
              {missingVariables.join("\n")}
            </code>
          </div>
        ) : null}

        {error ? (
          <p className="mt-5 rounded-[6px] border border-[#e5b8b2] bg-[#fff3f1] p-3 text-sm font-semibold text-[#8f2f27]">
            {errorMessages[error] ?? "Login failed."}
          </p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#6f6a61]">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              disabled={missingVariables.length > 0}
              className="h-12 rounded-[6px] border border-[#cfc9be] px-3 text-base outline-none focus:border-[#ba9456] focus:ring-4 focus:ring-[#ba9456]/20 disabled:bg-[#eeeae3]"
            />
          </label>
          <button
            disabled={missingVariables.length > 0}
            className="h-12 rounded-[6px] bg-[#ba9456] px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#a98549] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
