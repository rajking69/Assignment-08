import { MdVerified, MdDevices, MdAutorenew, MdSupportAgent } from "react-icons/md";

const perks = [
  {
    icon: MdVerified,
    color: "text-indigo-600 bg-indigo-100",
    title: "Verified Collection",
    body: "Every title is hand-curated by our librarians across Story, Tech, and Science.",
  },
  {
    icon: MdDevices,
    color: "text-amber-600 bg-amber-100",
    title: "Read on Any Device",
    body: "Access your borrowed books on mobile, tablet, or desktop — no downloads needed.",
  },
  {
    icon: MdAutorenew,
    color: "text-emerald-600 bg-emerald-100",
    title: "Easy Renewals",
    body: "Need more time? Renew your borrow in one click before it expires.",
  },
  {
    icon: MdSupportAgent,
    color: "text-rose-600 bg-rose-100",
    title: "24/7 Support",
    body: "Our team is always here to help you find your next favorite book.",
  },
];

const WhyBorrow = () => {
  return (
    <section className="mt-14 px-4 pb-6">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Why us?</p>
        <h2 className="mt-1 text-2xl font-bold text-indigo-950">Why Borrow With ReadVault</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => {
          const Icon = perk.icon;
          return (
            <div
              key={perk.title}
              className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${perk.color}`}>
                <Icon className="text-xl" aria-hidden />
              </div>
              <h3 className="font-semibold text-indigo-950">{perk.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{perk.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyBorrow;
