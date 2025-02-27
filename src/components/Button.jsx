// export function Button(props) {
//   //props.onClick = reaction; // Так делать нельзя
//   const reaction = props.onClick;
//   return (
//     <button onClick={reaction} style={props.btnStyles}>
//       {props.label || "Просто кнопка"}
//     </button>
//   );
// }
export function Button({ onClick, btnStyles, label = "Просто кнопка" }) {
  //props.onClick = reaction; // Так делать нельзя
  return (
    <button onClick={onClick} style={btnStyles}>
      {label}
    </button>
  );
}
