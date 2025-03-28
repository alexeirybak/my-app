import { useDeferredValue, useEffect, useState } from "react";
import { SearchList } from "./SearchList";

function App() {
  const [query, setQuery] = useState("");
  console.log("**************");
  console.log("Текст в поле input:", query);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    console.log("App useEffect query:", query);
  }, [query]);

  useEffect(() => {
    console.log("App useEffect deferredQuery:", deferredQuery);
  }, [deferredQuery]);

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <SearchList query={deferredQuery} />
    </>
  );
}

export default App;
