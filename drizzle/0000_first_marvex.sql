CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`completed` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
