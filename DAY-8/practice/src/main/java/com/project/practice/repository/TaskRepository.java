package com.project.practice.repository;

import com.project.practice.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByImportant(boolean important);
    List<Task> findByImportantAndUserId(boolean important, Long userId);
}
