# UML Діаграми для проєкту LeanFork (ЛБ2)

## 1. Діаграма прецедентів
```mermaid
graph TD
    Guest["Гість"]
    Premium["Преміум-користувач"]

    UC1((Створити чат))
    UC2((Обрати агента АІ))
    UC3((Обрати версію моделі))
    UC4((Ввести API-ключ))
    UC5((Переглянути історію))
    UC6((Закріпити чат))
    UC7((Автентифікація))

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

    UC1 -.-> UC7```
    classDiagram
    class User {
        userId
        name
        email
        isPremium
        login()
        logout()
    }
    class ChatSession {
        sessionId
        title
        currentContext
        createBranch()
        deleteSession()
    }
    class AIAgent {
        agentId
        roleDescription
        modelVersion
        generateResponse()
    }
    class ApiKeyManager {
        encryptedKey
        validateKey()
        saveKey()
    }
    class HistoryService {
        savedChats
        getHistory()
        pinChat()
    }

    User --> ChatSession : owns
    ChatSession --> AIAgent : uses
    User --> ApiKeyManager : manages
    User --> HistoryService : views
    HistoryService --> ChatSession : contains
    sequenceDiagram
    actor Користувач
    participant UI as ChatInterface
    participant Auth as AuthService
    participant Key as ApiKeyManager
    participant Agent as AIAgent

    Користувач ->> UI: Натискає Створити чат
    activate UI
    UI ->> Auth: перевірка автентифікації()
    activate Auth
    Auth -->> UI: авторизований
    deactivate Auth

    Користувач ->> UI: Обирає AI-агента
    UI ->> Key: отриматиВалідованийКлюч()
    activate Key
    Key -->> UI: API-key valid
    deactivate Key

    UI ->> Agent: ініціалізаціяАгента()
    activate Agent
    Agent -->> UI: Агент готовий
    deactivate Agent

    UI -->> Користувач: Чат створено
    deactivate UI