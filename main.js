#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
class Person {
    name;
    constructor(personName) {
        this.name = personName;
    }
    getName() {
        return this.name;
    }
}
class Student extends Person {
    rollNumber;
    courses;
    constructor(name, rNum) {
        super(name);
        this.rollNumber = rNum;
        this.courses = [];
    }
    registerForCourses(course) {
        if (!this.courses.includes(course.name)) {
            this.courses.push(course.name);
        }
    }
    deregisterFromCourse(course) {
        const index = this.courses.indexOf(course.name);
        if (index > -1) {
            this.courses.splice(index, 1);
        }
    }
    getListOfCourses() {
        console.log(chalk.yellow(`Student ${this.name} Courses:`));
        this.courses.forEach((element) => {
            console.log(chalk.magenta(element));
        });
    }
}
class Instructor extends Person {
    salary;
    courses;
    constructor(name, sal) {
        super(name);
        this.salary = sal;
        this.courses = [];
    }
    assignCourse(course) {
        if (!this.courses.includes(course.name)) {
            this.courses.push(course.name);
        }
    }
    getListOfCourses() {
        console.log(chalk.yellow(`Instructor ${this.name} Courses:`));
        this.courses.forEach((element) => {
            console.log(chalk.magenta(element));
        });
    }
}
class Course {
    Id;
    name;
    fee;
    students;
    instructors;
    static allCourses = [];
    constructor(Id, name, fee) {
        this.Id = Id;
        this.name = name;
        this.fee = fee;
        this.students = [];
        this.instructors = [];
        Course.allCourses.push(this);
    }
    addStudent(std) {
        if (!this.students.includes(std)) {
            this.students.push(std);
        }
    }
    removeStudent(std) {
        const index = this.students.indexOf(std);
        if (index > -1) {
            this.students.splice(index, 1);
            std.deregisterFromCourse(this);
        }
    }
    setInstructor(ins) {
        if (!this.instructors.includes(ins)) {
            this.instructors.push(ins);
        }
    }
    getListOfStudents() {
        console.log(chalk.yellow(`${this.name} students:`));
        this.students.forEach((element) => {
            console.log(chalk.yellow(`ID: ${element.rollNumber}, Name: ${element.name}`));
        });
    }
    getListOfInstructors() {
        console.log(chalk.yellow(`${this.name} Instructors:`));
        this.instructors.forEach((element) => {
            console.log(chalk.magenta(`${element.name}`));
        });
    }
    static displayAllCourses() {
        console.log(chalk.yellow("All the courses:"));
        Course.allCourses.forEach((element) => {
            console.log(chalk.green(`${element.name} (Fee: ${element.fee})`));
        });
    }
}
class Department {
    name;
    courses;
    static allDepartments = [];
    constructor(name) {
        this.name = name;
        this.courses = [];
        Department.allDepartments.push(this);
    }
    addCourse(course) {
        if (!this.courses.includes(course.name)) {
            this.courses.push(course.name);
        }
    }
    getCourse() {
        this.courses.forEach((element) => {
            console.log(chalk.magenta(element));
        });
    }
    static displayallDepartments() {
        console.log(chalk.yellow("\nAll Departments are:"));
        Department.allDepartments.forEach((element) => {
            console.log(chalk.magenta(element.name));
        });
    }
}
const coursesData = [
    { name: "Next.js", fee: 30000, instructor: "Sir Ameen Alam" },
    { name: "TypeScript", fee: 35000, instructor: "Sir Asharib Ali" },
    { name: "Python", fee: 32000, instructor: "Sir Illahi Bux" },
    { name: "Java", fee: 30000, instructor: "Sir Hamzah Syed" },
    { name: "JavaScript", fee: 35000, instructor: "Miss Hina Naseer" }
];
let courseId = 1;
const courses = coursesData.map(course => new Course(courseId++, course.name, course.fee));
const instructors = [
    new Instructor("Sir Ameen Alam", 90000),
    new Instructor("Sir Asharib Ali", 85000),
    new Instructor("Sir Illahi Bux", 95000),
    new Instructor("Sir Hamzah Syed", 80000),
    new Instructor("Miss Hina Naseer", 88000)
];
courses.forEach((course, index) => {
    const instructor = instructors.find(ins => ins.name === coursesData[index].instructor);
    if (instructor) {
        course.setInstructor(instructor);
        instructor.assignCourse(course);
    }
});
let students = [];
async function mainMenu() {
    const mainOptions = [
        {
            type: 'list',
            name: 'mainOption',
            message: chalk.green.bold('Select an option:'),
            choices: [
                'View Courses',
                'View Instructors',
                'Enroll in a Course',
                'View Students',
                'View Student Courses',
                'Remove a Student',
                'Exit'
            ]
        }
    ];
    const { mainOption } = await inquirer.prompt(mainOptions);
    switch (mainOption) {
        case 'View Courses':
            Course.displayAllCourses();
            break;
        case 'View Instructors':
            console.log(chalk.green.bold("Instructors:"));
            instructors.forEach((ins) => {
                console.log(chalk.yellow(`${ins.name}:`));
                ins.getListOfCourses();
            });
            break;
        case 'Enroll in a Course':
            await enrollStudent();
            break;
        case 'View Students':
            viewAllStudents();
            break;
        case 'View Student Courses':
            await viewStudentCourses();
            break;
        case 'Remove a Student':
            await removeStudent();
            break;
        case 'Exit':
            console.log(chalk.green.bold("Exiting program..."));
            return;
        default:
            console.log(chalk.red.bold("Invalid option."));
    }
    mainMenu();
}
async function enrollStudent() {
    const courseChoices = Course.allCourses.map(course => course.name);
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'studentId',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'studentName',
            message: 'Enter student name:'
        },
        {
            type: 'list',
            name: 'course',
            message: 'Select a course to enroll in:',
            choices: courseChoices
        }
    ]);
    const { studentId, studentName, course } = answers;
    let student = students.find(std => std.rollNumber === studentId);
    if (!student) {
        student = new Student(studentName, studentId);
        students.push(student);
    }
    const selectedCourse = Course.allCourses.find(course => course.name === answers.course);
    if (selectedCourse && student) {
        selectedCourse.addStudent(student);
        student.registerForCourses(selectedCourse);
        console.log(chalk.yellow(`${student.name} has been enrolled in ${selectedCourse.name}.`));
    }
    else {
        console.log(chalk.red.bold("Error: Invalid course or student selection."));
    }
}
function viewAllStudents() {
    console.log(chalk.green.bold("Students:"));
    students.forEach(student => {
        console.log(chalk.yellow(`ID: ${student.rollNumber}, Name: ${student.name}, Courses: ${student.courses.join(", ")}`));
    });
}
async function viewStudentCourses() {
    const studentNames = students.map(student => student.name);
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'student',
            message: 'Select a student to view their courses:',
            choices: studentNames
        }
    ]);
    const selectedStudent = students.find(student => student.name === answers.student);
    if (selectedStudent) {
        selectedStudent.getListOfCourses();
    }
    else {
        console.log(chalk.red.bold("Error: Invalid student selection."));
    }
}
async function removeStudent() {
    const studentNames = students.map(student => student.name);
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'student',
            message: 'Select a student to remove:',
            choices: studentNames
        },
        {
            type: 'list',
            name: 'course',
            message: 'Select the course from which to remove the student:',
            choices: Course.allCourses.map(course => course.name)
        }
    ]);
    const selectedCourse = Course.allCourses.find(course => course.name === answers.course);
    const selectedStudent = students.find(student => student.name === answers.student);
    if (selectedCourse && selectedStudent) {
        // Check if the student is enrolled in the selected course
        if (selectedStudent.courses.includes(selectedCourse.name)) {
            selectedCourse.removeStudent(selectedStudent);
            console.log(chalk.yellow(`${selectedStudent.name} has been removed from ${selectedCourse.name}.`));
        }
        else {
            console.log(chalk.red.bold(`Error: ${selectedStudent.name} is not enrolled in ${selectedCourse.name}. Please select the correct course.`));
        }
    }
    else {
        console.log(chalk.red.bold("Error: Invalid course or student selection."));
    }
}
;
async function startApp() {
    // Display the heading for the University Management System
    console.log(chalk.yellow.bold(figlet.textSync("University Management System", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
    })));
    console.log(); // Add a blank line for spacing
    await mainMenu();
}
;
startApp();
