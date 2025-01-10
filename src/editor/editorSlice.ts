import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import localStorageWrap from './localStorageWrap';

export interface EditorState {
  theme: string;
  isReadMode: boolean;
  wordCount: number;
  showSendItIcon: boolean;
}

const initialState: EditorState = {
  wordCount: localStorageWrap.getWordCount(),
  isReadMode: localStorageWrap.getValue("isReadMode") === 'true',
  theme: localStorageWrap.getValue("theme") || 'dark',
  showSendItIcon: false,
};

export const editorSLice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorageWrap.setValue('theme', state.theme)
    },
    toggleReadMode: (state) => {
      state.isReadMode = !state.isReadMode;
      localStorageWrap.setValue('isReadMode', state.isReadMode.toString())
    },
    toggleSendItIcon: (state) => {
      console.log("toggleSendItIcon", !state.showSendItIcon)
      state.showSendItIcon = !state.showSendItIcon;
    },
    setWordCount: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      const storedWords = localStorageWrap.getWordCount()
      const accCount = storedWords + action.payload
      localStorageWrap.setWordCount(accCount)
      state.wordCount = accCount;
    },
  },
});

export const { toggleTheme, toggleReadMode, setWordCount, toggleSendItIcon } = editorSLice.actions;

export const selectTheme = (state: RootState): string => state.editor.theme;

export const selectWordCount = (state: RootState): number => state.editor.wordCount

export const selectIsReadMode = (state: RootState): boolean => state.editor.isReadMode;

export const selectShowSendItIcon = (state: RootState): boolean => state.editor.showSendItIcon;


export default editorSLice.reducer;
