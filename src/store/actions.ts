// actions.ts
export const updateChartData = (data: any[][]) => ({
    type: 'UPDATE_CHART_DATA',
    payload: data,
  });
  
  export const updateCallHelp = (helpText: string) => ({
    type: 'UPDATE_CALL_HELP',
    payload: helpText,
  });
  
  export const resetChartData = () => ({
    type: 'RESET_CHART_DATA',
    payload: [
      ['Alternativas', 'Porcentagem de votos da platéia'],
      ['A', 0],
      ['B', 0],
      ['C', 0],
      ['D', 0],
    ],
  });