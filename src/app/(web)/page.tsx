import HeroSection from "@/components/HeroSection/HeroSection";
import PageSearch from "@/components/PageSearch/PageSearch";
import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import { getFeaturedRoom } from "@/lib/apis";
const Home = async () => {
  const featuredRoom = await getFeaturedRoom();

  return (
    <>
      {/* Hero Secion */}
      <HeroSection />
      {/* Page Search Section */}
      <PageSearch />
      {/* Featured Room Section */}
      <FeaturedRoom featuredRoom={featuredRoom} />
      {/* Gallery */}
      <Gallery />
      {/* News Letter */}
      <NewsLetter />
    </>
  );
};

export default Home;
