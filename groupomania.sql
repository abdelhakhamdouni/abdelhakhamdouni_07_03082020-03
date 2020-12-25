-- phpMyAdmin SQL Dump
-- version 5.0.5-dev
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 04 déc. 2020 à 08:18
-- Version du serveur :  5.7.24
-- Version de PHP : 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `CommentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `CommentId`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(42, 'commentaire de l\'admin', 42, '2020-12-04 01:51:33', '2020-12-04 01:51:33', 19, 12),
(43, 'je confirm 😈', 43, '2020-12-04 01:53:24', '2020-12-04 01:53:24', 19, 21),
(44, 'le commentaire de l\'admin', 43, '2020-12-04 02:23:42', '2020-12-04 02:23:42', 19, 21),
(45, 'commentaire de hamdouni', 45, '2020-12-04 02:52:15', '2020-12-04 02:52:15', 17, 21),
(46, 'reponse de hamdouni 😎', 43, '2020-12-04 02:52:30', '2020-12-04 02:52:30', 17, 21),
(47, 'les commentaires ', 47, '2020-12-04 03:04:39', '2020-12-04 03:04:39', 18, 8);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(7, '2020-12-04 00:24:27', '2020-12-04 00:24:27', NULL, 12),
(8, '2020-12-04 01:28:26', '2020-12-04 01:28:26', NULL, 20),
(9, '2020-12-04 01:31:02', '2020-12-04 01:31:02', NULL, 15),
(10, '2020-12-04 01:31:04', '2020-12-04 01:31:04', NULL, 14),
(11, '2020-12-04 01:31:06', '2020-12-04 01:31:06', NULL, 12),
(12, '2020-12-04 01:31:08', '2020-12-04 01:31:08', NULL, 8),
(24, '2020-12-04 02:52:45', '2020-12-04 02:52:45', 17, 21),
(26, '2020-12-04 03:03:08', '2020-12-04 03:03:08', 18, 20),
(27, '2020-12-04 03:03:12', '2020-12-04 03:03:12', 18, 21),
(28, '2020-12-04 03:03:15', '2020-12-04 03:03:15', 18, 15),
(29, '2020-12-04 03:03:18', '2020-12-04 03:03:18', 18, 14),
(31, '2020-12-04 03:03:21', '2020-12-04 03:03:21', 18, 8),
(32, '2020-12-04 03:03:23', '2020-12-04 03:03:23', 18, 12);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` int(11) DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `likes` int(11) DEFAULT '0',
  `userslikes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `userPseudo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `image`, `comments`, `description`, `likes`, `userslikes`, `type`, `createdAt`, `updatedAt`, `UserId`, `userPseudo`) VALUES
(8, NULL, '/images/tenor-1606722055401.gif', 1, NULL, 5, NULL, NULL, '2020-11-30 07:40:55', '2020-11-30 08:35:54', NULL, 'harissa'),
(12, NULL, '/images/tenor-(1)-1606800415550.gif', 1, NULL, 5, NULL, NULL, '2020-12-01 05:26:55', '2020-12-01 05:26:55', NULL, 'harissa'),
(14, 'comment passer une bonne journée', '/images/photo-1601758260651-32188a43c9b3.webp-1606800767583.undefined', 0, '8 tips pour booster sa journée\r\nSouvent les journées passent si vite qu’on ne prend pas assez le temps de profiter de chacune d’elles. Le stress, le travail et le manque de temps nous empêche d’apprécier les petits bonheurs du quotidien. Alors voici 8 conseils pour passer une bonne journée et booster votre humeur !\r\n1)    Se lever plus tôt et sortir directement de son lit !\r\nLes matins sont parfois très difficiles, le réveil sonne, on appuie sur « snooze » pour pouvoir profiter de quelques minutes supplémentaires de sommeil. Seulement à ce stade, on ne retombe pas dans un sommeil profond. On se remet juste dans un état de fatigue, ce qui rend le réveil encore plus difficile et douloureux. La meilleure manière de démarrer la journée est de se lever directement après le doux son du réveil.\r\n\r\n2)     Méditer quelques minutes.\r\nMéditer le matin (même pour 10 minutes) permet de réveiller son corps et son esprit. Nos pensées sont apaisées et nous sommes de bonne humeur, prêts à affronter le stress de la journée. C’est une hygiène mentale à pratiquer tous les jours.\r\n\r\n3)    Prendre des vitamines pour être au top.\r\nLes carences alimentaires peuvent parfois jouer sur notre moral et notre santé. Prendre des compléments alimentaires peut parfois donner un coup de boost à votre énergie. Attention tout de fois de demander des conseils à votre médecin avant de vous supplémenter en vitamines ou autre.\r\n\r\n4)    Préparer un petit-déjeuner qui donne envie de se lever.\r\nIl s’agit d’un repas essentiel pour avoir l’énergie nécessaire pour toute la journée. En se levant plus tôt, on a le temps de se faire un vrai petit-déjeuner! Et pourquoi pas tester quelque chose de nouveau ? Un smoothie bowl, du granola fait maison, des pancakes, un pudding de chia, etc.\r\n\r\n5)     Prendre l’air, faire une pause.\r\nRester assis et enfermé toute la journée n’est pas recommandé pour un mode de vie sain. Une petite promenade de 15 minutes permet au cerveau de s’aérer, on est plus heureux et plus productif après ! \r\n\r\n6)     Tester une nouvelle recette et prendre le temps de cuisiner.\r\nOn a souvent tendance à cuisiner les mêmes plats ennuyants ! Pour illuminer sa journée, ouvrez plus souvent vos beaux livres de cuisines (ils ne sont pas là juste pour décorer) et choisissez une recette qui vous donne envie. Vos sens seront stimulés et vous profiterez d’autant plus de votre repas en famille ou entre amis.\r\n\r\n7)     Diffuser des huiles essentielles.\r\nLes huiles essentielles ont des répercussions sur nos comportements et nos émotions. On peut les utiliser contre le stress, le trac, les soucis de concentration, les insomnies, ou simplement pour purifier l’air. Un petit geste simple qui peut avoir de grands effets sur notre journée ou notre nuit.\r\n\r\n8)    Apprendre quelque chose chaque jour. \r\nUn bon conseil pour s’améliorer chaque jour est d’essayer d’apprendre quotidiennement. Cela peut se faire en lisant un livre, en écoutant un podcast… De cette manière, vous serez constamment stimulé, et vos journées seront plus intéressantes.', 4, NULL, NULL, '2020-12-01 05:32:47', '2020-12-01 05:45:39', NULL, 'harissa'),
(15, NULL, '/images/tenor-(2)-1606838858691.gif', 0, NULL, 6, NULL, 'media', '2020-12-01 17:07:38', NULL, 17, 'abdelhak'),
(20, NULL, '/images/avatar-1607041453792.jpg', 0, NULL, 4, NULL, 'media', '2020-12-04 01:24:13', NULL, NULL, 'abdelhak'),
(21, NULL, '/images/tenor-(3)-1607043159337.gif', 4, 'le déhanché de la mort 😎', 2, NULL, 'media', '2020-12-04 01:52:39', NULL, 19, 'abdelhak');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'ROLE_USER',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `avatar`, `roles`, `password`, `createdAt`) VALUES
(17, 'Hamdouni', 'Abdelhak', 'hamdouni@sfr.fr', '/images/avatar-1606836735357.jpg', 'ROLE_USER', '$2b$10$Hpi0bKJaqS9xelXJwSwRpeEoG9tJfA.GAas664jfs1h.oDgN8TeEq', '2020-12-01 16:32:15'),
(18, 'jean', 'dao', 'jean.dao@groupomania.com', '/images/avatar-1607042241970.jpg', 'ROLE_USER', '$2b$10$bMsE0MAVfXrkFA9Z/9tZnedvI2VyxcPU0sFy8YFdN7328X8JErRGK', '2020-12-04 01:37:22'),
(19, 'warnault', 'melanie', 'mwarnault@groupomania.com', '/images/photo-1601758260651-32188a43c9b3-1607042936021.jpg', 'ROLE_USER,ROLE_ADMIN', '$2b$10$kr3miq.tCbFLrBWjc/TuDuUevFhZmjCkWl3PvzSS/Wh..gughBDSe', '2020-12-04 01:48:56');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
