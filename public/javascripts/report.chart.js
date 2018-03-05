var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: ["Red", "Green", "Blue"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 0, 0, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(0, 0, 255, 0.2)"
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(0, 0, 255, 1)"
        ],
        data: [CONFIG.env.red, CONFIG.env.green, CONFIG.env.blue],
        borderWidth: 1
      },
      {
        type: "line",
        fill: false,
        borderColor: "rgba(0, 0, 0, .9)",
        data: [128, 128, 128]
      },
      {
        type: "line",
        fill: false,
        borderColor: "rgba(128, 128, 128, .7)",
        data: [128, 128, 128]
      }
    ]
  },

  // Configuration options go here
  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: { min: 0, max: 255 }
        }
      ]
    }
  }
});
