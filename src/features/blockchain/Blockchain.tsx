import { updateChainRemote, selectChain, BlockType, ChainType } from "./blockSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Blockchain.module.css';

export function Blockchain() {
  const stateChain = useAppSelector(selectChain);
  const dispatch = useAppDispatch();

  console.log(stateChain);

  const addBlockRemote = async (msg: Object) => {
    try {
      const response = await fetch("http://localhost:3001/mine",  {
        method: "POST", 
        headers: {
          'content-type' : 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(msg),
      });
  
      const json = await response.json();
      console.log(json);
  
      dispatch(updateChainRemote(json))
  
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const getChainRemote = async () => {
    try {
      const response = await fetch("http://localhost:3001/blocks",  {
        method: "GET",
      });
  
      const json = await response.json();
      console.log(json);
  
      dispatch(updateChainRemote(json))
  
    } catch (error) {
      console.log("error", error);
    }
  };

  const blockText = (b: BlockType, idx: number) => {
    // let myDate = new Date(b.timestamp * 1000); // jag lämnar det ifall vi vill visa datum
    const color = `#${b.hash.substring(6, 12)}`;
    const block = (
      <div className={styles.block} key={`${idx}`} style={{ background: color }}>
        <p className={styles.blockMeta}>{`${b.index}`}</p>
        <h3>{`${b.data.data}`}</h3>
        <p>{`${b.hash}`}</p>
        {b.data.difficulty ? <p className={styles.blockMeta}>{`Difficulty: ${b.data.difficulty}`}</p> : null}
        {b.data.nonce ? <p className={styles.blockMeta}>{`Nonce: ${b.data.nonce}`}</p> : null}
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
        <h1>⛓ The Chain ⛓</h1>
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
            addBlockRemote({
              data: (document.getElementById("datainput") as HTMLInputElement).value,
            });
            (document.getElementById("datainput") as HTMLInputElement).value = "";
          }}
          className="miningbutton"
        >
          <p>💎</p>
        </button>
       
        <button
          onClick={() => getChainRemote()}
          className="miningbutton"
        >
          <p>♻️</p>
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
