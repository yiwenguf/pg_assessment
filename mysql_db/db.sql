CREATE DATABASE pg_db;
use pg_db;

CREATE TABLE `teacher_students` (
  `teacher_name` varchar(255) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `is_suspended` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`teacher_name`,`student_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `teacher_students` VALUES ('teacherken@gmail.com','studenthon@gmail.com',0,'2023-02-15 15:57:08','2023-02-15 15:57:08'),('teacherken@gmail.com','studentjon@gmail.com',0,'2023-02-15 15:57:08','2023-02-15 17:16:47');
