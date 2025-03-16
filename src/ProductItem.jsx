import { memo } from "react";

export const ProductItem = memo(({ product }) => {
  console.log("Меня рендерят");
  return <li>{product}</li>;
});
