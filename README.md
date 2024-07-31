## University Management System
# Overview
The University Management System is a command-line application developed in TypeScript for managing university courses, students, and instructors. This system allows users to interact with various aspects of university operations, including enrolling students in courses, viewing course details, and managing instructor assignments. The application leverages the inquirer package for interactive prompts, chalk for colorful terminal output, and figlet for styled text headings.

# Features
View Courses: List all available courses along with their fees.
View Instructors: List all instructors and the courses they are teaching.
Enroll in a Course: Enroll a student in a selected course, creating a new student record if necessary.
View Students: Display a list of all students with their enrolled courses.
View Student Courses: View the courses that a specific student is enrolled in.
Remove a Student: Remove a student from a course they are currently enrolled in.
# Installation
To set up and run this project locally, follow these steps:

# Clone the repository:

bash
Copy code
git clone <https://github.com/Roohia-Bashir/project10_oop-README.md.git>

# Install dependencies:

Make sure you have Node.js installed, then run:

bash
Copy code
npm install
# Run the application:

# Start the application by running:

bash
Copy code
npm start
Usage
Once the application is running, you will be presented with a menu of options. You can select an option using the interactive prompt to perform various actions:

View Courses: Lists all courses available in the system.
View Instructors: Shows details about instructors and the courses they teach.
Enroll in a Course: Allows you to enroll a student in a specific course. If the student does not exist, a new record is created.
View Students: Displays a list of all students with their enrolled courses.
View Student Courses: Shows the courses for a selected student.
Remove a Student: Removes a student from a specific course, provided they are enrolled in it.
# Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. Ensure that you follow the coding standards and include tests for any new features or bug fixes.

# License
This project is licensed under the MIT License.

Acknowledgments
inquirer: For creating interactive command-line prompts.
chalk: For adding color to terminal output.
figlet: For generating styled text headings.
