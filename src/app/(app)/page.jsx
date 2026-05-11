import React from "react";
import booksData from "../../../public/data.json";
import Banner from "../Components/Banner/Banner";
import MarqueeData from "../Components/MarqueeData/MarqueeData";
import FeaturedBooks from "../Components/FeaturedBooks/FeaturedBooks";
import WhyBorrow from "../Components/WhyBorrow/WhyBorrow";
import HowItWorks from "../Components/HowItWorks/HowItWorks";

const Page = () => {
  const books = Array.isArray(booksData) ? booksData : [];

  return (
    <div className="container mx-auto">
      <Banner />
      <MarqueeData />
      <FeaturedBooks books={books} />
      <WhyBorrow />
      <HowItWorks />
    </div>
  );
};

export default Page;
