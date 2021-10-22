import { computeNextBlock } from "./Blockchain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';

export interface BlockType {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
}

export interface ChainType { 
  chain: Array<BlockType>
}

const genesis: BlockType = {
  index: 0,
  timestamp: 0,
  data: {data: 'genesis'},
  previousHash: '0',
  hash: '----'
}
const initialState: ChainType = {
  chain: [genesis]
}

const convertExtChainToChainType = (inputJson: any) => {
  // input is an array of 
  //  BlockType {
  //     timestamp: number;    // the time of creation of block in milliseconds
  //     lastHash: string;     // hash of the last block on the chain
  //     hash: string;         // hash of the current block
  //     data: string;         // data in the block or the transactions
  //     nonce: number;        // basically noise to generate different hashes
  //     difficulty: number;   // measure to describe the mining difficulty
  //   }

  // output shall be an array of 
  // export interface BlockType {
  //     index: number;
  //     timestamp: number;
  //     data: any;
  //     previousHash: string;
  //     hash: string;
  // }

  const chain: ChainType = {
    chain: []
  };

  inputJson.forEach(item => {
    const block: BlockType = {
      timestamp: item.timestamp,
      data: {data: item.data},
      hash: item.hash,
      previousHash: item.previousHash,
      index: 0
    }
    chain.chain.push(block)
  })

  return chain;

}

export const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        // TODO think of it as an event, ex: mineOnClickAction
        addBlock: (state, action: PayloadAction<object>) => {
            const newBlock = computeNextBlock(state, action.payload);
            state.chain = [...state.chain, newBlock];   
        },
        updateChainRemote: (state, action: PayloadAction<object>) => {
            //  convert string[] to chaintype

            const newChain = convertExtChainToChainType(action.payload)

            // const newChain: ChainType = {
            //     chain: []
            // }

            state.chain = newChain.chain
        }
    }
});

export const {addBlock, updateChainRemote} = chainSlice.actions;

export const selectChain = (state: RootState) => state.chain;

export default chainSlice.reducer;
