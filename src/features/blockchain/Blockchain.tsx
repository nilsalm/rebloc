import sha256 from "crypto-js/sha256";
import { addBlock, selectChain, BlockType, ChainType } from "./blockSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Blockchain.module.css';

// BLOCK
const createNewBlock = (index: number, data: any, previousHash: string) => {
  var timestamp = Math.floor(new Date().getTime());
  var myHash = calculateHash(index, timestamp, data, previousHash)

  //// Adding difficulty
  // var winCondition = "0"
  // if (winCondition !== undefined) {
  //   console.log("Hash", myHash)
  //   while (!myHash.startsWith(winCondition)) {
  //     timestamp = Math.floor(new Date().getTime());
  //     console.log("Hash", myHash)
  //     myHash = calculateHash(index, timestamp, data, previousHash)
  //   }
  // }

  const newBlock: BlockType = {
    index: index,
    timestamp: timestamp,
    data: data,
    previousHash: previousHash,
    hash: myHash,
  };
  return newBlock;
};

const calculateHash = (index: number, timestamp: number, data: any, previousHash: string) => {
  let obj = {
    index: index,
    timestamp: timestamp,
    data: data,
    previousHash: previousHash,
  };

  return sha256(JSON.stringify(obj)).toString();
};

// BLOCKCHAIN
export const createGenesisBlock = () => {
  return createNewBlock(0, "Genesis block", "0");
};

const getLatestBlock = (chain: ChainType) => {
  const last = chain.chain.length - 1;
  return chain.chain[last];
};

// API to compute the next block on a given chain from the data and return the block
export const computeNextBlock = (chain: ChainType, data: any) => {
  const c = chain.chain;
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(c.length, data, previousHash);
  return newBlock;
};

// API to compute the next block on a given chain from the data and return the chain
// export const addBlockToChain = (chain, data) => {
//   if (chain.length === 0) {
//     chain.push(createGenesisBlock());
//   }
//   let previousHash = getLatestBlock(chain).hash;
//   let newBlock = createNewBlock(chain.length, data, previousHash);
//   chain.push(newBlock);
//   return chain;
// };

export function Blockchain() {
  /**
   * TODO for chain problem: build an interface and implementation similar to the counter from counterSlice.ts
   * export const selectCount = (state: RootState) => state.counter.value;
   */
  const stateChain = useAppSelector(selectChain);
  const dispatch = useAppDispatch();

  console.log(stateChain);

  const blockText = (b: BlockType, idx: number) => {
    // let myDate = new Date(b.timestamp * 1000); // jag lämnar det ifall vi vill visa datum
    const color = `#${b.hash.substring(0, 6)}`;
    console.log(color);
    const block = (
      <div className={styles.block} key={`${idx}`} style={{ background: color }}>
        <p>{`${b.index}`}</p>
        <h3>{`${b.data.data}`}</h3>
        <p>{`${b.hash}`}</p>
      </div>
    );

    return block;
  };

  const showChain = (chain: ChainType) => {
    return chain.chain.map((block, idx) => blockText(block, idx));
  };

  return (
    <div>
      <div>
        <h1>El Kedja</h1>
      </div>

      <div className="inputform">
        <input
          type="text"
          id="datainput"
          name="data"
          className="textfield"
        ></input>

        <button
          onClick={() => {
            dispatch(
              addBlock({
                data: (document.getElementById("datainput") as HTMLInputElement).value,
              })
            );
            (document.getElementById("datainput") as HTMLInputElement).value = "";
          }}
          className="miningbutton"
        >
          <p>⛏</p>
        </button>
      </div>

      <div className={styles.chainwrapper}>
        <div className={styles.chain}>
          <>{showChain(stateChain)}</>
        </div>
      </div>
    </div>
  );
}
