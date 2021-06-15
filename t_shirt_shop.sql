-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 15 2021 г., 11:06
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `t_shirt_shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `total_sum` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `total_sum`) VALUES
(1, 1, NULL),
(2, 2, NULL),
(3, 3, NULL),
(4, 4, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `cart_to_products`
--

CREATE TABLE `cart_to_products` (
  `id_cart` int(10) NOT NULL,
  `id_product` int(10) NOT NULL,
  `qty` int(100) NOT NULL,
  `sum_product` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id_category` int(10) NOT NULL,
  `name_category` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id_category`, `name_category`) VALUES
(1, 'Авто, мото'),
(2, 'Айтишникам'),
(3, 'Интернет приколы'),
(4, 'Музыка'),
(5, 'Праздники'),
(6, 'Наука и Космос'),
(7, 'Портреты'),
(8, 'Офис и работа');

-- --------------------------------------------------------

--
-- Структура таблицы `color`
--

CREATE TABLE `color` (
  `id_color` int(10) NOT NULL,
  `name_color` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `color`
--

INSERT INTO `color` (`id_color`, `name_color`) VALUES
(1, 'white'),
(2, 'black'),
(3, 'green'),
(4, 'red'),
(5, 'grey'),
(6, 'blue'),
(7, 'yellow'),
(8, 'brown'),
(9, 'pink');

-- --------------------------------------------------------

--
-- Структура таблицы `deliveries`
--

CREATE TABLE `deliveries` (
  `id_delivery` int(10) NOT NULL,
  `name_delivery` varchar(100) COLLATE utf8_bin NOT NULL,
  `price_delivery` decimal(10,2) NOT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `image` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(10) NOT NULL,
  `data_order` date NOT NULL,
  `id_user` int(10) NOT NULL,
  `total_sum` decimal(10,2) NOT NULL,
  `id_payment` int(10) NOT NULL,
  `id_delivery` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

CREATE TABLE `order_details` (
  `id` int(10) NOT NULL,
  `id_order` int(10) NOT NULL,
  `id_product` int(10) NOT NULL,
  `qty` int(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `summa` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `description_payment` text COLLATE utf8_bin NOT NULL,
  `image` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id_prod` int(10) NOT NULL,
  `name_prod` varchar(100) COLLATE utf8_bin NOT NULL,
  `price_prod` decimal(10,2) NOT NULL,
  `description_product` text COLLATE utf8_bin NOT NULL,
  `id_structure` int(10) NOT NULL,
  `image` varchar(100) COLLATE utf8_bin NOT NULL,
  `id_type` int(10) NOT NULL,
  `id_color` int(10) NOT NULL,
  `id_size` int(10) NOT NULL,
  `available` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id_prod`, `name_prod`, `price_prod`, `description_product`, `id_structure`, `image`, `id_type`, `id_color`, `id_size`, `available`) VALUES
(1, '\"Moto is my life\"', '324.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 1, 'shirt_3.png', 2, 6, 3, 5),
(2, '\"За рулем я - бог\"', '337.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 1, 'shirt_1.png', 1, 9, 4, 2),
(3, '\"Sysadmin\"', '337.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 3, 'shirt_12.png', 1, 8, 3, 3),
(4, '\"I\'m not a robot\"', '327.00', 'Майка скроена по фигуре из натурального хлопка. Материал мягкий и приятный на ощупь, не вызывает аллергии и обладает высокой степенью гигроскопичности. Боковые швы отсутствуют, что дает ощущение полного комфорта при повседневной носке. Майка отличается долговечностью и цветоустойчивостью.', 3, 'shirt_4.jpg', 1, 1, 2, 7),
(5, '\"Best godfather\"', '305.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 1, 'shirt_6.png', 1, 1, 3, 6),
(6, '\"The best godfather\"', '367.00', 'Футболка эргономичного кроя с круглым воротом отлично садиться по фигуре. Материал отличается приятной мягкостью и обладает хорошей плотностью. Благодаря отсутствию боковых швов, футболка не стесняет движений и дает ощущение комфорта при повседневной носке.', 2, 'shirt_5.png', 2, 2, 3, 3),
(7, '\"Espresso Patnonum\"', '333.00', 'Комфортный и практичный детский боди выполнен из натурального хлопка. Застегивается на кнопки под подгузник между ножек. Горловина расширяется для удобства одевания. Мягкая и приятная на ощупь ткань не будет раздражать нежную детскую кожу', 1, 'shirt_7.png', 4, 1, 5, 0),
(8, '\"Царь всея спортзала\"', '307.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 2, 'shirt_9.jpg', 6, 4, 4, 2),
(9, '\"Classic\"', '274.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 1, 'shirt_10.jpg', 2, 1, 3, 5),
(10, '\"Woman cool\"', '301.00', 'Женская футболка скроена по фигуре с фасонными боковыми швами. Материал ткани мягкий и приятный на ощупь. Аккуратно выполненная двойная отстрочка швов и уплотненный воротник лодочкой усиливают прочность, за счет чего футболка прекрасно держит форму и в процессе носки не скатывается и не растягивается.', 3, 'shirt_11.png', 3, 6, 2, 6),
(11, '\"Thats my game\"', '443.00', 'Футболка эргономичного кроя с круглым воротом отлично садиться по фигуре. Материал отличается приятной мягкостью и обладает хорошей плотностью. Благодаря отсутствию боковых швов, футболка не стесняет движений и дает ощущение комфорта при повседневной носке.', 2, 'shirt_2.png', 5, 4, 3, 3),
(12, '\"Vitruvian Drummer\"', '324.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью.', 3, 'shirt_13.png', 1, 5, 3, 4),
(13, '\"K.K. Mercury\"', '542.00', 'Утепленная толстовка с передним сквозным карманом-кенгуру. За счет плотного трикотажа и мягкой внутренней отделки из натурального хлопка, толстовка не оставляет ни единого шанса холоду и ветру проникнуть внутрь. Двойной капюшон с вытяжным шнурком пригодится в случае дождя или сильного ветра. Прямой фасон толстовки позволяет быть максимально раскованным и легким в движениях. Талия и манжеты выполнены с окантовкой в рубчик из смеси хлопка и эластана для сохранения формы. Отличается приятной мягкостью и обладает хорошей плотностью.', 2, 'shirt_14.png', 4, 1, 5, 3),
(14, '\"We are Groot the champions\"', '375.00', 'Классическая футболка прямого фасона отличается приятной мягкостью и обладает хорошей плотностью. Свободный крой и отсутствие боковых швов дают ощущение комфорта не стесняя движений. Благодаря использованию экологически чистого хлопка, ткань является гипоаллергенной и обладает высокой степенью гигроскопичности. Материал отличается долговечностью и цветоустойчивостью', 3, 'shirt_15.png', 2, 4, 3, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `product_to_categories`
--

CREATE TABLE `product_to_categories` (
  `id_product` int(10) NOT NULL,
  `id_categories` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `product_to_categories`
--

INSERT INTO `product_to_categories` (`id_product`, `id_categories`) VALUES
(1, 1),
(1, 8),
(1, 4),
(1, 5),
(2, 1),
(2, 3),
(2, 7),
(2, 5),
(3, 2),
(3, 8),
(3, 6),
(4, 2),
(4, 4),
(4, 6),
(4, 5),
(5, 5),
(5, 3),
(5, 4),
(6, 3),
(6, 7),
(6, 1),
(7, 7),
(7, 3),
(8, 1),
(8, 5),
(8, 3),
(8, 7),
(9, 2),
(9, 4),
(9, 6),
(9, 8),
(9, 7),
(9, 5),
(10, 2),
(10, 6),
(10, 7),
(10, 4),
(11, 1),
(11, 2),
(11, 5),
(11, 8),
(12, 1),
(12, 4),
(12, 5),
(12, 3),
(13, 4),
(13, 5),
(14, 1),
(14, 2),
(14, 4),
(14, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `sizes`
--

CREATE TABLE `sizes` (
  `id_size` int(10) NOT NULL,
  `name_size` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `sizes`
--

INSERT INTO `sizes` (`id_size`, `name_size`) VALUES
(1, 'S\r\n\r\n'),
(2, 'M'),
(3, 'L'),
(4, 'XL'),
(5, '62-68');

-- --------------------------------------------------------

--
-- Структура таблицы `structure`
--

CREATE TABLE `structure` (
  `id_structure` int(10) NOT NULL,
  `name_structure` varchar(100) COLLATE utf8_bin NOT NULL,
  `care_rules` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `structure`
--

INSERT INTO `structure` (`id_structure`, `name_structure`, `care_rules`) VALUES
(1, 'хлопок 100%', 'Изделие рекомендуется стирать в щадящем режиме при температуре не более 40°C. Перед стиркой футболку следует вывернуть наизнанку. Не допускается использование агрессивных отбеливающих средств. Гладить принт можно только через ткань либо с обратной стороны. Соблюдая эти простые правила, вы надолго продлите срок службы готового изделия.'),
(2, 'хлопок 90%, полиэстер 10%', 'Хлопок можно стирать в стиральной машине при температуре не более 40 градусов. Для стирки используйте мягкие средства без отбеливателя и хлора. Сушить лучше естественным способом, без применения машинной сушки. Гладить – в слегка влажном виде.'),
(3, 'хлопок 95%, вискоза 5%', 'По своей структуре вискоза напоминает хлопок, только она гораздо тоньше. Ткань хорошо впитывает влагу и почти не мнется. Вещи из вискозы можно стирать в машинке при 30 градусах, используя деликатный режим. Для стирки подойдет мягкое моющее средство без отбеливателя и хлора. Сушить изделие лучше в горизонтальном положении. Гладить – на средней температуре или в режиме «шелк».');

-- --------------------------------------------------------

--
-- Структура таблицы `type`
--

CREATE TABLE `type` (
  `id_type` int(10) NOT NULL,
  `name_type` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `type`
--

INSERT INTO `type` (`id_type`, `name_type`) VALUES
(1, 'Мужская'),
(2, 'Унисекс'),
(3, 'Женская'),
(4, 'Детская'),
(5, 'Длинный рукав'),
(6, 'Ringer'),
(7, 'Хенли');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `name_user` varchar(30) COLLATE utf8_bin NOT NULL,
  `email_user` varchar(30) COLLATE utf8_bin NOT NULL,
  `phone_user` varchar(15) COLLATE utf8_bin NOT NULL,
  `password` varchar(200) COLLATE utf8_bin NOT NULL,
  `surname` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `branchNP` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `email_user`, `phone_user`, `password`, `surname`, `city`, `address`, `branchNP`) VALUES
(1, 'vas vasych', 'vasya1985@ukr.net', '+380985461728', '$2b$05$4.1S0tdyypNOj8IZDxT5.ORGY.tndmI8vDLTdhvtR5FcDINUfBIai', NULL, NULL, NULL, NULL),
(2, 'mila', 'mila@ukr.net', '+380671151412', '$2b$05$ZeEF8kIP2kZiWcANZnwKNuwzzDJuP8UJAItQlilyxmau/dz8150M6', NULL, NULL, NULL, NULL),
(3, 'bony', 'bony@ukr.net', '+380675283658', '$2b$05$rMfHixS6xctn0zE0jwiU..Qbp0jAySVS9kpdZuegBurJGXc/e1P5i', NULL, NULL, NULL, NULL),
(4, 'vova', 'vava@gmail.com', '+380671152478', '$2b$05$yVTUj3sSls2JMrHvEPGTseu/I0/UnXJC5ANYqGrZEg5p7AuGdmWk.', NULL, NULL, NULL, NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `cart_to_products`
--
ALTER TABLE `cart_to_products`
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_cart` (`id_cart`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Индексы таблицы `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id_color`);

--
-- Индексы таблицы `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id_delivery`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_payment` (`id_payment`),
  ADD KEY `id_delivery` (`id_delivery`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Индексы таблицы `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `id_structure` (`id_structure`),
  ADD KEY `id_type` (`id_type`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_size` (`id_size`);

--
-- Индексы таблицы `product_to_categories`
--
ALTER TABLE `product_to_categories`
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_categories` (`id_categories`);

--
-- Индексы таблицы `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id_size`);

--
-- Индексы таблицы `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`id_structure`);

--
-- Индексы таблицы `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id_type`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `color`
--
ALTER TABLE `color`
  MODIFY `id_color` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id_delivery` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id_prod` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id_size` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `structure`
--
ALTER TABLE `structure`
  MODIFY `id_structure` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `type`
--
ALTER TABLE `type`
  MODIFY `id_type` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `cart_to_products`
--
ALTER TABLE `cart_to_products`
  ADD CONSTRAINT `cart_to_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_prod`),
  ADD CONSTRAINT `cart_to_products_ibfk_3` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_payment`) REFERENCES `payment` (`id_payment`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_delivery`) REFERENCES `deliveries` (`id_delivery`);

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_prod`);

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_structure`) REFERENCES `structure` (`id_structure`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id_type`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`id_color`) REFERENCES `color` (`id_color`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id_size`);

--
-- Ограничения внешнего ключа таблицы `product_to_categories`
--
ALTER TABLE `product_to_categories`
  ADD CONSTRAINT `product_to_categories_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_prod`),
  ADD CONSTRAINT `product_to_categories_ibfk_2` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
