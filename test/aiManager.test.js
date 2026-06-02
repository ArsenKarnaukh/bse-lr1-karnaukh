const path = require('path');
const AiManager = require(path.join(__dirname, '../bse-lr1-karnaukh/src/aiManager'));

describe("AiManager class tests", () => {
    
    // --- ТЕСТИ КОНСТРУКТОРА ---
    // ТС1 Конструктор (валідні дані)
    test("constructor valid input (EP positive)", () => {
        const manager = new AiManager("premium", 1000);
        expect(manager.role).toBe("premium");
        expect(manager.tokens).toBe(1000);
    });

    // ТС2 Конструктор (порожня роль)
    test("constructor empty role (EP negative)", () => {
        expect(() => new AiManager("", 1000)).toThrow();
    });

    // ТС3 Конструктор (від'ємна кількість токенів)
    test("constructor negative tokens (BVA negative)", () => {
        expect(() => new AiManager("standard", -1)).toThrow();
    });

    // --- ТЕСТИ МЕТОДУ validateApiKey ---
    // ТС4 Валідація (валідний ключ)
    test("validateApiKey valid key (EP positive)", () => {
        const manager = new AiManager("standard", 100);
        expect(manager.validateApiKey("sk-123456789")).toBe(true);
    });

    // ТС5 Валідація (невалідний префікс)
    test("validateApiKey invalid prefix (EP negative)", () => {
        const manager = new AiManager("standard", 100);
        expect(manager.validateApiKey("ai-123456789")).toBe(false);
    });

    // ТС6 Валідація (порожній рядок)
    test("validateApiKey empty key (EP negative)", () => {
        const manager = new AiManager("standard", 100);
        expect(() => manager.validateApiKey("")).toThrow();
    });

    // --- ТЕСТИ МЕТОДУ spendTokens ---
    // ТС7 Списання токенів (успішне)
    test("spendTokens success (EP positive)", () => {
        const manager = new AiManager("standard", 100);
        const result = manager.spendTokens(40);
        expect(result).toBe(true);
        expect(manager.tokens).toBe(60);
    });

    // ТС8 Списання більше ніж є на балансі
    test("spendTokens more than available (BVA boundary)", () => {
        const manager = new AiManager("standard", 100);
        const result = manager.spendTokens(150);
        expect(result).toBe(false);
        expect(manager.tokens).toBe(100);
    });

    // ТС9 Списання (невалідний тип даних)
    test("spendTokens invalid type (EP negative)", () => {
        const manager = new AiManager("standard", 100);
        expect(() => manager.spendTokens("50")).toThrow();
    });

    // --- ТЕСТИ МЕТОДУ calculateCost ---
    // ТС10 Розрахунок вартості зі знижкою (Premium > 5 гілок)
    test("calculateCost premium discount (BVA positive)", () => {
        const manager = new AiManager("premium", 500);
        const cost = manager.calculateCost(6, 1);
        expect(cost).toBe(51); // 60 токенів - 15% знижки = 51
    });

    // ТС11 Розрахунок вартості без знижки (Premium = 5 гілок)
    test("calculateCost premium no discount boundary (BVA boundary)", () => {
        const manager = new AiManager("premium", 500);
        const cost = manager.calculateCost(5, 1);
        expect(cost).toBe(50);
    });

    // ТС12 Розрахунок (невалідна кількість гілок)
    test("calculateCost invalid branches (BVA negative)", () => {
        const manager = new AiManager("standard", 500);
        expect(() => manager.calculateCost(0, 1)).toThrow();
    });
});