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
    case "ADD_CARD":
      return { 
        ...state, 
        cardCollection: [...state.cardCollection, action.payload as FinancialCard]
      };

    case "REMOVE_CARD":
      return {
        ...state,
        cardCollection: state.cardCollection.filter((card) => card.id !== action.payload as unknown),
      };

    default:
      return state;
  }
};