-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 25, 2024 at 12:37 PM
-- Server version: 11.1.3-MariaDB
-- PHP Version: 8.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue`
--

-- --------------------------------------------------------

--
-- Table structure for table `sensors`
--

CREATE TABLE `sensors` (
  `id` int(11) NOT NULL,
  `temperature` float DEFAULT NULL,
  `lux` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `pump` int(1) DEFAULT NULL,
  `Moisture` float DEFAULT NULL,
  `flowrate` float DEFAULT NULL,
  `ip_address` varchar(15) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sensors`
--

INSERT INTO `sensors` (`id`, `temperature`, `lux`, `humidity`, `pump`, `Moisture`, `flowrate`, `ip_address`, `createdAt`, `updatedAt`) VALUES
(1, 24, 100, 12, 1, 0, 0, '', '2024-04-10 12:15:35', '2024-04-10 09:05:26'),
(2, 60, 1000, 123, 1, 0, 0, '', '2024-04-10 14:50:52', '2024-04-10 11:50:42'),
(3, 45, 1000, 123, 1, 0, 0, '', '2024-04-10 14:51:01', '2024-04-10 11:50:54'),
(4, 80, 1000, 123, 0, 0, 0, '', '2024-04-10 14:51:16', '2024-04-10 11:51:03'),
(5, 23.4, 10.83, 40, 0, 483, 0, '', '2024-06-14 14:13:19', '2024-06-14 14:13:19'),
(6, 23.4, 10.83, 40, 0, 505, 0, '', '2024-06-14 14:13:21', '2024-06-14 14:13:21'),
(7, 23.4, 10.83, 40, 0, 923, 0, '', '2024-06-14 14:13:22', '2024-06-14 14:13:22'),
(8, 23.4, 10.83, 40, 0, 807, 0, '', '2024-06-14 14:13:23', '2024-06-14 14:13:23'),
(9, 23.4, 10.83, 40, 0, 979, 0, '', '2024-06-14 14:13:25', '2024-06-14 14:13:25'),
(10, 23.4, 10.83, 41, 0, 436, 0, '', '2024-06-14 14:13:26', '2024-06-14 14:13:26'),
(11, 23.4, 10.83, 41, 0, 1181, 0, '', '2024-06-14 14:13:28', '2024-06-14 14:13:28'),
(61390, 22.6, 1.67, 69, 1, 37, 0, '192.168.88.24', '2024-12-23 00:16:41', '2024-12-23 00:16:41');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `PUMP_ON_THRESHOLD_LOW` int(11) NOT NULL,
  `PUMP_OFF_THRESHOLD_HIGH` int(11) NOT NULL,
  `MAX_LIGHT_THRESHOLD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `PUMP_ON_THRESHOLD_LOW`, `PUMP_OFF_THRESHOLD_HIGH`, `MAX_LIGHT_THRESHOLD`) VALUES
(1, 40, 65, 200);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'aimutev', 'azimutev@abv.bg', '$2a$10$PR4b3epcNEHLtRGdu7m9JOt6fHjzy0g8zxI.ji0DYoK5MYbyweKO.', '2024-03-31 22:45:17', '2024-03-31 22:45:17'),
(2, 'peoe', 'peoe@abv.bg', '$2a$10$EQDZ66cGLCOOq7m80JC1nOc/5..3MOzKsbFTIrKAK5wPUfhS20FTm', '2024-04-04 16:56:15', '2024-04-04 16:56:15'),
(4, 'admin', 'admin@abv.bg', '$2a$10$37Dr3jXxLgLGyp44KSBlU.uLJiQ8oI9RKHCfhoS8akDe/qIzD3KW.', '2024-04-27 21:00:37', '2024-04-27 21:00:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61391;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
