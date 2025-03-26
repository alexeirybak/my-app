import { useState, useTransition } from "react";
 
export function SyncTabExample() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();
 
  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
 
  return (
    <div>
      <button onClick={() => selectTab("home")}>Главная</button>
      <button onClick={() => selectTab("about")}>О нас (медленная)</button>
      <button onClick={() => selectTab("contact")}>Контакты</button>
 
      <hr />
 
      {isPending ? (
        <div>Загрузка вкладки...</div>
      ) : (
        <div>
          {tab === "home" && <HomeTab />}
          {tab === "about" && <SlowAboutTab />}
          {tab === "contact" && <ContactTab />}
        </div>
      )}
    </div>
  );
}
 
function HomeTab() {
  return <h2>Главная страница</h2>;
}
 
function SlowAboutTab() {
  // Искусственная задержка для вкладки
  const startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // Ждём 1000ms
  }
  return <h2>О нас - это медленная вкладка</h2>;
}
 
function ContactTab() {
  return <h2>Контакты</h2>;
}

