-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2023 at 09:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `passport_to_paradise`
--
CREATE DATABASE IF NOT EXISTS `passport_to_paradise` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `passport_to_paradise`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(15, 5),
(7, 9),
(27, 5),
(25, 3),
(25, 8),
(28, 3),
(29, 3),
(29, 9),
(29, 65),
(31, 11),
(33, 3),
(33, 11),
(33, 7),
(33, 8),
(34, 3),
(34, 11),
(34, 7),
(34, 8),
(34, 10),
(34, 9),
(34, 5),
(34, 66),
(34, 12),
(34, 13),
(34, 65),
(34, 64),
(36, 64),
(38, 3),
(38, 5),
(38, 9),
(38, 11),
(39, 8),
(39, 11),
(41, 8),
(41, 11),
(41, 7),
(41, 13),
(41, 66),
(41, 5),
(44, 11),
(44, 10),
(44, 66),
(44, 5),
(44, 13),
(44, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(200) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(5, 'Yogev', 'Bar', 'yogevBar12@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353', 2),
(6, 'Avi', 'Bar', 'yogevBar123@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353', 2),
(7, 'Gaby', 'Bar', 'gaby123@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353', 2),
(8, 'Gaby', 'Bar', 'gaby1234@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353', 2),
(9, 'Gaby', 'Bar', 'gaby12345@gmail.com', '580f0d7c638548158a7d78f7d79ddfbb0e31f17ee0699208e8387ae7c73a', 2),
(10, 'Gaby', 'Bar', 'gaby123456@gmail.com', '580f0d7c638548158a7d78f7d79ddfbb0e31f17ee0699208e8387ae7c73a', 2),
(11, 'Gaby', 'Bar', 'hudc@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353', 2),
(12, 'Gaby', 'Bar', 'hudc1@gmail.com', '2fc4f5439caa25aa6be9e05ebba5139b8c34b8863ea83b783bcfb43bfe8f', 2),
(13, 'Gaby', 'Bar', 'hudc12@gmail.com', '2fc4f5439caa25aa6be9e05ebba5139b8c34b8863ea83b783bcfb43bfe8fe5d958f8420957bbf4e448769d6b4ec7fdea0fd1ca656173bff5a067ece58d3a3d56', 2),
(14, 'Gaby', 'Bar', 'hudc122@gmail.com', '2fc4f5439caa25aa6be9e05ebba5139b8c34b8863ea83b783bcfb43bfe8fe5d958f8420957bbf4e448769d6b4ec7fdea0fd1ca656173bff5a067ece58d3a3d56', 2),
(15, 'Gaby', 'Bar', 'admin@gmail.com', '215034b20f4cf1f94908a4f7d0fbe8b025bcd248688c3d18bf93579c5e0e46ae6618db1d99c16cece851027780511670fef3d30446a06a65d866c8ad6b394d39', 2),
(16, 'Gaby', 'Bar', 'admin1@gmail.com', 'd19d4cf707e17051611f1f0b82b904666a58aef03d4ce0f2dd1fa6799247f9f7433eee88365975ca17feefd725c52dae24d8d8327c439b9c2c0440468c3aac29', 1),
(17, 'Yogev', 'Bar', 'yogevbar2@gmail.com', '837b1564c3d1cba77899763de1ed8ade92dba9d2dc2023e2b9be1047630bffa777f1cd9561d1bc2fbbdc65b07366c8645ba3d58b4f2c8fe70d3d9034d292c89f', 2),
(18, 'aעכיכעיכיע', 'afdsfd', 'sa@dsdfsdf', '9b2f3b7a6583343d38c01a88c0276ebae9ef39021db32efb8508f7731d7eccded91c38f12145511bc1aa7c94d527f28cc824c9c7cb8ee77bdfa227d030c50a5e', 2),
(19, 'adsf', 'asds', 'sa@sd', '335e4ceece4078ea8d234cb631d5618d2ae3bed2ff5b0283da5390d661b456388202eee0e1a1c48e2dfd14950b6ebf60cf19623254a3a4aaa4d5e8fae220cba2', 2),
(20, 'adfg', 'afgd', 'aaa@fdsfdg', 'a9614ee03583d5d1bf5d0d40c5d47133507155113ef8670de1acdddabf4af6f9cb19ec0dbbba24d1e7dea70eba73c6bf9a239c92a9df1b5caa1af7c04f61f133', 2),
(21, 'yoni', 'saadon', 'yoni@gmail.com', 'b220801700bd09c1f9c5d6d8409223ae5c45e86beef16972684640cf6353e418f45efcc48c873dfc00652fde32b0da333a04242817ea8a467eeb58acd1ada295', 2),
(22, 'eitan', 'azulay', 'eitan@gmail.com', 'a7beec86b5eef2b43fdbe03f371a6b83d9b93ae382b401b48cc124fcd174ed76d69bc677992501427c3b1912ea94fa65a78e9d101b48012b7ef4fc3c7ceef3b2', 2),
(23, 'gaby', 'alboim', 'gaby@gmail.com', '2c016f248a84cba7d535106829f63ff48612dbb0c9d537dc919c5b11cdb7ac6b36690336e467c88ce7e2ae15fc6667f7c469854ffd7a5113938264c8f0434fbe', 2),
(24, 'aaaaaa', 'aavvvvvvvv', 'aaaaaaaa@gmail.com', '6a426c1f9acbaa62b36f5ee1734c3b7c55e0bc567fdc8c4bb988d9507ff3a89c308e22729011ee7a10d5c20a2d678755f493578912db1744f1cd0c1f06ad4413', 2),
(25, 'aaaa', 'aaaaaaaaaaaaaaaa', 'aaaaa@aaaaaaaa.aaaaaaaaaa', 'e0e94cbdb8987339baefa8418e82dcb76338b83c2f4d43f4aa66e3d2269b21f2fff5a0661c85207db6d6d6901f5ddab378b269aca7e9ed46dd1627bc2ee419bd', 1),
(26, 'hudc', 'cr', 'hudc123@gmail.com', '23b3fb16608ded5a5ff135b058e75eae1b32724065460758a10545dc60dc907910e9ab94824c09dca3c800d62e862a902e89acd85a000e2971355518b8265ba4', 2),
(27, 'aaaaaaa', 'aaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaa@bbb', 'feb392bb0d21b00b5e1e3adaf1dce7aa26dde6ac28c56e38a2606667f21b03c6599d0d0f29e53aca55c2569ebd0672f90824f6b01fd11a6273a5ac2a5390c341', 1),
(28, 'yogbar@gmail.com', 'yogbar@gmail.com', 'yogbar@gmail.com', 'a4779b1c0425fc2f62c9c2fef33c25934d691ddf1f25b319e0c0722d55b61185d0ec60d1dba3b9a27da26acf58882cbcb25d6aceaf86f072a5c8cf5869b7e864', 2),
(29, 'Michal', 'Bar', 'mihchalbar@walla.com', '4e668ddf9562c69838d187722f8555603482b49ce0abdb22015dbb71ea13aba5acdc9e5f3e839c3c6bf4f7917e838f4fef634b03bd9141e28455715f07668707', 2),
(30, 'Yogev', 'Admin', 'admin2@gmail.com', 'f900f9953f25c000c94c77fc95376ec5b404f00e6a4c82508b504f7c074cd7e293d9cbba67c322dbf7a323e511863a1d7fcc49544075f05868ff57229ae5b9b7', 1),
(31, 'ahron', 'bar', 'Aharon@gmail.com', '483c8b01206b1caa7b9e034dd84751a9278c2e11df8619e4f7c10692a0197202ec2bdc3b91fb0bdc378ebe33a00b8519cf0f9308f99f150efc81b54537c46b9a', 2),
(32, 'Roi', 'maman', 'roiiiiiii@asaddas', '5f73b618badebc594c70335415dc5ebd6f733cdc6e0bb2aca466363430bb508fc5b3b0f7002452f64ebd1bc8f95951c3204de2f88a52a8bc9e5c189ef9709204', 2),
(33, 'Roy', 'Mamman', 'RoyMamman@gmail.com', '1c58a64026b5e91c869d2177d895b4a7f0bdd691108cdb39a7b4bae8095ec1d50a8e84c37acf8110bef10403531a7759dc8fee20abb1e54b7654a0bb898df5d5', 2),
(34, 'aaaaaaaaaaaaaa@EWewew', 'aaaaaaaaaaaaaa@EWewew', 'aaaaaaaaaaaaaa@EWewew', '1ccc888f4e0f5af51271c07d93df6190d76efe82eeed789780361ee7f5fdae08a58c8c3cbfb10bde68c60f731a7e1e662ca0bb60ec31bbcda4777f85e6c4eb26', 2),
(35, 'aaaaaaaaaaa@ee', 'aaaaaaaaaaa@ee', 'aaaaaaaaaaa@ee', '47720dfff79df0bb42f3ee6d1f1bf68a4effbbef9f89941f1d67951c2c8cd16c7a4226707e46283c5d2fdd115165220dbf322858fbbf562259d52a29ea5446c0', 2),
(36, 'cxczxxvcxvc', 'vxcxcvxvcvcx', 'dsdssadsda@sfdsfdfds.fhh', 'd87768cfb7e2cb85cac7b9ca3c46e5c61218212e04dabeed66939e581b8fe14e3efa837c0892fc98e97d0b9f78cb50503f34382d3949989bb637b4a2d9e82a2c', 2),
(37, 'dsfgertrre@dfsddffs', 'dsfgertrre@dfsddffs', 'dsfgertrre@dfsddffs', 'aa2d411efbed4038872f0dad97a40fb80eeacbcb2a2451b093c0e555d71c1027fb36ca56f53cd6534cf390f27aee434e6e53cc9cbd742931ef1278cda70f5fab', 2),
(38, 'yogev', 'bar', 'yogbakjfdsjdsfjkjdfks@kjfdlskjsfdkl', '9b08162653e0b5078a7b7d3b9de57cb017040f1a4a9793b7aee47777f55b71e60210aff77bd04d424b9d4b320f998da655454ea7f76072d9ac1237408d616bc1', 2),
(39, 'sdfsdfsfd', 'sdfsdffsd', 'dfssfdfds@sfdfds', '3183a42172bfe19394f79c4b4df90b793647df076cc8e972a3d7e549b7f2b3bc5b47a185703075da3c0e17b6c5408ded37994916f73830ce20baaba2192bfc46', 2),
(40, 'sdfsdds', 'sfdfdsfsd', 'DSsdasad@fdfdfdsdsf.com', '4dfdf93c5e2bd2e4a01396ae0e7b74d99d3c4843e06303b61532b552b77908caeb1bc5867be8913fb3c092ec1972ed13911225bddb7cea6d71af654df410204a', 2),
(41, 'fdsdfd#dffds', 'DSdsds', 'aaaaaaaaaaa@wwww', '1920c2783d4379cef3d1179ce1955bf1de3c6c55c3e2d5ec3a73b94e87ea0e1df934bac171b66969ca50bc0d20aa23f318102b10640e22ff3dc73a069450849f', 2),
(42, 'שששש', 'ששששa', 'aaaa@dasdsa.com', 'a1a1c3a66826c381f574482a4a5e8a85e22e9ba3f6957f3ff8f65c920026d61dd5c316c5d80cca0da72588802a2f496f8870add8d2faf504e3b3caa71b3b159a', 2),
(43, 'aaaaaaaaaaaa', 'aaaaaaaaaaaaaa', 'aaaaaaaa@eeeee.ccc', '956fe87975ed274de1bc9388f721ae81f516e45a4bbe37124315687c83e4580f3e74fc825912866fa4d9fe9d4a2880a5aacd860b90fb969e547cceddcb506cb3', 2),
(44, 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', 'aaaaaaaaaaa@dsdsdf.com', 'd8e57448140bd4e0e66fc80e1dbdad8e81be36e1e14ff75eef5e1d4effebccd9991b10f6a092ff85f3a15569582b51a81513f88a9d5af69a664c6ba2195cec6a', 2),
(45, 'sfdfdsfd', 'ddfsfd', 'sdadsa@sdadsa.xom', '4ef8b5498745cc24d9d3fb67209dfb37127683e9af57c27108bdf9cde85021b817abd9aa497ee75c6ae0c006189d9f96406d4dbb11b6a030fcd33eacfe089232', 2),
(46, 'Regular', 'User', 'user@gmail.com', '2d6aff9da366409c6196393aa5579afd3fbf441f2e1e3c7c8a86193eca30081d643ba9d9e15726072d0e82a41f3f55a8b5f65c71bd0d11c1508891c8104a04a7', 2),
(47, 'admin', 'admin', 'admin3@gmail.com', 'd717e52428e876b12a42936cf89835fb05c2995edb1c73b157a1faec73e743964e1b2f4dfd9939acb6bc906e5fb3fca2a42a9bb66a2d6362598f3df1c873516f', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(50) NOT NULL,
  `vacationDescription` varchar(250) NOT NULL,
  `vacationStartDate` date NOT NULL,
  `vacationEndDate` date NOT NULL,
  `vacationPrice` decimal(6,2) NOT NULL,
  `imageUrl` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `vacationStartDate`, `vacationEndDate`, `vacationPrice`, `imageUrl`) VALUES
(3, 'Madrid', 'In the heart of Spain, Madrid stands as a dynamic blend of history and modernity. With its royal palaces, world-renowned art museums like the Prado and Reina Sofía, and a thriving culinary scene offering tapas to haute cuisine.', '2023-08-22', '2023-08-31', 4000.00, 'madrid.jpg'),
(5, 'Budapest', 'Budapest, a tapestry of history and thermal wonders. Explore Buda Castle, soak in Széchenyi Baths, and cruise the Danube for panoramic views. Budapest\'s charm lies in its architectural gems, both Gothic and Art Nouveau, and a vibrant nightlife along ', '2023-09-22', '2023-10-02', 4550.00, 'Budapest.jpg'),
(7, 'Tokyo', 'A blend of tradition and technology. Explore Senso-ji Temple, Shibuya Crossing, and savor sushi at Tsukiji Market.', '2023-08-29', '2023-09-10', 4800.00, '542029eb-cd45-4306-8852-20de8a1b5e6c.jpeg'),
(8, 'Rome', 'The Eternal City\'s allure. Marvel at the Colosseum, toss coins in Trevi Fountain, and relish pasta in charming trattorias.\r\n\r\n', '2023-08-30', '2023-09-10', 5800.00, 'Rome.jpeg'),
(9, 'Cape Town', 'A tapestry of landscapes. Ascend Table Mountain, explore Robben Island\'s history, and unwind on Camps Bay\'s shores.', '2023-10-04', '2023-10-31', 8800.00, 'Cape Town.jpeg'),
(10, 'Venice', 'A city on water. Drift through canals in gondolas, admire St. Mark\'s Basilica, and savor Venetian cuisine in hidden alleys.\r\n\r\n', '2023-09-07', '2023-09-21', 7500.00, 'Venice.jpeg'),
(11, 'Hong Kong', 'East-meets-West dynamism. Ascend Victoria Peak, explore bustling markets, and savor a fusion of culinary delights.', '2023-08-29', '2023-09-19', 8700.00, 'Hong Kong.jpeg'),
(12, 'Amsterdam', 'Canals and culture intertwine. Cycle along picturesque waterways, visit Anne Frank House, and admire Van Gogh\'s masterpieces.\r\n\r\n', '2023-10-06', '2023-10-18', 7700.00, 'Amsterdam.jpeg'),
(13, 'Berlin', 'Layers of history and creativity. Explore Brandenburg Gate, visit East Side Gallery, and indulge in Berlin\'s vibrant nightlife.\r\n\r\n', '2023-10-04', '2023-10-20', 9900.00, 'Berlin.jpeg'),
(64, 'Haifa', 'Haifa boasts a picturesque vacation spot, nestled between the stunning Carmel Mountains and the Mediterranean Sea, offering a blend of natural beauty and cultural attractions.', '2023-10-14', '2023-10-28', 1234.00, '3e287e6f-e325-4360-8c52-72da7e2b9820.jpeg'),
(65, 'Tel Aviv', 'Tel Aviv offers a vibrant and sunny vacation destination, with beautiful beaches, rich cultural experiences, and a lively nightlife', '2023-10-10', '2023-11-08', 3333.00, '83ff26fe-21ae-479b-a63b-cfeb0263c7d9.jpg'),
(66, 'Jerusalem', 'Jerusalem, often referred to as the \"City of Gold,\" is a captivating destination for travelers seeking a unique blend of rich history, culture, and spirituality. This ancient city holds immense significance for three major religions—Judaism, Christia', '2023-10-02', '2023-11-22', 8500.00, '71e0a21e-bea5-410a-9113-f387d5169089.jpeg'),
(70, 'Pristina', 'Discover the vibrant charm of Pristina, Kosovo\'s capital. Wander through the Old Town\'s mix of Ottoman and modern influences, admire the Newborn monument, and savor local delicacies like flija and qebapa. Dive into history at the Kosovo Museum, or es', '2023-11-14', '2023-11-29', 3332.99, 'be4e9538-7e10-4a0f-abbe-abd587c7bd95.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
