import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import increment from "./actions/increment";
import decrement from "./actions/decrement";
import { addBlock, createGenesisBlock } from "./reducers/blockchain";

/**
 * *** REDUX ***
 * * Actions: An Action is a function that returns an object.
 * * Reducers: A Reducer takes care of the actions. ARGS (initial state, action).
 * * Dispatcher: A Dispatcher sends an action to a reducer.
 */

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // USAGE
  let myChain = [createGenesisBlock()];
  console.log(myChain);
  addBlock(myChain, { data: "bla" });
  console.log(myChain);
  addBlock(myChain, { data: "blubi" });
  console.log(myChain);

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;
