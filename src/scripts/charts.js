'use strict';

(function () {
  var Charts = (function () {
    var config = {
      firstInit: true
    };

    var colors = {
      brand: 'rgb(93, 131, 243)',
      brandTransparent: 'rgba(93, 131, 243, 0.5)',
      success: 'rgb(23, 198, 113)',
      successTransparent: 'rgba(23, 198, 113, 0.5)',
      accent: 'rgb(243, 93, 191)',
      accentTransparent: 'rgba(243, 93, 191, 0.5)',
      grayLight: 'rgb(218, 225, 231)',
      grayDark: 'rgb(135, 149, 161)'
    };

    var setGlobalOptions = function () {
      // setting the responsive mode to true by default
      Chart.defaults.global.responsive = true;

      // setting the axes color and padding
      Chart.defaults.line.scales.xAxes[0].gridLines =
      Chart.defaults.line.scales.yAxes[0].gridLines =
      Chart.defaults.bar.scales.xAxes[0].gridLines =
      Chart.defaults.bar.scales.yAxes[0].gridLines =
      Chart.defaults.horizontalBar.scales.xAxes[0].gridLines =
      Chart.defaults.horizontalBar.scales.yAxes[0].gridLines = {
        tickMarkLength: 20,
        color: colors.grayLight,
        zeroLineColor: 'transparent'
      };

      // setting the padding and label color for the yAxes (these don't have a tickMarkLength)
      Chart.defaults.line.scales.yAxes[0].ticks =
      Chart.defaults.bar.scales.yAxes[0].ticks = {
        padding: 16,
        fontColor: colors.grayDark
      };
      // setting the padding and label color for the xAxes (these don't have a tickMarkLength)
      Chart.defaults.line.scales.xAxes[0].ticks =
      Chart.defaults.bar.scales.xAxes[0].ticks = {
        padding: 8,
        fontColor: colors.grayDark
      };

      // hover settings for the line charts
      Chart.defaults.line.hover.mode = 'nearest';
      Chart.defaults.line.hover.intersect = true;

      // tooltips settings for the line charts
      Chart.defaults.line.tooltips = {
        mode: 'index',
        intersect: false
      };

      // setting the color of the polar area's grid lines to be the same as the x and y axes of the line and bar charts
      Chart.defaults.polarArea.scale.gridLines.color = colors.grayLight;
      Chart.defaults.polarArea.scale.angleLines.color = colors.grayLight;

      // setting the color of the radar's grid and angle lines to be the same as the x and y axes of the line and bar charts
      Chart.defaults.radar.scale.gridLines =
      Chart.defaults.radar.scale.angleLines = {
        color: colors.grayLight
      };

      // setting the legend label's color
      Chart.defaults.global.legend.labels.fontColor = colors.grayDark;
    };

    var newChart = function (canvas, options) {
      if (!window.Chart) {
        throw new Error('Dependency missing: chartjs');
      }

      if (!canvas) {
        throw new Error('The chart\'s canvas couldn\'t be found in the DOM.');
      }

      if (config.firstInit) {
        setGlobalOptions();
        config.firstInit = false;
      }

      return new Chart(canvas.getContext('2d'), options);
    };

    return {
      newChart: newChart,
      colors: colors
    };
  })();

  // init line chart
  var lineChartCanvas = document.getElementById('lineChart');
  if (lineChartCanvas) {
    Charts.newChart(lineChartCanvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', ''],
        datasets: [
          {
            label: 'Revenue',
            backgroundColor: 'transparent',
            borderColor: Charts.colors.brand,
            borderWidth: 2,
            pointRadius: 0,
            pointBackgroundColor: Charts.colors.brand,
            lineTension: 0,
            data: [4, 6, 2, 4, 2, 6, 4, 6, 4, 8, 5]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      }
    });
  }

  // init bar chart
  var barChartCanvas = document.getElementById('barChart');
  if (barChartCanvas) {
    Charts.newChart(barChartCanvas, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
        datasets: [
          {
            label: 'one-off',
            data: [25, 84, 35, 64, 10, 5, 27, 44, 100],
            backgroundColor: Charts.colors.successTransparent,
            borderColor: Charts.colors.success,
            borderWidth: 1
          },
          {
            label: 'recurring',
            data: [63, 40, 47, 64, 24, 16, 23, 63, 82],
            backgroundColor: Charts.colors.brandTransparent,
            borderColor: Charts.colors.brand,
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  // init pie chart
  var pieChartCanvas = document.getElementById('pieChart');
  if (pieChartCanvas) {
    Charts.newChart(pieChartCanvas, {
      type: 'pie',
      data: {
        labels: ['Pink', 'Green', 'Purple'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [38, 24, 38],
            backgroundColor: [Charts.colors.accent, Charts.colors.success, Charts.colors.brand]
          }
        ]
      }
    });
  }
})();
