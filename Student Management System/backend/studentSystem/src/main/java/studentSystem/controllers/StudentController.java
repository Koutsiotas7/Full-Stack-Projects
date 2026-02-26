package studentSystem.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import studentSystem.entities.Student;
import studentSystem.services.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController 
{	
	@Autowired
	private StudentService studentService;
	
	@PostMapping("/newStudent")
	public String add(@RequestBody Student student)
	{
		studentService.saveStudent(student);
		return "New student has been added successfully!";
	}
	
	@GetMapping
	public List<Student> getStudents()
	{
		return studentService.getStudents();
	}
	
	@GetMapping("/{id}")
	public Student getStudentById(@PathVariable int id)
	{
		return studentService.getStudentById(id);
	}
	
	@PutMapping("/{id}")
	public Student updateStudent(@PathVariable int id, @RequestBody Student student)
	{
		return studentService.updateStudent(id, student);
	}
	
	@DeleteMapping("/{id}")
	public void deleteStudent(@PathVariable int id)
	{
		studentService.deleteStudent(id);
	}
}
