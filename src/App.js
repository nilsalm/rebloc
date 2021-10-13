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

  console.log(chain);

  const blockText = (b, idx) => {
    // let myDate = new Date(b.timestamp * 1000); // jag lämnar det ifall vi vill visa datum
    return <p key={`${idx}`}>{`${b.hash} ${b.data.cnt}`}</p>;
  };
  const showChain = () => {
    return chain.map((block, idx) => blockText(block, idx));
  };

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button
        onClick={() =>
          dispatch(addBlockAction({ data: "lalal", cnt: counter }))
        }
      >
        <h1>⛏</h1>
      </button>
      <div>
        <>{showChain()}</>
      </div>
      {/* <h2>{chain[counter].hash}</h2> */}
    </div>
  );
}

export default App;
