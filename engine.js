//
// TOLERON - ENGINE
// ISO 286 temel tolerans motoru
//

// ISO IT hesaplama
function calculateIT(grade, D) {

  // Standart tolerans birimi
  let i = 0.45 * Math.cbrt(D) + 0.001 * D;

  const multipliers = {
    6: 10,
    7: 16,
    8: 25
  };

  // Eğer grade tanımlı değilse default 6
  let factor = multipliers[grade] || multipliers[6];

  return factor * i;
}


// İç / Dış limit hesabı
function calculateLimits(nominal, IT, mode) {

  // İç ölçü (Delik)
  if (mode === "hole") {
    return {
      min: nominal,
      max: nominal + IT
    };
  }

  // Dış ölçü (Şaft)
  if (mode === "shaft") {
    return {
      min: nominal - IT,
      max: nominal
    };
  }

  // Güvenlik
  return {
    min: nominal,
    max: nominal
  };
}


// Fit analizi
function calculateFit(hMin, hMax, sMin, sMax) {

  let minClearance = hMin - sMax;
  let maxClearance = hMax - sMin;

  if (minClearance > 0) return "Boşluklu Geçme";
  if (maxClearance < 0) return "Sıkı Geçme";
  return "Ara Geçme";
}
