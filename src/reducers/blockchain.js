import sha256 from "crypto-js/sha256";

// TODO run code in app without visualization
// TODO add chain to redux
// TODO make colorful aka visualize

// BLOCK
const createNewBlock = (index, timestamp, data, previousHash) => {
  return {
    index: index,
    timestamp: timestamp,
    data: data,
    previousHash: previousHash,
    hash: calculateHash(index, timestamp, data, previousHash),
  };
};

const calculateHash = (index, timestamp, data, previousHash) => {
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
  return createNewBlock(0, "12/10/2021", "Genesis block", "0");
};

const getLatestBlock = (chain) => {
  return chain[chain.length - 1];
};

export const addBlock = (chain, idx, date, data) => {
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(idx, date, data, previousHash);
  chain.push(newBlock);
};

// // USAGE
// let myChain = [createGenesisBlock()];
// addBlock(myChain, 1, "date", { data: "bla" });
// addBlock(myChain, 2, "datee", { data: "bla" });
