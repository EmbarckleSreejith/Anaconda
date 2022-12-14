import "./App.scss";
import { Game } from "./game";
import { Home } from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>         
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
// const Test = () => {
//   const [state, setState] = React.useState(1);

//   React.useEffect(() => {
//    const h = setTimeout(() => {
//       console.log("U");
//       setState(2);
//     }, 3000);

//     return () => {
//       clearTimeout(h)
//       console.log("Unmounted");
//     }
//   }, []);

//   return <div>{state}</div>;
// };

// export default function App() {
//   const [show, setShow] = React.useState(true);
//   return (
//     <div>
//       <button
//         onClick={() => {
//           setShow(false);
//         }}
//       >
//         Hide
//       </button>
//       {show && <Test />}
//     </div>
//   );
// }
