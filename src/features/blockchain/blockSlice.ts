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


const initialState: ChainType = {
  chain: []
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

  inputJson.forEach((item, idx) => {
    const block: BlockType = {
      timestamp: item.timestamp,
      data: {
        data: item.data,
        difficulty: item.difficulty,
        nonce: item.nonce
      },
      hash: item.hash,
      previousHash: item.previousHash,
      index: idx
    }
    chain.chain.push(block)
  })

  return chain;

}

export const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        updateChainRemote: (state, action: PayloadAction<object>) => {
            const newChain = convertExtChainToChainType(action.payload)
            state.chain = newChain.chain
        }
    }
});

export const {updateChainRemote} = chainSlice.actions;

export const selectChain = (state: RootState) => state.chain;

export default chainSlice.reducer;
