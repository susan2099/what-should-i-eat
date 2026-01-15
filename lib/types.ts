export type FoodItem = {
    id: string;
    name: string;
    image: string;
    tags: string[];
    price: "$" | "$$" | "$$$";
    timeMins: number;
    shortDesc: string;
  };