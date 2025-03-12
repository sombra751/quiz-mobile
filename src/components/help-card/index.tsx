import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { WebView } from 'react-native-webview'; // Use WebView for Google Charts

interface ChartData {
  cols: { label: string; type: string }[];
  rows: { c: { v: string | number }[] }[];
}

const HelperCard: React.FC = () => {
  const chartData: ChartData = useSelector((state: any) => state.chartData);
  const callHelp: boolean = useSelector((state: any) => state.callHelp);

  const generateChartHTML = () => {
    const data = JSON.stringify(chartData);
    const options = JSON.stringify({
      title: 'Porcentagem de votos da torcida',
      chart: {
        title: 'Porcentagem de votos da torcida',
      },
      colors: ['#1b9e77'],
      backgroundColor: 'transparent',
    });

    return `
      <html>
        <head>
          <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
          <script type="text/javascript">
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
              var data = google.visualization.arrayToDataTable(${data.replace(/"/g, '&quot;')});
              var options = ${options};
              var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
              chart.draw(data, options);
            }
          </script>
        </head>
        <body>
          <div id="chart_div" style="width: 100%; height: 300px;"></div>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: generateChartHTML() }}
          style={styles.webView}
          scalesPageToFit={false}
          scrollEnabled={false}
        />
        {callHelp && (
          <View style={styles.helpTextContainer}>
            <Text style={styles.helpText}>
              A pessoa para qual você ligou acha que a resposta correta é:
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
  },
  chartContainer: {
    width: '90%', // Adjust as needed
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
  },
  webView: {
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
  },
  helpTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  helpText: {
    textAlign: 'center',
  },
});

export default HelperCard;