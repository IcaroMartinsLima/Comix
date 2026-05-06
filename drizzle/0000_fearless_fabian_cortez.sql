CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`seller_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`customer_cpf` text(11) NOT NULL,
	`amount` real NOT NULL,
	`payment_method` text NOT NULL,
	`status` text DEFAULT 'completed',
	`created_at` integer
);
