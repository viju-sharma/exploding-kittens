import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardTypes } from "../interfaces/Card.interface";
import { privateRequest } from "../utils/requestMethods";
import { toast } from "react-toastify";

const card_types: CardTypes[] = ["cat", "defuse", "suffle", "exploding"];

interface GameState {
  deck: CardTypes[];
  exposedCards: CardTypes[];
  defuseCard: number;
  lostGame: boolean;
  winGame: boolean;
  postWin: {
    status: "loading" | "succeeded" | "failed" | "";
    error: any;
  };
}

/**
 * Get Values from local storage
 */
const localDeck = JSON.parse(localStorage.getItem("deck") || "[]");
const localExposedCards = JSON.parse(
  localStorage.getItem("exposedCards") || "[]"
);
const localDefuseCard = JSON.parse(localStorage.getItem("defuseCard") || "[]");
const localLostGame = JSON.parse(localStorage.getItem("lostGame") || "[]");

const initialState: GameState = {
  deck: localStorage.getItem("deck") ? localDeck : [],
  exposedCards: localStorage.getItem("exposedCards") ? localExposedCards : [],
  defuseCard: localStorage.getItem("defuseCard") ? localDefuseCard : 0,
  lostGame: localStorage.getItem("lostGame") ? localLostGame : false,
  winGame: false,
  postWin: {
    status: "",
    error: "",
  },
} as GameState;

export const postWin = createAsyncThunk("game/won", async () => {
  console.log("won game funtion");
  const response = await privateRequest.post("/api/game/won");
  return response.data;
});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeGame: (state) => {
      localStorage.removeItem("deck");
      localStorage.removeItem("exposedCards");
      localStorage.removeItem("defuseCard");
      localStorage.removeItem("lostGame");
      
      /**
       * reset state
       */
      state.deck = [];
      state.exposedCards = [];
      state.defuseCard = 0;
      state.lostGame = false;
      state.winGame = false;
      state.postWin = {
        status: "",
        error: "",
      };
      // genereate random 5 element from items and push in deck
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * card_types.length);
        state.deck[i] = card_types[randomIndex];
      }
    },
    exposeCard: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const card = state.deck[index];
      switch (card) {
        case "cat":
          state.deck.splice(index, 1);
          state.exposedCards.push("cat");
          break;
        case "defuse":
          state.deck.splice(index, 1);
          state.exposedCards.push("defuse");
          state.defuseCard += 1;
          break;
        case "suffle":
          state.exposedCards.push("suffle");
          toast.dark("Deck Suffled");
          gameSlice.caseReducers.initializeGame(state);
          break;
        case "exploding":
          state.exposedCards.push("exploding");
          if (state.defuseCard > 0) {
            toast.dark("Defuse Card Used");
            state.deck.splice(index, 1);
            state.defuseCard -= 1;
          } else {
            toast.error("Exploading Card", { theme: "colored" });
            state.lostGame = true;
          }
          break;

        default:
          break;
      }
      if (state.deck.length === 0) {
        gameSlice.caseReducers.wonGame(state);
      }
      localStorage.setItem("deck", JSON.stringify(state.deck));
      localStorage.setItem("exposedCards", JSON.stringify(state.exposedCards));
      localStorage.setItem("defuseCard", JSON.stringify(state.defuseCard));
      localStorage.setItem('lostGame',JSON.stringify(state.lostGame))
    },

    wonGame: (state) => {
      state.winGame = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postWin.pending, (state, action) => {
        state.postWin.status = "loading";
      })
      .addCase(postWin.fulfilled, (state, action) => {
        state.postWin.status = "succeeded";
        // Add any fetched posts to the array
      })
      .addCase(postWin.rejected, (state, action) => {
        state.postWin.status = "failed";
        state.postWin.error = action.error.message;
      });
  },
});

export const { initializeGame, exposeCard } = gameSlice.actions;

export default gameSlice.reducer;
