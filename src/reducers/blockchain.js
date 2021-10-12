// TODO install sha256
// TODO run code in app without visualization
// TODO add chain to redux
// TODO make colorful aka visualize

import { time } from "console";
import { chain } from "lodash";
import { block } from "strip-comments";

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
  return SHA256(
    index,
    previousHash,
    timestamp,
    JSON.stringify(data).toString()
  );
};

// BLOCKCHAIN
const createGenesisBlock = () => {
  return createNewBlock(0, "12/10/2021", "Genesis block", "0");
};

const getLatestBlock = (chain) => {
  return chain[chain.length - 1];
};

const addBlock = (chain, idx, date, data) => {
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(idx, date, data, previousHash);
  chain.push(newBlock);
};

// USAGE
let myChain = [createGenesisBlock()];
addBlock(myChain, 1, "date", { data: "bla" });
addBlock(myChain, 2, "datee", { data: "bla" });
