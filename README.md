## Testing Documentation
### How to set up and run the tests
- Run `npm install` to install dependencies.
**1. Unit Tests and Integration Tests:** 
- To run unit and integration tests, run `ng test` to run the tests.
**2. End-to-End Tests:** 
- To run end-to-end tests, run `ng e2e` to run the tests. 
### Summary of testing strategy and tools used:
The testing strategy for the application involved a multi-layered approach to ensure comprehensive coverage. Unit tests were created for each individual component to verify its functionality in isolation. Integration tests were implemented to test the interaction between different components, ensuring seamless integration. Additionally, end-to-end tests were conducted to simulate real user interactions with the application, covering the entire workflow.

To implement these tests, Angular's testing framework was utilized for unit and integration testing. Jasmine, a behavior-driven development framework for testing JavaScript code, was employed to write clean and readable tests within Angular. For end-to-end testing, Cypress was chosen as the tool of choice. Cypress provided a powerful platform to simulate user interactions, such as clicks and form submissions, and assert the expected behavior of the application.

Overall, this testing strategy ensured thorough validation of the application's functionality at different levels, from individual components to end-to-end user workflows, utilizing Angular's testing framework, Jasmine, and Cypress as essential tools.
