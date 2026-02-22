let chart;

// Sayfa yüklendiğinde ilk hesap
window.addEventListener("load", update);


// Tüm input değişimlerinde çalıştır
document.querySelectorAll("input, select")
  .forEach(el => el.addEventListener("input", update));


function update() {

  const nominal = parseFloat(document.getElementById("nominal").value) || 0;
  const grade = parseInt(document.getElementById("grade").value) || 6;
  const mode = document.getElementById("mode").value;

  if (nominal <= 0) return;

  // IT hesapla
  const IT = calculateIT(grade, nominal);

  // Limitleri hesapla
  const limits = calculateLimits(nominal, IT, mode);

  document.getElementById("minValue").innerText = limits.min.toFixed(3);
  document.getElementById("maxValue").innerText = limits.max.toFixed(3);

  // Fit sonucu (şimdilik sadece bilgi amaçlı)
  document.getElementById("fitResult").innerText = "-";

  // Grafik yenile
  drawChart(limits.min, nominal, limits.max);
}


// Grafik çizimi
function drawChart(min, nominal, max) {

  if (chart) chart.destroy();

  const ctx = document.getElementById("chart");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Min", "Nominal", "Max"],
      datasets: [{
        data: [min, nominal, max],
        borderColor: "#111",
        borderWidth: 2,
        pointRadius: 4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}


// Basit PDF (tarayıcı yazdırma)
function exportPDF() {
  window.print();
}
