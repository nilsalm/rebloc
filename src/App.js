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
    const color = `#${b.hash.substring(0, 6)}`;
    console.log(color);
    const block = (
      <div className="block" key={`${idx}`} style={{ background: color }}>
        <h3>{`${b.index}`}</h3>
        <p>{`${b.hash}`}</p>
      </div>
    );

    return block;
  };
  const showChain = () => {
    return chain.map((block, idx) => blockText(block, idx));
  };

  return (
    <div className="App">
      <div style={{ margin: 30 }}>
        <h1>Counter {counter}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <div>
        <h1>El Kedja</h1>

        <button
          onClick={() =>
            dispatch(addBlockAction({ data: "lalal", cnt: counter }))
          }
        >
          <strong>⛏</strong>
        </button>
        <div className="chain-wrapper">
          <div className="chain">
            <>{showChain()}</>
          </div>
        </div>
        {/* <h2>{chain[counter].hash}</h2> */}
      </div>
    </div>
  );
}

export default App;
