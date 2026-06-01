graph TD
    Guest["Гість"]
    Premium["Преміум-користувач"]

    UC1((UC-01: Створити чат))
    UC2((UC-02: Обрати агента АІ))
    UC3((UC-03: Обрати версію моделі))
    UC4((UC-04: Ввести API-ключ))
    UC5((UC-05: Переглянути історію))
    UC6((UC-06: Закріпити чат))
    UC7((UC-07: Автентифікація))

    Guest --> UC1
    Guest --> UC2
    Guest --> UC3
    Guest --> UC4
    Guest --> UC7

    Premium --> UC1
    Premium --> UC2
    Premium --> UC3
    Premium --> UC4
    Premium --> UC5
    Premium --> UC6
    Premium --> UC7

    UC1 -.-> UC7

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
        +generateResponse() String
    }
    class ApiKeyManager {
        -String encryptedKey
        +validateKey() boolean
        +saveKey() void
    }
    class HistoryService {
        -List savedChats
        +getHistory() List
        +pinChat() void
    }

    User --> ChatSession : owns
    ChatSession --> AIAgent : uses
    User --> ApiKeyManager : manages
    User --> HistoryService : views
    HistoryService --> ChatSession : contains

    sequenceDiagram
    actor U as Користувач
    participant UI as ChatInterface
    participant Auth as AuthService
    participant Key as ApiKeyManager
    participant Agent as AIAgent

    U ->> UI: Натискає Створити чат
    activate UI
    UI ->> Auth: перевірка автентифікації()
    activate Auth
    Auth -->> UI: користувач авторизований
    deactivate Auth

    U ->> UI: Обирає AI-агента
    UI ->> Key: отриматиВалідованийКлюч()
    activate Key
    Key -->> UI: API-key valid
    deactivate Key

    UI ->> Agent: ініціалізаціяАгента()
    activate Agent
    Agent -->> UI: Агент готовий
    deactivate Agent

    UI -->> U: Чат створено
    deactivate UI
    