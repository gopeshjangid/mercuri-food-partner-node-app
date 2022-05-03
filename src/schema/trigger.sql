CREATE DEFINER=`root`@`localhost` TRIGGER `orders_BEFORE_INSERT` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
SET NEW.created_at = NOW();
SET NEW.updated_at = NOW();
SET NEW.order_number = concat('MER', 11 + SYSDATE());
END