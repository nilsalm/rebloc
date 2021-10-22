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

export const chainSlice = createSlice({
    name: 'chain',
    initialState,
    reducers: {
        // TODO think of it as an event, ex: mineOnClickAction
        addBlock: (state, action: PayloadAction<object>) => {
            const newBlock = computeNextBlock(state, action.payload);
            state.chain = [...state.chain, newBlock];   
        }
    }
});

export const {addBlock} = chainSlice.actions;

export const selectChain = (state: RootState) => state.chain;

export default chainSlice.reducer;
