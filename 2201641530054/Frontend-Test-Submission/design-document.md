# Design Document: React URL Shortener Application

This document provides a concise overview of the architectural design, technology choices, and key decisions for the Affordmed URL Shortener React application.

### 1. Architectural & Code Design

The application is built upon a modern, component-based architecture, which is a standard practice in React development for creating maintainable and scalable frontends.

*   **Project Structure:** The codebase is organized into feature-based directories (`pages`, `components`, `api`, `services`). This modular structure enforces a clear separation of concerns, making the application easier to navigate and debug.
*   **Component Design:** Components are crafted to be focused and reusable. For example, the `URLInput` component handles a single URL entry, while its parent, `URLShortenerForm`, orchestrates the collection and submission of multiple entries.

### 2. Technology Selection

*   **React:** The fundamental library for building the user interface, as mandated by the project requirements.
*   **Material UI (MUI):** The exclusive UI component library used for this project, including the `@mui/material` and `@mui/icons-material` packages. It ensures a consistent, high-quality design and accelerates development, fully adhering to the project constraints.
*   **React Router DOM:** Employed for all client-side routing. It manages navigation between the application's pages (`/`, `/stats`) and handles the dynamic redirection logic for shortcodes (`/:shortCode`).

### 3. State Management

*   **React Hooks:** For an application of this scale, component-level state managed with the `useState` hook is both performant and efficient. The `useEffect` hook is utilized for managing side effects, such as logging component lifecycle events or fetching initial data. This approach avoids introducing unnecessary complexity.
*   **Scalability:** The architecture is poised for growth. Should a global state become necessary in the future, React's Context API (`useContext` and `useReducer`) can be integrated seamlessly without a major refactor.

### 4. Data Modeling & Client-Side Persistence

*   **In-Memory Data Model:** The primary data structure for the form is an array of objects managed within the component's state. Each object encapsulates the data for a single URL to be processed, including its long URL, custom code, and validity.
*   **Client-Side Persistence:** To fulfill the requirement that statistics persist across sessions, `localStorage` is the selected mechanism. After a URL is successfully shortened, its data (short code, original URL, expiry date, etc.) is written to `localStorage`. The `StatisticsPage` then reads from `localStorage` on load to display historical data.

### 5. Routing Strategy

The application's routing is handled entirely on the client side for a smooth single-page application experience:
*   `/`: Renders the main `ShortenerPage`.
*   `/stats`: Renders the `StatisticsPage`.
*   `/:shortCode`: A dynamic route managed by the `RedirectPage` component. It extracts the shortcode from the URL, fetches the corresponding destination URL from the backend via an API call, and executes a browser redirect using `window.location.href`.

### 6. Logging & Error Handling

*   **Logging:** To comply with Create React App's module scoping rules, the reusable logging logic is encapsulated as a service within the application's `src` directory (`src/services/loggingService.js`). The `Log` function is imported and used directly by other modules. This satisfies the mandatory requirement of using a reusable logging function and replaces all `console.log` calls for application event tracing. Log calls are strategically placed in API functions, page components, and state update logic to provide a clear narrative of the application's execution.
*   **Error Handling:** A two-tiered approach to error handling ensures robustness. This includes client-side input validation to prevent invalid API requests and application-level `try...catch` blocks for all asynchronous operations. All caught errors are logged using the custom `Log` function, and user-friendly feedback is provided on the UI.

### 7. Assumptions

*   **API Availability:** It is assumed that the backend APIs for creating, fetching, and redirecting URLs are available and functional.
*   **Pre-Authorized Access:** The application operates without any user authentication (login/registration) mechanisms, as specified in the requirements.
*   **Logger Endpoint:** The logging service endpoint (`http://20.244.56.144/evaluation-service/logs`) is assumed to be available, protected by a bearer token, and functioning as documented.
