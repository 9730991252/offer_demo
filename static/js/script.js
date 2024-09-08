/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 10 },
  { minDegree: 31, maxDegree: 60, value: 10 },
  { minDegree: 0, maxDegree: 30, value: 10 },
  { minDegree: 331, maxDegree: 360, value: 10 },
  { minDegree: 301, maxDegree: 330, value: 20 },
  { minDegree: 271, maxDegree: 300, value: 0 },
  { minDegree: 241, maxDegree: 270, value: 10 },
  { minDegree: 211, maxDegree: 240, value: 10 },
  { minDegree: 181, maxDegree: 210, value: 10 },
  { minDegree: 151, maxDegree: 180, value: 10 },
  { minDegree: 121, maxDegree: 150, value: 0 },
  { minDegree: 91, maxDegree: 120, value: 50 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#b3b3b3",
  "#523cfa",
  "#ffbb00",
  "#5bd985",
  "#de4967",
  "#b163da",
  "#523cfa",
  "#b3b3b3",
  "#523cfa",
  "#ffbb00",
  "#5bd985",
  "#de4967",
];
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [10, 10, 10, 10, 20, 0, 10, 10, 10, 10, 0, 50],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won ${i.value} % Of on your Bill ! </p>`;
      spinBtn.disabled = false;
      success_audio()
      const msg = new SpeechSynthesisUtterance;
      msg.text=`Congratulations, You Have Won ${i.value} % Of on your Bill !`;
      msg.voice=speechSynthesis.getVoices()[1];
      speechSynthesis.speak(msg);
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 30.50);
});
/* --------------- End Spin Wheel  --------------------- */





































function success_audio(){
  var audio = document.getElementById('audio');
  audio.play();
}