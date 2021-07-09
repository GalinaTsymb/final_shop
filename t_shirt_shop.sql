-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 09 2021 г., 17:22
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

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCart` ()  BEGIN
UPDATE cart C SET
C.qty_total = (SELECT SUM(CP.qty) FROM cart_to_products CP WHERE CP.id_cart = C.id_cart),
C.total_sum = (SELECT SUM(CP.sum_product) FROM cart_to_products CP WHERE CP.id_cart = C.id_cart);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCartToProducts` ()  BEGIN
UPDATE cart_to_products CP SET
CP.sum_product = CP.qty * (SELECT P.price_prod FROM products P WHERE P.id_prod = CP.id_product);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateOrders` ()  BEGIN
UPDATE orders O SET
O.total_sum = (SELECT SUM(Od.summa) FROM order_details Od WHERE Od.id_order = O.id_order),
O.sum_delivery = (SELECT D.price_delivery FROM deliveries D WHERE O.id_delivery = D.id_delivery);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `qty_total` int(255) DEFAULT NULL,
  `total_sum` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `qty_total`, `total_sum`) VALUES
(1, 1, NULL, NULL),
(2, 2, NULL, NULL),
(3, 3, NULL, NULL),
(5, 5, NULL, NULL),
(6, 6, NULL, NULL),
(7, 7, NULL, NULL),
(8, 8, NULL, NULL),
(9, 9, NULL, NULL),
(10, 10, NULL, NULL),
(11, 11, NULL, NULL),
(12, 12, NULL, NULL),
(13, 13, NULL, NULL),
(14, 14, NULL, NULL),
(15, 15, 2, '610.00');

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

--
-- Дамп данных таблицы `cart_to_products`
--

INSERT INTO `cart_to_products` (`id_cart`, `id_product`, `qty`, `sum_product`) VALUES
(15, 5, 2, '610.00');

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

--
-- Дамп данных таблицы `deliveries`
--

INSERT INTO `deliveries` (`id_delivery`, `name_delivery`, `price_delivery`, `description`, `image`) VALUES
(1, 'Новая Почта - отделение', '60.00', 'Доставка в отделение Новой Почты. Посылка доставляется в течение 1-3 рабочих дней с даты отправки заказа. Посылку следует забрать в течение 5-ти дней с момента доставки. По прошествии 5-ти дней компанией Новая Почта взымается доплата за хранение отправления.', 'nova-post.jpg'),
(2, 'Новая почта - курьер', '105.00', 'Курьер звонит Получателю за 30-60 минут до прибытия по адресу, указанному в экспресс-накладной. Доставка по адресу осуществляется до 21:00 в будние дни и в выходные дни по специальному графику.', 'courier.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(10) NOT NULL,
  `data_order` date NOT NULL DEFAULT current_timestamp(),
  `id_user` int(10) NOT NULL,
  `total_sum` decimal(10,2) DEFAULT NULL,
  `id_payment` int(10) NOT NULL,
  `id_delivery` int(10) NOT NULL,
  `sum_delivery` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `data_order`, `id_user`, `total_sum`, `id_payment`, `id_delivery`, `sum_delivery`, `status`) VALUES
(1, '2021-07-06', 1, '1316.00', 2, 2, '105.00', 'in process'),
(2, '2021-07-06', 1, '1011.00', 1, 1, '60.00', 'in process'),
(3, '2021-07-06', 1, '2172.00', 1, 1, '60.00', 'in process'),
(4, '2021-07-06', 1, '648.00', 1, 2, '105.00', 'in process'),
(5, '2021-07-07', 1, '2605.00', 1, 1, '60.00', 'in process'),
(6, '2021-07-08', 2, '2301.00', 1, 1, '60.00', 'in process'),
(7, '2021-07-09', 1, '324.00', 1, 1, '60.00', 'in process'),
(8, '2021-07-09', 1, '2626.00', 1, 1, '60.00', 'in process'),
(9, '2021-07-09', 7, '1944.00', 1, 1, '60.00', 'in process'),
(10, '2021-07-09', 2, '11369.00', 1, 1, '60.00', 'in process'),
(11, '2021-07-09', 8, '3668.00', 1, 1, '60.00', 'in process'),
(12, '2021-07-09', 8, '610.00', 1, 1, '60.00', 'in process'),
(13, '2021-07-09', 8, '1408.00', 2, 1, '60.00', 'in process'),
(14, '2021-07-09', 8, '305.00', 1, 1, '60.00', 'in process'),
(15, '2021-07-09', 8, '674.00', 2, 1, '60.00', 'in process'),
(16, '2021-07-09', 8, '367.00', 1, 1, '60.00', 'in process'),
(17, '2021-07-09', 9, '1920.00', 1, 1, '60.00', 'in process'),
(18, '2021-07-09', 10, '324.00', 1, 1, '60.00', 'in process'),
(19, '2021-07-09', 10, '632.00', 1, 2, '105.00', 'in process'),
(20, '2021-07-09', 10, '1011.00', 1, 1, '60.00', 'in process'),
(21, '2021-07-09', 14, '648.00', 1, 1, '60.00', 'in process'),
(22, '2021-07-09', 15, '1685.00', 1, 1, '60.00', 'in process');

-- --------------------------------------------------------

--
-- Структура таблицы `order_details`
--

CREATE TABLE `order_details` (
  `id_order` int(10) NOT NULL,
  `id_product` int(10) NOT NULL,
  `qty` int(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `summa` decimal(10,2) GENERATED ALWAYS AS (`qty` * `price`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `order_details`
--

INSERT INTO `order_details` (`id_order`, `id_product`, `qty`, `price`) VALUES
(1, 5, 1, '305.00'),
(1, 3, 3, '337.00'),
(2, 2, 3, '337.00'),
(3, 2, 1, '337.00'),
(3, 6, 5, '367.00'),
(4, 1, 2, '324.00'),
(5, 1, 7, '324.00'),
(5, 2, 1, '337.00'),
(6, 1, 2, '324.00'),
(6, 2, 4, '337.00'),
(6, 5, 1, '305.00'),
(7, 1, 1, '324.00'),
(8, 4, 7, '327.00'),
(8, 2, 1, '337.00'),
(9, 1, 2, '324.00'),
(9, 1, 2, '324.00'),
(9, 1, 2, '324.00'),
(10, 3, 26, '337.00'),
(10, 1, 3, '324.00'),
(10, 4, 5, '327.00'),
(11, 1, 3, '324.00'),
(11, 2, 8, '337.00'),
(12, 5, 2, '305.00'),
(13, 6, 2, '367.00'),
(13, 3, 2, '337.00'),
(14, 5, 1, '305.00'),
(15, 2, 2, '337.00'),
(16, 6, 1, '367.00'),
(17, 1, 3, '324.00'),
(17, 3, 2, '337.00'),
(17, 9, 1, '274.00'),
(18, 1, 1, '324.00'),
(19, 5, 1, '305.00'),
(19, 4, 1, '327.00'),
(20, 2, 3, '337.00'),
(21, 1, 2, '324.00'),
(22, 2, 5, '337.00');

-- --------------------------------------------------------

--
-- Структура таблицы `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `description_payment` text COLLATE utf8_bin NOT NULL,
  `image` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `payment`
--

INSERT INTO `payment` (`id_payment`, `name`, `description_payment`, `image`) VALUES
(1, 'Приват24', 'Это один из наиболее удобных и экономных сервисов по оплате покупок. Используя сервис Приват24, вы можете оплатить свои покупки, не выходя из дома.', 'p24.jpg'),
(2, 'наложенный платеж', 'Расчет при получении или «наложенный платеж» производится исключительно через услуги Новой Почты. Заказ оплачивается при получении посылки. ', 'nalogNP.png');

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
  `name` varchar(30) COLLATE utf8_bin NOT NULL,
  `email_user` varchar(30) COLLATE utf8_bin NOT NULL,
  `phone` varchar(15) COLLATE utf8_bin NOT NULL,
  `password` varchar(200) COLLATE utf8_bin NOT NULL,
  `surname` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `city` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `branchNP` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `name`, `email_user`, `phone`, `password`, `surname`, `city`, `address`, `branchNP`) VALUES
(1, 'Мила', 'mila@test.net', '+380985461728', '$2b$05$TiBULFCQP8GsYt2DfA6JSO9Ge0dkrs.dlnKn3zvpIrD2cMbWRC1jK', 'Шурина', 'Николаев', 'ул.Васляева, 89 кв.63', 6),
(2, 'galina', 'galinath1985@ukr.net', '+380501425638', '$2b$05$PPZZ1/2pXOyk4m09Z6f90.OWWbEXJBOrKoUB0AV3.mF94Ebhga2Lu', 'Владимирович', 'Чернигов', 'ул.Южная, 14 кв. 58', 12),
(3, 'der', 'erere', '+380985461728', '$2b$05$H2upqYxPTnDHeragIt4boe0Dk1LDY2k/8QHAIljASs2HN3mh7g3R.', NULL, NULL, NULL, NULL),
(5, 'Людмила', 'luda@test.com', '+380985145628', '$2b$05$RklbfmZOoxtbgcC3aT6kHuljkr4Ze3AqxTLyuWVLNb5CEcU0PmvQe', 'Попова', 'Николаев', 'Киев, ул.Владимирская 123, кв. 258', 25),
(6, 'Владимир', 'vladimir@test.net', '+380501425638', '$2b$05$3Khu5zKDJwBM74GOlmmONuESYFs1.sQPrByl0EkqT6m4Y6wNXvt0C', NULL, NULL, NULL, NULL),
(7, 'Петр', 'petr@ukr.net', '+380985461728', '$2b$05$VmK/LLf/GrG0WsU4Sgy5DeFIjkqTZClMS6Af0HJ6IReqevUbS8Jdm', 'Петров', 'Запорожье', 'ул.Южная 25', 13),
(8, 'Светлана', 'sveta@ukr.net', '+380635741258', '$2b$05$HHcztO2FsDnYh8pYcq4H9OW23CHThwNy4wc3igA9.CGV.zAvZxdQW', 'Филонок', 'Николаев', 'ул.Советская, 25', 36),
(9, 'Виталий', 'vitaliy@test.net', '+380675148963', '$2b$05$XeFS7wWvcfMg2LY8aW3j5eOCvgqCeokIo6B2oPE5tgcjTJ2tRWUiG', 'Витальевич', 'Одесса', 'ул.Ломоносова, 456', 63),
(10, 'Татьяна', 'tat@ukr.net', '+380501425638', '$2b$05$njbqUwCkcKQIq2HVvoxA9eE29dnYQPWQHI.wYoW2othY2LufBmAd2', 'Попова', 'Херсон', 'ул.Васляева, 78', 7),
(11, 'Наталья', 'nata@test.com', '+380985461728', '$2b$05$TWhMOoXhv/fcc20Fn6lQBuyVI0MkmmbMn0dtbRRvvRQHZ6p0BTKbC', 'Натальевна', 'Одесса', 'ул.Владимирская 47, кв.14', 58),
(12, 'Борис', 'boris@test.net', '+380985461728', '$2b$05$F0JIXQhBqQ7mGDdhtMD0.ek80CI6omiHwxdNHaoiH8z7D5BBO1/x.', 'Борисович', 'Николаев', 'ул.Южная 25', 63),
(13, 'Алексей', 'ales@ukr.net', '+380985461728', '$2b$05$MXIXueoundyMGDhgBuenxOCT1nekisOQo.Fgfpz09ARHOvvCwZ5jW', NULL, NULL, NULL, NULL),
(14, 'Алекс', 'alex@gmail.com', '+380985461728', '$2b$05$Qu4GB9BInfKrhKPRF5k95.Beke0Qp1OGL625RLkVbK3J3uBvVdgpS', 'Алексеевич', 'Житомир', 'ул.Житомирская, 14', 14),
(15, 'Даниэль', 'dan@test.net', '+380501425638', '$2b$05$KcBBKt5PaSeAHBvhuGCYpuenmI4Pt15YTcJxGexLwPnOaROZ.mCMy', 'Попов', 'Днепр', 'ул.Южная, 25', 78);

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
  ADD KEY `id_payment` (`id_payment`),
  ADD KEY `id_delivery` (`id_delivery`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_order` (`id_order`);

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
  MODIFY `id_cart` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `id_delivery` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_payment`) REFERENCES `payment` (`id_payment`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_delivery`) REFERENCES `deliveries` (`id_delivery`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_prod`),
  ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`);

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
