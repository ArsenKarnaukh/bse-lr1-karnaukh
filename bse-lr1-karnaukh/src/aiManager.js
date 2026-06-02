// Константи для усунення Magic Numbers
const PREMIUM_DISCOUNT = 0.85;
const BRANCH_THRESHOLD = 5;
const BASE_BRANCH_COST = 10;

class AiManager {
    constructor(role, tokens) {
        if (!role) throw new Error("Role cannot be empty");
        if (typeof tokens !== 'number' || tokens < 0) {
            throw new Error("Tokens must be a positive number");
        }
        this.role = role;
        this.tokens = tokens;
    }

    // Допоміжний приватний метод для валідації (Усунення дублювання коду)
    _validatePositiveNumber(value, name) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error(`${name} must be a positive number`);
        }
    }

    spendTokens(amount) {
        this._validatePositiveNumber(amount, "Amount");

        // Спрощення умов (Guard clause замість вкладених умов)
        if (this.tokens < amount) return false;

        this.tokens -= amount;
        return true;
    }

    calculateCost(branches, factor) {
        this._validatePositiveNumber(branches, "Branches");
        this._validatePositiveNumber(factor, "Factor");

        let baseCost = branches * BASE_BRANCH_COST;

        // Використання іменованих констант замість хардкоду
        if (this.role === "premium" && branches > BRANCH_THRESHOLD) {
            baseCost *= PREMIUM_DISCOUNT;
        }

        return baseCost * factor;
    }
}

module.exports = AiManager;