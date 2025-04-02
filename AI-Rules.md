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

## Data Validation & Sanitization Guidelines
### Layer-Specific Responsibilities
1. **DTO Layer (Primary Validation)**
   - Handle all input validation using class-validator decorators
   - Define clear validation rules and error messages
   - Validate data types, ranges, and formats
   - No business logic validation at this layer

2. **Controller Layer (Request Handling)**
   - Use validation middleware to apply DTO validations
   - Handle validation errors and return appropriate HTTP responses
   - Basic request sanitization (e.g., trimming strings)
   - No direct data validation logic

3. **Service Layer (Business Logic)**
   - Focus on business logic and rules
   - Assume data is already validated by DTOs
   - Perform only business-specific validations
   - Handle complex validations involving multiple entities

4. **Model Layer (Database Constraints)**
   - Define schema-level validations as a last line of defense
   - Focus on data integrity constraints
   - Avoid duplicating DTO validations

### Validation Best Practices
- Keep validation logic in one place (primarily DTOs)
- Use clear, descriptive error messages
- Validate early, fail fast
- Consider security implications in validation rules
- Use TypeScript's type system to prevent validation bypasses

## Testing Requirements
### General Testing Rules
- Every new feature must have corresponding tests
- All validation logic must be thoroughly tested
- Test both success and failure cases
- Use meaningful test descriptions

### Layer-Specific Testing
1. **DTO Tests**
   - Test all validation rules
   - Test edge cases and boundary values
   - Verify error messages
   - Test type conversions

2. **Controller Tests**
   - Test request handling
   - Verify HTTP responses
   - Test middleware integration
   - Mock service layer calls

3. **Service Tests**
   - Test business logic
   - Test complex validations
   - Test error handling
   - Use mocks for external dependencies

4. **Integration Tests**
   - Test complete request flow
   - Test database interactions
   - Test real-world scenarios
   - Verify end-to-end functionality

## Additional AI-Driven Development Practices
- **Automated Testing:**  
  - Write unit tests and integration tests for critical modules.
  - Use testing frameworks (e.g., Jest for Node/React) to ensure code quality.
- **Code Linting & Formatting:**  
  - Use linters (e.g., ESLint) and formatters (e.g., Prettier) to enforce code style and consistency.
- **Static Analysis:**  
  - Utilize TypeScript's built-in checks and additional static analysis tools to catch potential issues early.
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

