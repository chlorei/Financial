import { FinancialCard } from "../types/types";

interface CardAction {
  type: string;
  payload: FinancialCard | FinancialCard[] | number; 
}

const defaultState = {
  cardCollection: [] as FinancialCard[], 
};

export const cardReducer = (state = defaultState, action: CardAction) => {
  switch (action.type) {
    // case "SET_CARDS":
    //   return { 
    //     ...state, 
    //     cardCollection: Array.isArray(action.payload) ? action.payload : state.cardCollection 

    case "ADD_CARD":
      return { 
        ...state, 
        cardCollection: [...state.cardCollection, action.payload as FinancialCard]
      };

    case "REMOVE_CARD":
      return {
        ...state,
        cardCollection: state.cardCollection.filter((card) => card.id !== action.payload),
      };

    default:
      return state;
  }
};