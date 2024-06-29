import { placeholderData } from "./placeholderType";
import pubquiz from "./pubquiz.png";
import stein from "./stein.png";
import dance from "./dance.png";

export const dummyPastEvents: placeholderData[] = [
  {
    image: pubquiz,
    title: "Pubquiz",
    date: new Date(),
    location: "Location 1",
    is_paid: true,
    description: "Description 1",
  },
  {
    image: stein,
    title: "Stein",
    date: new Date(),
    location: "SweatShopBrewKitchen",
    is_paid: false,
    description: "Description 2",
  },
  {
    image: dance,
    title: "Event 3",
    date: new Date(),
    location: "Location 3",
    is_paid: true,
    description: "Description 3",
  },
];
