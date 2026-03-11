// --- JavaScript: DIE LOGIK UND MATHEMATIK ---

// Dropdown Logik
function toggleDropdown(id) {
    const content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";    
        if (id === 'teil4') {            
        }
    }
}

// Berechnet die Fakultät (n!)
function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
}

// Berechnet n über k (Binomialkoeffizient)
function comb(n, k) {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let num = 1;
    for (let i = 1; i <= k; i++) {
        num = num * (n + 1 - i) / i;
    }
    return num;
}

// Basis-Rezept: Wahrscheinlichkeit für exakt k
function probExact(n, p, k) {
    return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// --- Taschenrechner Funktionen ---

function calcGenau() {
    let n = parseInt(document.getElementById('n_genau').value);
    let p = parseFloat(document.getElementById('p_genau').value) / 100;
    let k = parseInt(document.getElementById('k_genau').value);
    
    let res = probExact(n, p, k);
    document.getElementById('res_genau').innerText = (res * 100).toFixed(2) + ' %';
}

function calcHoechst() {
    let n = parseInt(document.getElementById('n_hoechst').value);
    let p = parseFloat(document.getElementById('p_hoechst').value) / 100;
    let k = parseInt(document.getElementById('k_hoechst').value);
    
    let sum = 0;
    for (let i = 0; i <= k; i++) {
        sum += probExact(n, p, i);
    }
    document.getElementById('res_hoechst').innerText = (sum * 100).toFixed(2) + ' %';
}

function calcMind() {
    let n = parseInt(document.getElementById('n_mind').value);
    let p = parseFloat(document.getElementById('p_mind').value) / 100;
    let k = parseInt(document.getElementById('k_mind').value);
    
    let sum_gegenteil = 0;
    for (let i = 0; i < k; i++) {
        sum_gegenteil += probExact(n, p, i);
    }
    let res = 1 - sum_gegenteil;
    document.getElementById('res_mind').innerText = (res * 100).toFixed(2) + ' %';
}

// --- Diagramm Generierung (Teil 4) mit Chart.js ---
function renderChart() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const n = 200;
    
    // Arrays (Listen) für unsere Daten vorbereiten
    const labels = [];
    const data2 = [];
    const data3 = [];
    const data4 = [];

    // Wir berechnen die Werte von 0 bis 12 Fehlern
    for(let k = 0; k <= 12; k++) {
        labels.push('k = ' + k);
        data2.push((probExact(n, 0.02, k) * 100).toFixed(2));
        data3.push((probExact(n, 0.03, k) * 100).toFixed(2));
        data4.push((probExact(n, 0.04, k) * 100).toFixed(2));
    }

    // Chart.js Diagramm erstellen
    new Chart(ctx, {
        type: 'bar', // 'bar' steht für Säulendiagramm
        data: {
            labels: labels, // Die X-Achse (unten)
            datasets: [
                {
                    label: 'p = 2% (Verbessert)',
                    data: data2,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)', // Grün
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                },
                {
                    label: 'p = 3% (Normal)',
                    data: data3,
                    backgroundColor: 'rgba(56, 189, 248, 0.8)', // Blau (Akzent)
                    borderColor: 'rgba(56, 189, 248, 1)',
                    borderWidth: 1
                },
                {
                    label: 'p = 4% (Kritisch)',
                    data: data4,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)', // Rot
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: { color: '#e2e8f0' } // Helle Schrift für Legende
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' %';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: {
                        color: '#e2e8f0',
                        callback: function(value) { return value + ' %'; }
                    },
                    title: { display: true, text: 'Wahrscheinlichkeit', color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#e2e8f0' },
                    title: { display: true, text: 'Anzahl der Fehler (k)', color: '#e2e8f0' }
                }
            }
        }
    });
}

// Diagramm beim Start laden
renderChart();