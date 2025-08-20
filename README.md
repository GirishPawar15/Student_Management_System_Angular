# Student Management System - Angular

## Devolopers:  

   1.Girish Pawar(Leader)                                                                                                                    
      contact: girishpawar1512@gmail.com

   2.Ziyan kazi                                                                                                                                      
      Contact:zkazi0007@gmail.com

## Output / UI 

## Features

- **Add Students**: Add new student records with validation
- **Update Students**: Modify existing student information
- **Delete Students**: Remove student records by roll number
- **View All Students**: Display all students in a responsive table
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Form Validation**: Client-side validation for all inputs
- **Error Handling**: Proper error handling and user feedback

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Angular CLI (will be installed automatically)



## API Configuration

The application expects a backend API running on `http://localhost:8080/api/students`. Make sure your backend server is running and provides the following endpoints:

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── student-management/
│   │       ├── student-management.component.ts
│   │       ├── student-management.component.html
│   │       └── student-management.component.css
│   ├── models/
│   │   └── student.model.ts
│   ├── services/
│   │   └── student.service.ts
│   ├── app.ts
│   ├── app.html
│   ├── app.css
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.css
└── main.ts
```


## Usage

1. **Adding a Student:**
   - Click "Add Student" button
   - Fill in all required fields
   - Click "Add Student" to save

2. **Updating a Student:**
   - Click "Update Student" button
   - Enter the roll number and click "Load Student"
   - Modify the fields as needed
   - Click "Update Student" to save changes

3. **Deleting a Student:**
   - Click "Delete Student" button
   - Enter the roll number
   - Click "Delete Student" to remove

4. **Viewing All Students:**
   - Click "Show All Students" button
   - All students will be displayed in a table format

## Validation Rules

- All fields are required
- Marks must be between 0 and 100
- Email must be in valid format
- Roll number must be a positive number

## Technologies Used

- **Angular 20**: Frontend framework
- **TypeScript**: Programming language
- **CSS3**: Styling with modern features
- **RxJS**: Reactive programming
- **Angular Forms**: Form handling and validation

## Browser Support

The application is compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge



