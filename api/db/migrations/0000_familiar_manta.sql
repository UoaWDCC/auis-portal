CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"year_of_study" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
