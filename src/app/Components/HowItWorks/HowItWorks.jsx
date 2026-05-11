import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Create an Account",
    body: "Sign up for free in seconds. Just your name, email, and a password.",
    cta: { label: "Register", href: "/Registration" },
  },
  {
    step: "02",
    title: "Browse the Library",
    body: "Explore books by category — Story, Tech, or Science. Filter and search to find your match.",
    cta: { label: "Browse", href: "/AllBooks" },
  },
  {
    step: "03",
    title: "Borrow & Read",
    body: "Click 'Borrow This Book' on any details page. Start reading instantly — no waiting.",
    cta: null,
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-14 px-4 pb-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Simple process</p>
        <h2 className="mt-1 text-2xl font-bold text-indigo-950">How It Works</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className="relative flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm"
          >
            {i < steps.length - 1 && (
              <span
                className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-indigo-200 sm:block"
                aria-hidden
              >
                →
              </span>
            )}
            <span className="text-4xl font-black text-indigo-100">{s.step}</span>
            <div>
              <h3 className="text-base font-bold text-indigo-950">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{s.body}</p>
            </div>
            {s.cta && (
              <Link
                href={s.cta.href}
                className="mt-auto inline-flex w-fit items-center gap-1 rounded-lg bg-indigo-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-800"
              >
                {s.cta.label} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
