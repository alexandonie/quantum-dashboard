import Chart from 'chartjs';

class Charts {
  constructor () {
    this.firstInit = true;
    this.colors = {
      brand: 'rgb(93, 131, 243)',
      brandTransparent: 'rgba(93, 131, 243, 0.5)',
      success: 'rgb(23, 198, 113)',
      successTransparent: 'rgba(23, 198, 113, 0.5)',
      accent: 'rgb(243, 93, 191)',
      accentTransparent: 'rgba(243, 93, 191, 0.5)',
      grayLight: 'rgb(218, 225, 231)',
      grayDark: 'rgb(135, 149, 161)'
    };
  }

  setGlobalOptions () {
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
      color: this.colors.grayLight,
      zeroLineColor: 'transparent'
    };

    // setting the padding and label color for the yAxes (these don't have a tickMarkLength)
    Chart.defaults.line.scales.yAxes[0].ticks =
    Chart.defaults.bar.scales.yAxes[0].ticks = {
      padding: 16,
      fontColor: this.colors.grayDark
    };

    // setting the padding and label color for the xAxes (these don't have a tickMarkLength)
    Chart.defaults.line.scales.xAxes[0].ticks =
    Chart.defaults.bar.scales.xAxes[0].ticks = {
      padding: 8,
      fontColor: this.colors.grayDark
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
    Chart.defaults.polarArea.scale.gridLines.color = this.colors.grayLight;
    Chart.defaults.polarArea.scale.angleLines.color = this.colors.grayLight;

    // setting the color of the radar's grid and angle lines to be the same as the axes of the line and bar charts
    Chart.defaults.radar.scale.gridLines =
    Chart.defaults.radar.scale.angleLines = {
      color: this.colors.grayLight
    };

    // setting the legend label's color
    Chart.defaults.global.legend.labels.fontColor = this.colors.grayDark;
  }

  createChart (canvas, options) {
    if (!canvas) {
      throw new Error('The chart\'s canvas couldn\'t be found in the DOM.');
    }

    if (this.firstInit) {
      this.setGlobalOptions();
      this.firstInit = false;
    }

    return new Chart(canvas.getContext('2d'), options);
  }

  init () {
    // init line chart
    const lineChartCanvas = document.getElementById('lineChart');
    if (lineChartCanvas) {
      this.createChart(lineChartCanvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', ''],
          datasets: [
            {
              label: 'Revenue',
              backgroundColor: 'transparent',
              borderColor: this.colors.brand,
              borderWidth: 2,
              pointRadius: 0,
              pointBackgroundColor: this.colors.brand,
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
    const barChartCanvas = document.getElementById('barChart');
    if (barChartCanvas) {
      this.createChart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
          datasets: [
            {
              label: 'one-off',
              data: [25, 84, 35, 64, 10, 5, 27, 44, 100],
              backgroundColor: this.colors.successTransparent,
              borderColor: this.colors.success,
              borderWidth: 1
            },
            {
              label: 'recurring',
              data: [63, 40, 47, 64, 24, 16, 23, 63, 82],
              backgroundColor: this.colors.brandTransparent,
              borderColor: this.colors.brand,
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
    const pieChartCanvas = document.getElementById('pieChart');
    if (pieChartCanvas) {
      this.createChart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: ['Pink', 'Green', 'Purple'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [38, 24, 38],
              backgroundColor: [this.colors.accent, this.colors.success, this.colors.brand]
            }
          ]
        }
      });
    }
  }
}

export default Charts;
