import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import increment from "./actions/increment";
import decrement from "./actions/decrement";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;
