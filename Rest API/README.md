# Student Management System

A modern, responsive Student Management System built with Spring Boot REST API and a beautiful frontend using HTML, CSS, and JavaScript. The system uses PostgreSQL as the backend database and follows the MVC architecture pattern.

## 🚀 Features

### Backend Features
- **RESTful API** with Spring Boot
- **PostgreSQL Database** integration
- **JPA/Hibernate** for data persistence
- **Input Validation** with Bean Validation
- **MVC Architecture** implementation
- **Cross-Origin Resource Sharing (CORS)** enabled
- **Comprehensive CRUD operations**
- **Advanced search and filtering**
- **Statistics and reporting**

### Frontend Features
- **Responsive Design** that works on all devices
- **Modern UI** with gradient backgrounds and glassmorphism effects
- **Real-time search** and filtering
- **Modal forms** for adding/editing students
- **Toast notifications** for user feedback
- **Loading states** and error handling
- **Statistics dashboard**
- **Keyboard shortcuts** (Ctrl+N to add student, Esc to close modals)

### Student Management Features
- ✅ Add, Edit, Delete students
- ✅ Search students by name or email
- ✅ Filter by status, major, and GPA
- ✅ View student statistics
- ✅ Student status management (Active, Inactive, Graduated, Suspended, Withdrawn)
- ✅ GPA tracking
- ✅ Enrollment date tracking
- ✅ Contact information management

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Validation**
- **PostgreSQL Database**
- **Maven** for dependency management

### Frontend
- **HTML5**
- **CSS3** (with modern features like Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript** (ES6+)
- **Font Awesome** for icons

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Maven 3.6** or higher
- **PostgreSQL 12** or higher
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-management
```

### 2. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL container
docker run --name student-management-db \
  -e POSTGRES_DB=student_management \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15
```

#### Option B: Local PostgreSQL Installation
1. Install PostgreSQL on your system
2. Create a database named `student_management`
3. Update the database credentials in `application.properties` if needed

### 3. Configure Database Connection

Edit `src/main/resources/application.properties` and update the database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_management
spring.datasource.username=postgres
spring.datasource.password=password
```

### 4. Run the Application

#### Using Maven
```bash
mvn spring-boot:run
```

#### Using IDE
- Open the project in your preferred IDE (IntelliJ IDEA, Eclipse, VS Code)
- Run the `StudentManagementApplication.java` file

### 5. Access the Application

- **Frontend**: http://localhost:8080
- **API Base URL**: http://localhost:8080/api/students
- **Health Check**: http://localhost:8080/api/students/health

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api/students
```

### Endpoints

#### Get All Students
```http
GET /api/students
```

#### Get Student by ID
```http
GET /api/students/{id}
```

#### Get Student by Email
```http
GET /api/students/email/{email}
```

#### Create New Student
```http
POST /api/students
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "address": "123 Main St, City, State",
  "major": "Computer Science",
  "gpa": 3.8,
  "status": "ACTIVE"
}
```

#### Update Student
```http
PUT /api/students/{id}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "address": "123 Main St, City, State",
  "major": "Computer Science",
  "gpa": 3.8,
  "status": "ACTIVE"
}
```

#### Delete Student
```http
DELETE /api/students/{id}
```

#### Get Students by Status
```http
GET /api/students/status/{status}
```

#### Get Students by Major
```http
GET /api/students/major/{major}
```

#### Search Students by Name
```http
GET /api/students/search?name={searchTerm}
```

#### Get Students with High GPA
```http
GET /api/students/gpa?minGpa={minimumGpa}
```

#### Get Active Students with High GPA
```http
GET /api/students/active/high-gpa?minGpa={minimumGpa}
```

#### Get Student Statistics
```http
GET /api/students/statistics
```

#### Health Check
```http
GET /api/students/health
```

### Response Examples

#### Student Object
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "address": "123 Main St, City, State",
  "major": "Computer Science",
  "gpa": 3.8,
  "enrollmentDate": "2023-09-01",
  "status": "ACTIVE"
}
```

#### Statistics Response
```json
{
  "totalStudents": 150,
  "activeStudents": 120,
  "inactiveStudents": 10,
  "graduatedStudents": 20
}
```

## 🎨 Frontend Features

### User Interface
- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions, and animations
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Functionality
- **Real-time Search**: Instant filtering as you type
- **Advanced Filtering**: Filter by status, major, and GPA
- **Modal Forms**: Clean, focused forms for data entry
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Visual feedback during API calls
- **Statistics Dashboard**: Visual representation of student data

### Keyboard Shortcuts
- `Ctrl/Cmd + N`: Open Add Student modal
- `Esc`: Close any open modal
- `Enter`: Submit forms

## 🗄️ Database Schema

### Students Table
```sql
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    major VARCHAR(100),
    gpa DECIMAL(3,2),
    enrollment_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);
```

## 🔧 Configuration

### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/student_management
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080

# Logging
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

## 🧪 Testing

### API Testing with curl

#### Get All Students
```bash
curl -X GET http://localhost:8080/api/students
```

#### Create a Student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567890",
    "major": "Computer Science",
    "gpa": 3.9,
    "status": "ACTIVE"
  }'
```

#### Get Statistics
```bash
curl -X GET http://localhost:8080/api/students/statistics
```

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/student-management-0.0.1-SNAPSHOT.jar
```

### Docker Deployment
```bash
# Build the application
mvn clean package

# Create Dockerfile
FROM openjdk:17-jdk-slim
COPY target/student-management-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Build and run Docker container
docker build -t student-management .
docker run -p 8080:8080 student-management
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- PostgreSQL community for the robust database
- Font Awesome for the beautiful icons
- The open-source community for inspiration and tools

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Coding! 🎉** 