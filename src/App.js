import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import increment from "./actions/increment";
import decrement from "./actions/decrement";
import addBlockAction from "./actions/addBlockAction";

/**
 * *** REDUX ***
 * * Actions: An Action is a function that returns an object.
 * * Reducers: A Reducer takes care of the actions. ARGS (initial state, action).
 * * Dispatcher: A Dispatcher sends an action to a reducer.
 */

function App() {
  const counter = useSelector((state) => state.counterReducer);
  const chain = useSelector((state) => state.chain);
  const dispatch = useDispatch();

  // USAGE
  // let myChain = [createGenesisBlock()];
  // console.log(myChain);
  // addBlock(myChain, { data: "bla" });
  // console.log(myChain);
  // addBlock(myChain, { data: "blubi" });
  console.log(chain);

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(addBlockAction({ data: "lalal" }))}>
        MINE
      </button>
    </div>
  );
}

export default App;
