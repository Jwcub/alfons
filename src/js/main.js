document.addEventListener("DOMContentLoaded", () => { 
    fetchAdmissionData();

if(document.getElementById("animation")) {
const animationButton = document.getElementById("show-animation");
animationButton.addEventListener("click", displayAnimation);

function displayAnimation() {
    const gif = document.querySelector(".gif");

        gif.style.animationPlayState = "running"
  }
}

// Funktion för att hämta antagningsstatistik
async function fetchAdmissionData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

    // Anropa och läs ut data
    try {
        const response = await fetch(url);
        const admissions = await response.json();

        topCourses(admissions);
        topPrograms(admissions);

    } catch (error){
        console.error("Fel: " + error);
    }
}

    // Lista ut top 6 mest sökta kurser
function  topCourses(admissions) {
    let courses = admissions.filter((admission) => admission.type === "Kurs");
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    courses = courses.slice(0,6);

    createChart(courses)  
}

    //Lista ut top 5 mest sökta program


function createChart(courses) {
    const ctx = document.getElementById('barChart');

    new Chart(ctx, {
    type: 'bar',
    data: {
        labels: courses.map(row => row.name),
        datasets: [{
        label: 'Antal sökande',
        data: courses.map(row => row.applicantsTotal),
        borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
}

createPieChart();

function createPieChart() {
    const pieChart = document.getElementById('pieChart');

    new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
        }]
    }
    });
}

});
