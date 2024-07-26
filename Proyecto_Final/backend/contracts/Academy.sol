// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Academy {

    enum CourseType {Cybersecurity, Development, ComputerNetworks, Blockchain}
    string[] private courses = ["Cyber Security", "Development", "Computer Networks", "Blockchain"];
    string[] private students;
    mapping (CourseType => string[]) private academy;

    constructor() { }
    
    function getCourses() public view returns (string[] memory) {
        return courses;
    }

    function getStudents() public view returns (string[] memory) {
        return students;
    }

    function setStudentCourse(CourseType _course, string memory _studentName) public {
        academy[_course].push(_studentName);
        students.push(_studentName);
    }

    function getCourseStudents(CourseType _course) public view returns (string[] memory) {
        return academy[_course];
    }
}
