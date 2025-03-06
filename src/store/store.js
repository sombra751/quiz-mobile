// store.js
import { createStore } from 'redux';

// Estado inicial
const initialState = {
  chartData: [
    ['Alternativas', 'Porcentagem de votos da platéia'],
    ['A', 0],
    ['B', 0],
    ['C', 0],
    ['D', 0],
  ],
  callHelp: '',
};

// Redutor
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHART_DATA':
      return { ...state, chartData: action.payload };
    case 'UPDATE_CALL_HELP':
      return { ...state, callHelp: action.payload };
    case 'RESET_CHART_DATA':
      return { ...state, chartData: action.payload };
    default:
      return state;
  }
};

// Criação da loja
const store = createStore(rootReducer);

export default store;