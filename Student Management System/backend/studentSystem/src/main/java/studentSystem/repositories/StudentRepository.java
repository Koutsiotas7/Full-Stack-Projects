package studentSystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import studentSystem.entities.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>
{

}
