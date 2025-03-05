import { useState } from "react";

function MyComponent({ count = 0, increment, styles }) {
  return (
    <div style={styles}>
      <p>Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}

function MyComponent2({ count = 10, increment, styles }) {
  return (
    <div style={styles}>
      <p>Второй Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}

function MyComponent3({ count = 20, increment, styles }) {
  return (
    <div style={styles}>
      <p>Третий Счетчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}

function withCounter(WrappedComponents, styles) {
  function WithCounterComponent(props) {
    const [count, setCount] = useState(props.initialCount || 0);

    const increment = () => {
      setCount(count + 1);
    };

    return (
      <WrappedComponents
        styles={styles}
        count={count}
        increment={increment}
        {...props}
      />
    );
  }

  return WithCounterComponent;
}

export const EnhancedComponent1 = withCounter(MyComponent, {
  backgroundColor: "red",
});
export const EnhancedComponent2 = withCounter(MyComponent2, {
  backgroundColor: "blue",
});
export const EnhancedComponent3 = withCounter(MyComponent3, {
  backgroundColor: "green",
});
