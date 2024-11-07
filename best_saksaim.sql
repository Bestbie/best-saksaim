-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for best_saksaim
CREATE DATABASE IF NOT EXISTS `best_saksaim` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `best_saksaim`;

-- Dumping structure for table best_saksaim.evaluation
CREATE TABLE IF NOT EXISTS `evaluation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.evaluation: ~5 rows (approximately)
INSERT INTO `evaluation` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'test1', 't1', '2024-09-28 18:14:28', '2024-09-30 16:54:51'),
	(3, 'ะะ', 'หหห', '2024-09-28 18:18:28', '2024-09-28 15:25:11'),
	(11, 'b', 'a', '2024-09-28 14:05:21', '0000-00-00 00:00:00'),
	(12, 'd', 'ss', '2024-09-28 14:05:58', '0000-00-00 00:00:00'),
	(34, 'test3', 't3', '2024-09-30 16:32:53', '0000-00-00 00:00:00');

-- Dumping structure for view best_saksaim.evaluations
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `evaluations` (
	`id` INT(11) UNSIGNED NOT NULL,
	`title` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`description` TEXT NULL COLLATE 'utf8mb4_general_ci',
	`created_at` DATETIME NOT NULL,
	`updated_at` DATETIME NOT NULL
) ENGINE=MyISAM;

-- Dumping structure for table best_saksaim.evaluations_responses
CREATE TABLE IF NOT EXISTS `evaluations_responses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `evaluation_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  `response` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `evaluation_id_user_id` (`evaluation_id`,`user_id`),
  KEY `evaluations_responses_user_id_foreign` (`user_id`),
  CONSTRAINT `evaluations_responses_evaluation_id_foreign` FOREIGN KEY (`evaluation_id`) REFERENCES `evaluation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `evaluations_responses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.evaluations_responses: ~3 rows (approximately)
INSERT INTO `evaluations_responses` (`id`, `evaluation_id`, `user_id`, `response`, `created_at`, `updated_at`) VALUES
	(1, 1, 3, 1, '2024-09-30 08:59:37', '0000-00-00 00:00:00'),
	(2, 3, 3, 3, '2024-09-30 09:01:11', '0000-00-00 00:00:00'),
	(3, 34, 3, 5, '2024-10-01 02:10:42', '0000-00-00 00:00:00');

-- Dumping structure for table best_saksaim.hr_check
CREATE TABLE IF NOT EXISTS `hr_check` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `evaluation_response_id` int(11) unsigned NOT NULL,
  `checked_at` datetime NOT NULL,
  `status` enum('checked','pending') NOT NULL DEFAULT 'pending',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `evaluation_response_id` (`evaluation_response_id`),
  CONSTRAINT `hr_check_evaluation_response_id_foreign` FOREIGN KEY (`evaluation_response_id`) REFERENCES `evaluations_responses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.hr_check: ~2 rows (approximately)
INSERT INTO `hr_check` (`id`, `evaluation_response_id`, `checked_at`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, '2024-09-30 10:39:52', 'checked', '2024-09-30 10:39:52', NULL),
	(2, 3, '2024-10-01 02:11:14', 'checked', '2024-10-01 02:11:14', NULL);

-- Dumping structure for table best_saksaim.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.migrations: ~21 rows (approximately)
INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
	(1, '2024-09-19-131136', 'App\\Database\\Migrations\\User_Table', 'default', 'App', 1726752486, 1),
	(2, '2024-09-19-132900', 'App\\Database\\Migrations\\RoleTable', 'default', 'App', 1726753324, 2),
	(3, '2024-09-21-113210', 'App\\Database\\Migrations\\AssessmentsTable', 'default', 'App', 1726918556, 3),
	(4, '2024-09-21-130742', 'App\\Database\\Migrations\\CreateAssessmentsTable', 'default', 'App', 1726926985, 4),
	(5, '2024-09-21-142609', 'App\\Database\\Migrations\\CreateAssessmentsTable', 'default', 'App', 1726928863, 5),
	(6, '2024-09-22-014833', 'App\\Database\\Migrations\\CreateAssessmentsTable', 'default', 'App', 1726969771, 6),
	(7, '2024-09-22-020326', 'App\\Database\\Migrations\\CreateAssessmentsTable', 'default', 'App', 1726970675, 7),
	(8, '2024-09-22-020559', 'App\\Database\\Migrations\\CreateAssessmentResultsTable', 'default', 'App', 1726970831, 8),
	(9, '2024-09-22-020802', 'App\\Database\\Migrations\\CreateHRReviewsTable', 'default', 'App', 1726971053, 9),
	(11, '2024-09-22-022340', 'App\\Database\\Migrations\\CreateAssessmentsTable', 'default', 'App', 1726972201, 10),
	(12, '2024-09-22-023010', 'App\\Database\\Migrations\\CreateAssessmentResultsTable', 'default', 'App', 1726972303, 11),
	(13, '2024-09-22-023316', 'App\\Database\\Migrations\\CreateHRReviewsTable', 'default', 'App', 1726972516, 12),
	(14, '2024-09-22-074032', 'App\\Database\\Migrations\\CreateEvaluationsTable', 'default', 'App', 1726990886, 13),
	(15, '2024-09-22-074206', 'App\\Database\\Migrations\\CreateResponsesTable', 'default', 'App', 1726991055, 14),
	(16, '2024-09-22-092500', 'App\\Database\\Migrations\\CreateEvaluationsTable', 'default', 'App', 1726997186, 15),
	(17, '2024-09-22-092711', 'App\\Database\\Migrations\\CreateEvaluationResponsesTable', 'default', 'App', 1726997312, 16),
	(18, '2024-09-22-092918', 'App\\Database\\Migrations\\CreateHrChecksTable', 'default', 'App', 1726997419, 17),
	(19, '2024-09-22-102700', 'App\\Database\\Migrations\\CreateHrChecksTable', 'default', 'App', 1727000901, 18),
	(20, '2024-09-28-110016', 'App\\Database\\Migrations\\CreateEvaluationsTable', 'default', 'App', 1727521657, 19),
	(21, '2024-09-30-024332', 'App\\Database\\Migrations\\CreateEvaluationsResponsesTable', 'default', 'App', 1727664361, 20),
	(22, '2024-09-30-031358', 'App\\Database\\Migrations\\CreateHrCheckTable', 'default', 'App', 1727666128, 21);

-- Dumping structure for table best_saksaim.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_name_eng` varchar(100) NOT NULL,
  `role_name_thai` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.roles: ~3 rows (approximately)
INSERT INTO `roles` (`role_id`, `role_name_eng`, `role_name_thai`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'ผู้ดูแลระบบ', '2024-09-19 20:55:35', '2024-09-19 20:55:36'),
	(2, 'HR', 'ฝ่ายบุคคล', '2024-09-19 20:56:14', '2024-09-19 20:56:14'),
	(3, 'User', 'ผู้ใช้งาน', '2024-09-19 20:56:27', '2024-09-19 20:56:28');

-- Dumping structure for table best_saksaim.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `FK_users_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table best_saksaim.users: ~5 rows (approximately)
INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'admin@gmail.com', '$2y$10$OLEsg740meNC7xvZPxXCXe0fz87dJ83GPH/3GmEICwBWH9hy0nsNW', 1, '2024-09-19 20:57:52', '2024-09-19 20:57:53'),
	(2, 'HR', 'hr@gmail.com', '$2y$10$OLEsg740meNC7xvZPxXCXe0fz87dJ83GPH/3GmEICwBWH9hy0nsNW', 2, '2024-09-19 20:59:00', '2024-09-19 20:59:01'),
	(3, 'User', 'user@gmail.com', '$2y$10$OLEsg740meNC7xvZPxXCXe0fz87dJ83GPH/3GmEICwBWH9hy0nsNW', 3, '2024-09-19 20:59:26', '2024-09-19 20:59:27'),
	(11, 'testuser', 'test@example.com', '$2y$10$n4oTyIi1PqPY/QD6hYSLZesC81iP0J.rO7lamEY8aYkVGKcvYMpL6', 1, '2024-09-30 15:31:15', '2024-09-30 15:31:15'),
	(12, 'เบส', 'best@gmail.com', '$2y$10$MSE7P6gd6lJxINgeMBKdB.qVy1sP1hFNsL8uIxC6LUTlZE0vjycIi', 3, '2024-09-30 15:37:23', '2024-09-30 15:37:23');

-- Dumping structure for view best_saksaim.evaluations
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `evaluations`;
;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
