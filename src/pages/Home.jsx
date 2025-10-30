import ColoredCards from "./components/Cards/ColoredCards";
import Genres from "./components/Cards/Genres";
import Qualities from "./components/Cards/Qualities";
import GroceryCaro from "./components/Carousels/GroceryCaro";
import WatchesCaro from "./components/Carousels/WatchesCaro";
import TabCards from "./components/Cards/TabCards";
import SubscribeCard from "./components/SubscribeCard";

function Home() {
  return (
    <div className="px-4">
      <Genres />
      <ColoredCards />
      <Qualities />
      <GroceryCaro />
      <WatchesCaro />
      <TabCards />
      <SubscribeCard />
    </div>
  );
}

export default Home;
