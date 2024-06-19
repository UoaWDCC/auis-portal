import Hero from "@components/Hero";
import Intro from "@components/Intro";
import UpcomingEvents from "@components/UpcomingEvents";

export default function HomeScreen() {
  return (
    <div>
      <Hero/>
      <Intro/>
      <UpcomingEvents/>
    </div>
  );
}
