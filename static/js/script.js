/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 76, maxDegree: 90, value: 1 },
  { minDegree: 61, maxDegree: 75, value: 2 },
  { minDegree: 46, maxDegree: 60, value: 3 },
  { minDegree: 31, maxDegree: 45, value: 4 },
  { minDegree: 16, maxDegree: 30, value: 5 },
  { minDegree: 0, maxDegree: 15, value: 6 }, 
  
  { minDegree: 346, maxDegree: 360, value: 7 }, 
  { minDegree: 331, maxDegree: 345, value: 8 },
  { minDegree: 316, maxDegree: 330, value: 9 },
  { minDegree: 301, maxDegree: 315, value: 10 },
  { minDegree: 286, maxDegree: 300, value: 11 },
  { minDegree: 271, maxDegree: 285, value: 12 },
  { minDegree: 256, maxDegree: 270, value: 13 },
  { minDegree: 241, maxDegree: 255, value: 14 },
  { minDegree: 226, maxDegree: 240, value: 15 },
  { minDegree: 211, maxDegree: 225, value: 16 },
  { minDegree: 196, maxDegree: 210, value: 17 },
  { minDegree: 181, maxDegree: 195, value: 18 },
  { minDegree: 166, maxDegree: 180, value: 19 }, 
  { minDegree: 151, maxDegree: 165, value: 20 },
  { minDegree: 136, maxDegree: 150, value: 21 },
  { minDegree: 121, maxDegree: 135, value: 22 },
  { minDegree: 106, maxDegree: 120, value: 23 },
  { minDegree: 91, maxDegree: 105, value: 24 },

];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
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
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15,16,17,18,19,20,21,22,23,24],
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
        font: { size: 15 },
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
    } else if (count > 10 && spinChart.options.rotation == randomDegree) {
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