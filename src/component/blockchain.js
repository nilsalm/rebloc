import sha256 from "crypto-js/sha256";

// TODO make colorful aka visualize

// BLOCK
const createNewBlock = (index, data, previousHash) => {
  const timestamp = Math.floor(new Date().getTime() / 1000.0);

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

// API to compute the next block on a given chain from the data and return the block
export const computeNextBlock = (chain, data) => {
  if (chain.length === 0) {
    chain.push(createGenesisBlock());
  }
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(chain.length, data, previousHash);
  return newBlock;
};

// API to compute the next block on a given chain from the data and return the chain
export const addBlockToChain = (chain, data) => {
  if (chain.length === 0) {
    chain.push(createGenesisBlock());
  }
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(chain.length, data, previousHash);
  chain.push(newBlock);
  return chain;
};
