class AiManager {
    // Конструктор: Ініціалізує роль користувача та баланс токенів з перевіркою коректності
    constructor(role, tokens) {
        if (typeof role !== 'string' || role.trim() === '') {
            throw new Error("Invalid user role");
        }
        if (typeof tokens !== 'number' || tokens < 0) {
            throw new Error("Tokens must be a non-negative number");
        }
        this.role = role;     // Роль користувача: "standard" або "premium" (FR-03)
        this.tokens = tokens; // Доступний баланс токенів для генерації (FR-05)
    }

    // Метод валідації API-ключа (FR-02, FR-05): перевіряє префікс та мінімальну довжину
    validateApiKey(key) {
        if (typeof key !== 'string' || key.trim() === '') {
            throw new Error("API key cannot be empty");
        }
        if (key.startsWith("sk-") && key.length >= 10) {
            return true;
        }
        return false;
    }

    // Метод списування токенів за генерацію (FR-05)
    spendTokens(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number");
        }
        if (this.tokens < amount) {
            console.log(`Not enough tokens. Required: ${amount}, available: ${this.tokens}`);
            return false;
        }
        this.tokens -= amount;
        return true;
    }

    // Метод розрахунку вартості дерева мислення залежно від кількості гілок (FR-01, FR-04)
    calculateCost(branches, factor) {
        if (typeof branches !== 'number' || branches <= 0) {
            throw new Error("Branches must be a positive number");
        }
        if (typeof factor !== 'number' || factor <= 0) {
            throw new Error("Factor must be a positive number");
        }

        let baseCost = branches * 10;

        // Для premium користувачів діє знижка 15%, якщо згенеровано більше 5 гілок мислення (FR-01)
        if (this.role === "premium" && branches > 5) {
            baseCost *= 0.85;
        }

        return baseCost * factor;
    }
}

module.exports = AiManager;

