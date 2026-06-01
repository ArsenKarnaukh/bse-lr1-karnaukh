<!-- Мал. 2.1 — Діаграма прецедентів системи LeanFork -->
graph TD
    %% Актори
    Guest["Гість"]
    Premium["Преміум-користувач"]
    %% Прецеденти
    UC1((UC-01: Створити чат))
    UC2((UC-02: Обрати агента АІ))
    UC3((UC-03: Обрати версію моделі))
    UC4((UC-04: Ввести API-ключ))
    UC5((UC-05: Переглянути історію))
    UC6((UC-06: Закріпити чат))
    UC7((UC-07: Автентифікація))
    %% Зв'язки для Гостя
    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC4
    Guest --> UC7
    %% Зв'язки для Преміум
    Premium --> UC1
    Premium --> UC2
    Premium --> UC3
    Premium --> UC4
    Premium --> UC5
    Premium --> UC6
    Premium --> UC7
    %% Включення
    UC1 -.->|"<<include>>"| UC7

<!-- Мал. 2.2 — Діаграма класів системи LeanFork -->
classDiagram
    class User {
        -int userId
        -String name
        -String email
        -boolean isPremium
        +login() boolean
        +logout() void
    }
    class ChatSession {
        -int sessionId
        -String title
        -String currentContext
        +createBranch() void
        +deleteSession() void
    }
    class AIAgent {
        -String agentId
        -String roleDescription
        -String modelVersion
        +generateResponse(prompt String) String
    }
    class ApiKeyManager {
        -String encryptedKey
        +validateKey(key String) boolean
        +saveKey(key String) void
    }
    class HistoryService {
        -List~ChatSession~ savedChats
        +getHistory(userId int) List
        +pinChat(sessionId int) void
    }
    User "1" -- "*" ChatSession : owns
    ChatSession "1" -- "1" AIAgent : uses
    User "1" -- "1" ApiKeyManager : manages
    User "1" -- "1" HistoryService : views
    HistoryService "1" o-- "*" ChatSession : contains

<!-- Мал. 2.3 — Діаграма послідовності для сценарію створення чату -->
sequenceDiagram
    actor Користувач
    participant UI as :ChatInterface
    participant Auth as :AuthService
    participant Key as :ApiKeyManager
    participant Agent as :AIAgent
    Користувач ->> UI : Натискає "Створити чат"
    activate UI
    UI ->> Auth : перевірка автентифікації()
    activate Auth
    Auth -->> UI : користувач авторизований (true)
    deactivate Auth
    Користувач ->> UI : Обирає AI-агента та версію моделі
    UI ->> Key : отриматиВалідованийКлюч()
    activate Key
    Key -->> UI : API-key (valid)
    deactivate Key
    UI ->> Agent : ініціалізаціяАгента(модель, ключ)
    activate Agent
    Agent -->> UI : Агент готовий до роботи
    deactivate Agent
    UI -->> Користувач : Чат створено, очікування запиту
    deactivate UI