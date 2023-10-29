import BannerCards from "./(components)/(bannerCards)/BannerCards";
import Popular from "./(components)/(popular)/Popular";
import Taste from "./(components)/(taste)/Taste";
import Nature from "./(components)/(nature)/Nature";

export const revalidate = 86400

const HomePage = async () => {
  return (
    <div className="sectionGap">
      <BannerCards />
      <Popular />
      <Taste />
      <Nature />
    </div>
  );
};

export default HomePage;