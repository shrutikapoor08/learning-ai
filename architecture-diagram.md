# Property Search Application Architecture

```mermaid
graph TD
    subgraph "Frontend (React + Vite)"
        A[App.jsx] --> B[User Interface]
        B --> C[Property Search Form]
        B --> D[Property Cards Display]
        C --> E[Search Request]
        D --> F[Like/Dislike Actions]
    end

    subgraph "Backend (Express.js)"
        G[server.js] --> H[API Routes]
        H --> I["api/parse-properties"]
        H --> J["api/save-property"]
        I --> K[LLM Processing]
        J --> L[Database Operations]
    end

    subgraph "External Services"
        M[OpenAI API] 
        N[Zillow API]
        O[Directus Database]
    end

    E --> I
    F --> J
    K --> M
    I --> N
    L --> O

    style A fill:#61dafb,stroke:#333,stroke-width:2px
    style G fill:#68a063,stroke:#333,stroke-width:2px
    style M fill:#74aa9c,stroke:#333,stroke-width:2px
    style N fill:#006aff,stroke:#333,stroke-width:2px
    style O fill:#8c4bff,stroke:#333,stroke-width:2px
```

## Architecture Components

### Frontend
- **React + Vite**: Modern UI framework with fast development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Components**:
  - Search form for property requirements
  - Property cards display
  - Like/Dislike functionality

### Backend
- **Express.js**: Node.js web application framework
- **API Routes**:
  - `/api/parse-properties`: Processes user search input
  - `/api/save-property`: Saves user preferences

### External Services
- **OpenAI API**: Processes natural language input to extract property requirements
- **Zillow API**: Provides real estate property data
- **Directus**: Headless CMS used as database for storing user preferences

### Data Flow
1. User enters property requirements in natural language
2. Frontend sends request to backend
3. Backend uses LLM (OpenAI) to parse requirements
4. Backend queries Zillow API with structured requirements
5. Property results are returned to frontend
6. User can like/dislike properties
7. Preferences are saved to Directus database
8. (Future) Recommendation engine will use saved preferences

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI/ML**: OpenAI, LangChain
- **Database**: Directus
- **APIs**: Zillow API
