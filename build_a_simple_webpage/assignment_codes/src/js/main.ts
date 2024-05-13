import { insertBadge } from "./badge";
import "../css/style.css";
import * as XLSX from "xlsx";

insertBadge();

// Your script here
interface CardJson {
  Image: string;
  Set: string;
  ["Collector Number"]: number;
  Name: string;
  Description: string;
}

interface CardData {
  img_link: string;
  set: string;
  collector: number;
  card_name: string;
  card_description: string;
}

interface Card {
  img_link: string;
  set: string;
  collector: number;
  card_name: string;
  card_description: string;
}

// pull excel data from a sheet
const getData = async (url: string): Promise<CardJson[]> => {
  const res = await fetch(url);
  const data = await res.arrayBuffer();

  const workbook = XLSX.read(data);
  const d = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1) as CardJson[];
  return d;
};

// diy schema
const parseJsonAsCard = (data: CardJson): CardData => {
  return {
    img_link: data.Image,
    set: data.Set,
    collector: data["Collector Number"],
    card_name: data.Name,
    card_description: data.Description,
  };
};

// parse data into card
const parseAndValidateCard = (arg: CardData): Card => {
  //check for null or undefined values
  if (arg.img_link == null) {
    console.log("link is empty");
  }

  if (arg.set == null) {
    console.log("set name is empty");
  }

  if (arg.collector == null) {
    console.log("collector number is empty");
  }

  if (arg.card_name == null) {
    console.log("card name is empty");
  }

  if (arg.card_description == null) {
    console.log("card description is empty");
  }

  //check for invalid collector numbers
  if (arg.collector > 999 || arg.collector < 0 || arg.collector % 1 != 0) {
    console.log("invalid collector number");
  }

  return {
    img_link: arg.img_link,
    set: arg.set.toUpperCase(),
    collector: arg.collector,
    card_name: arg.card_name,
    card_description: arg.card_description,
  };
};

// create element and insert into dom
const createCardNode = (card: Card): HTMLDivElement => {
  // create DOM elements
  const card_box: HTMLDivElement = document.createElement("div");
  const card_image_box: HTMLDivElement = document.createElement("div");
  const card_image: HTMLImageElement = document.createElement("img");
  const set_collector: HTMLParagraphElement = document.createElement("p");
  const card_name: HTMLParagraphElement = document.createElement("p");
  const card_description: HTMLParagraphElement = document.createElement("p");

  // set class attributes
  card_box.setAttribute("class", "card-box");
  card_image_box.setAttribute("class", "card-image-box");
  card_image.setAttribute("class", "card-image");
  set_collector.setAttribute("class", "set-collector");
  card_name.setAttribute("class", "card-name");
  card_description.setAttribute("class", "card-description");

  // set image attributes
  card_image.setAttribute("src", card.img_link);
  card_image.setAttribute("alt", card.card_name);

  // set text
  set_collector.textContent =
    card.set + " | " + card.collector.toString().padStart(3, "0");
  card_name.textContent = card.card_name;
  card_description.textContent = card.card_description;

  //create card DOM
  card_box.appendChild(card_image_box);
  card_box.appendChild(set_collector);
  card_box.appendChild(card_name);
  card_box.appendChild(card_description);

  card_image_box.appendChild(card_image);

  // add into grid
  const card_grid = document.querySelector(".card-grid");
  card_grid?.appendChild(card_box);

  // debugging
  console.log("added card into DOM.");
  return card_box;
};

// sort functions
const sortCardNodes = (cards: Card[], order: string): void => {
  // empty children of parent
  const card_grid = document.querySelector(".card-grid");
  card_grid?.replaceChildren();

  //get new order based on dropdown menu
  let newCards: Card[] | null = null;

  switch (order) {
    case "ascending":
      newCards = sortCards(cards, order);
      break;
    case "descending":
      newCards = sortCards(cards, order);
      break;
  }

  if (newCards != null) {
    newCards.forEach((card) => {
      createCardNode(card);
    });
  }
};

const sortCards = (cards: Card[], order: string): Card[] => {
  switch (order) {
    case "ascending":
      cards.sort((a, b) => {
        return a.collector - b.collector;
      });
      break;
    case "descending":
      cards.sort((a, b) => {
        return b.collector - a.collector;
      });
      break;
    default:
      console.log("wrong order input");
  }

  return cards;
};

// main
const dataArr = await getData("cards.xlsx");

const cardArr: Card[] = dataArr.map((data) => {
  const cardData = parseJsonAsCard(data);
  const card = parseAndValidateCard(cardData);
  return card;
});

let sortedCardArr = sortCards(cardArr, "ascending");

sortedCardArr.map((card) => {
  return createCardNode(card);
});

// add event listener to dropdown
const dropdown: HTMLSelectElement | null =
  document.querySelector("#sort-dropdown");

dropdown?.addEventListener("change", (e) => {
  sortCardNodes(cardArr, (e.target as HTMLSelectElement).value);
});
