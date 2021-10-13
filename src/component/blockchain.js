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

export const addBlock = (currentChain, data) => {
  const chain = currentChain;
  if (chain.length === 0) {
    chain.push(createGenesisBlock());
  }
  let previousHash = getLatestBlock(chain).hash;
  let newBlock = createNewBlock(chain.length, data, previousHash);
  chain.push(newBlock);
  return chain;
};

// // USAGE
// let myChain = [createGenesisBlock()];
// addBlock(myChain, 1, "date", { data: "bla" });
// addBlock(myChain, 2, "datee", { data: "bla" });
