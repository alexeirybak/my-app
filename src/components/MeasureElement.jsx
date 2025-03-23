import { useLayoutEffect, useState, useRef } from "react";

function MeasureElement() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (elementRef.current) {
      const { width } = elementRef.current.getBoundingClientRect();
      console.log("Измерение в useLayoutEffect:", width);
      setWidth(width);
    }
  }, []);

  return (
    <div>
      <div
        ref={elementRef}
        style={{
          border: "1px solid black",
          padding: "10px",
          backgroundColor: width > 600 ? "lightgreen" : "lightcoral", // Изменяем цвет фона
        }}
      >
        Измеряемый элемент
      </div>
      <p>Ширина элемента: {width}px</p>
    </div>
  );
}

export default MeasureElement;
