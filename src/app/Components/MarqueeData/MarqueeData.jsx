import booksData from "../../../../public/data.json";

const MarqueeData = () => {
  const books = Array.isArray(booksData) ? booksData : [];
  const arrivals = books.map((b) => b.title);

  const items = [
    ...arrivals.map((t) => `📚 New Arrival: ${t}`),
    "🎉 Special Discount on Memberships",
    "📖 Read Anywhere, Anytime",
    "🆓 Free Digital Borrowing",
  ];

  const track = [...items, ...items];

  return (
    <div className="mb-10 overflow-hidden border-y border-indigo-100 bg-indigo-50 py-3">
      <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium text-indigo-700"
          >
            {item}
            <span className="mx-8 text-indigo-300">|</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeData;
