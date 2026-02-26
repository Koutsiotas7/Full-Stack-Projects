package studentSystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import studentSystem.entities.Student;
import studentSystem.repositories.StudentRepository;

@Service
public class StudentService 
{
	@Autowired
	private StudentRepository studentRepository;
	
	public Student saveStudent(Student student)
	{
		return studentRepository.save(student);
	}
	
	public List<Student> getStudents()
	{
		return studentRepository.findAll();
	}
	
	public Student getStudentById(int id)
	{
		return studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student is not found!"));
	}
	
	public Student updateStudent(int id, Student student)
	{
		Student oldStudent = getStudentById(id);
		oldStudent.setName(student.getName());
		oldStudent.setAddress(student.getAddress());
		return studentRepository.save(oldStudent);
	}
	
	public void deleteStudent(int id)
	{
		if(studentRepository.existsById(id))
		{
			studentRepository.deleteById(id);
		System.out.println("Student with the id " + id + " has been deleted!");
		}
		else
		{
			throw new RuntimeException("Student with id " + id + " is not found.");
		}
	}
}
