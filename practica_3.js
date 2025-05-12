google.charts.load('current', {'packages':['corechart']});

const correctAnswers = {
    respuesta1: "Sí",
    respuesta2: "Sí",
    respuesta3: "Sí",
    respuesta4: "Sí",
    respuesta5: "No",
    respuesta6: "Sí",
    respuesta7: "Sí",
    respuesta8: "Sí",
    respuesta9: "No",
    respuesta10: "No"
};

let chartImageData = null;

function evaluarRespuestas() {
    let score = 0;
    for (let i = 1; i <= 10; i++) {
        const questionName = `respuesta${i}`;
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
        const userAnswer = selectedOption ? selectedOption.value : "No respondida";
        
        if (userAnswer === correctAnswers[questionName]) {
            score++;
        }
    }
    document.getElementById("score").innerHTML = `Puntuación: ${score}/10 (${(score/10*100).toFixed(0)}%)`;
    document.getElementById("results").style.display = "block";
    
    drawChart(score);
}

function drawChart(score) {
    var data = google.visualization.arrayToDataTable([
        ['Resultado', 'Preguntas'],
        ['Correctas', score],
        ['Incorrectas', 10 - score]
    ]);

    var options = {
        title: 'Resultados del Cuestionario',
        pieHole: 0.4,
        colors: ['#4CAF50', '#F44336']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    
    function convertChartToImage() {
        const chartContainer = document.getElementById('chart_div');
        const canvas = document.getElementById('chartCanvas');
        const svg = chartContainer.getElementsByTagName('svg')[0];
        
        // Convertir SVG a canvas
        const svgData = new XMLSerializer().serializeToString(svg);
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            chartImageData = canvas.toDataURL('image/png');
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
    google.visualization.events.addListener(chart, 'ready', convertChartToImage);
    chart.draw(data, options);
}

function generarPDF() {
    if (!chartImageData) {
        alert("Por favor, evalúa tus respuestas antes de generar el PDF.");
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Resultados del Cuestionario de Cubos Rubik', 105, 15, { align: 'center' });

        doc.setFontSize(12);
        doc.text(document.getElementById("score").textContent, 105, 25, { align: 'center' });

        doc.addImage(chartImageData, 'PNG', 50, 35, 110, 80);

        const pdfDataUri = doc.output('datauristring');
        document.getElementById('pdfViewer').src = pdfDataUri;
        document.getElementById('pdfContainer').style.display = 'block';

        document.getElementById('pdfContainer').scrollIntoView({ behavior: 'smooth' });
        doc.save('resultados_cubo_rubik.pdf');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('Error al generar PDF: ' + error.message);
    }
}