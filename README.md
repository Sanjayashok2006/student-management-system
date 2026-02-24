# Student Management System REST API

A production-ready Student Management System built with Spring Boot, Spring Data JPA, Hibernate, and PostgreSQL. This project demonstrates backend architecture best practices including layering, DTOs, exception handling, and input validation.

## Features

- **Layered Architecture**: Controller, Service, Repository, Entity, DTO, Exception.
- **RESTful Endpoints**: Proper HTTP methods (GET, POST, PUT, DELETE) and status codes.
- **Data Transfer Objects (DTOs)**: Prevents exposing database entities directly to the client.
- **Exception Handling**: Global exception handler using `@RestControllerAdvice` and custom exceptions.
- **Input Validation**: Hibernate Validator / Bean Validation (`@NotBlank`, `@Email`, etc.).
- **Lombok**: Reduced boilerplate code (`@Getter`, `@Setter`, `@RequiredArgsConstructor`, etc.).
- **PostgreSQL Database**: Uses PostgreSQL with Hibernate auto-DDL configurations.

## API Endpoints

Base URL: `http://localhost:8080/api/students`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/students` | Create a new student |
| `GET` | `/api/students` | Get all students |
| `GET` | `/api/students/{id}` | Get student by ID |
| `PUT` | `/api/students/{id}` | Update an existing student |
| `DELETE` | `/api/students/{id}` | Delete a student |

### Sample JSON for POST / PUT Requests

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "course": "Computer Science"
}
```

## Running the Project

1. Install **PostgreSQL** and ensure it is running.
2. Update the database credentials (`spring.datasource.username` and `spring.datasource.password`) in `src/main/resources/application.properties` if needed.
3. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code).
4. Run as a Spring Boot application (`StudentManagementApplication.java`).

Or run using Maven from the command line:

```bash
mvn spring-boot:run
```

## Technologies Used

- Java 17+
- Spring Boot 3.x
- Spring Web MVC
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- Bean Validation
