import { memo } from "react";

export const SearchList = memo(function SearchList({ query }) {
  console.log("Рендеринг SearchList", query);

  let items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<SearchItem key={i} query={query} />);
  }

  return <ul>{items}</ul>;
});

export function SearchItem({ query }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // Цикл затратит 10 мс
  }
  console.log("Рендеринг SearchItem");
  return <li>Введено: {query}</li>;
}
