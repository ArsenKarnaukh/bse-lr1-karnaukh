// Обчислення фінальної оцінки якості відповіді ШІ на основі кількості агентів
function calculateFinalScore(numAgents) {
    let baseScore = 80;
    let finalScore = baseScore + (numAgents * 5);

    console.log("Кількість активних агентів: " + numAgents);
    console.log("Фінальна оцінка системи LeanFork: " + finalScore);

    if (finalScore >= 100) {
        console.log("Якість відповіді: Відмінно");
    } else {
        console.log("Якість відповіді: Потрібно більше агентів");
    }
}

// Виклик функції для перевірки роботи
calculateFinalScore(4);