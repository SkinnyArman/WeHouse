# AI-Driven Development Rules for the Reservation System Project

## General Guidelines
- **Minimal Changes:** Always change as little as you can. Modify only what is necessary to achieve the desired outcome.
- **Type Safety:** Your code must be type safe. Leverage TypeScript's static typing to catch errors at compile time.
- **SOLID & Clean Code:** Always keep in mind SOLID principles and clean code practices. Each module should be maintainable, understandable, and extendable.
- **DRY Principle:** Don't Repeat Yourself. If a piece of code might be reused later, abstract it into a module or utility function.
- **Modularity:** Build your application in a modular way. A bug in one module should have minimal impact on others.
- **Error Handling:** Always account for how code might fail. Implement robust error handling and consider edge cases.
- **Logging:** Write comprehensive logs in your error handling routines. Ensure that logs provide sufficient context to trace and diagnose issues quickly.
- **Single Responsibility Principle:** Each module, function, or file should have a single responsibility. Avoid mixing concerns.
- **Naming Conventions:** Follow a strict naming convention for files, folders, and components. The name should reflect the file's purpose and functionality.

## Additional AI-Driven Development Practices
- **Automated Testing:**  
  - Write unit tests and integration tests for critical modules.
  - Use testing frameworks (e.g., Jest for Node/React) to ensure code quality.
- **Code Linting & Formatting:**  
  - Use linters (e.g., ESLint) and formatters (e.g., Prettier) to enforce code style and consistency.
- **Static Analysis:**  
  - Utilize TypeScript’s built-in checks and additional static analysis tools to catch potential issues early.
- **Version Control & Commit Discipline:**  
  - Use descriptive commit messages.
  - Make frequent commits that encapsulate small, manageable changes.
- **Documentation:**  
  - Document functions, classes, and modules with clear comments and documentation blocks.
  - Maintain a changelog to track major changes and decisions.
- **Performance Considerations:**  
  - Write performance-conscious code, especially for modules interacting with the database (MongoDB) or managing state in React.
- **Security Practices:**  
  - Always consider security implications, such as proper validation, sanitization, and authentication mechanisms.
- **Configuration Management:**  
  - Keep configuration (e.g., API endpoints, database credentials) separate from the code using environment variables.
- **CI/CD Integration:**  
  - Integrate Continuous Integration/Continuous Deployment pipelines to automate testing, linting, and deployment.
- **Modular Architecture:**  
  - Structure your project such that the frontend (React) and backend (Node) are decoupled where possible, even within a monorepo.
  - Use clear API contracts between the frontend and backend to ensure easy maintainability and scalability.

## Final Note
These rules are designed to ensure your project remains maintainable, scalable, and robust. By adhering to these guidelines, you'll build an application that's easier to debug, extend, and collaborate on, even as a single developer.

