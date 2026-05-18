PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`seller_id` text NOT NULL,
	`product_id` integer NOT NULL,
	`customer_cpf` text(11) NOT NULL,
	`amount` real NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_sales`("id", "seller_id", "product_id", "customer_cpf", "amount", "created_at") SELECT "id", "seller_id", "product_id", "customer_cpf", "amount", "created_at" FROM `sales`;--> statement-breakpoint
DROP TABLE `sales`;--> statement-breakpoint
ALTER TABLE `__new_sales` RENAME TO `sales`;--> statement-breakpoint
PRAGMA foreign_keys=ON;