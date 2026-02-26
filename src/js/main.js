"use strict";

document.addEventListener("DOMContentLoaded", () => { 
    createBarChart();

    if(document.getElementById("animation")) {
    const animationButton = document.getElementById("show-animation");
    animationButton.addEventListener("click", displayAnimation);

    function displayAnimation() {
        const gif = document.querySelector(".gif");
        gif.style.animationPlayState = "running"
    }
    }
});

    /** 
     * Funktion för att hämta antagningsstatistik. 
     * @async
     * @returns {object[]} - Returnerar en lista med kurser och program
     */
    async function fetchAdmissionData() {
        const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json";

        // Anropa och läs ut data
        try {
            const response = await fetch(url);
            const admissions = await response.json();
            return admissions;

        } catch (error){
            console.error("Fel: " + error);
        }
    }

    /** 
     * Funktion för att bearbeta antagningsstatistik och returnera 6 mest sökta kurserna. 
     * @async
     * @returns {object[]} - Returnerar en lista med 6 mest sökta kurser
     */
        function topCourses() {
        let courses = await fetchAdmissionData();
        courses = courses.filter((course) => course.type === "Kurs");
        courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        courses = courses.slice(0,6);
        return courses;
    }

    /** 
     * Funktion för att skapa stapeldiagram med de mest populära kurserna
     * @async
     */
    async function createBarChart() {
        let courses = await topCourses();

        const barChart = document.getElementById('barChart');

        new Chart(barChart, {
        type: 'bar',
        data: {
            labels: courses.map(row => row.name),
            datasets: [{
            label: 'Antal sökande',
            data: courses.map(row => row.applicantsTotal),
            borderWidth: 1,
            backgroundColor: '#e55934ff',
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

        /*
    //Lista top 5 mest sökta program
    function topPrograms(admissions) {

        let programs = admissions.filter((admission) => admission.type === "Program");
        programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        programs = programs.slice(0,5);

        createPieChart(programs);
    }

    // Skapa cirkeldiagram med mest sökta program
    function createPieChart(programs) {
        const pieChart = document.getElementById('pieChart');

        new Chart(pieChart, {
        type: 'pie',
        data: {
            labels: programs.map(row => row.name),
            datasets: [{
            label: 'Antal sökande',
            data: programs.map(row => row.applicantsTotal),
            backgroundColor: ['#e55934ff', '#d9594cff', '#ce8d66ff', '#c3bf6dff', '#b7b868ff'],
            hoverOffset: 4
            }]
        }
        });
    }
        */


