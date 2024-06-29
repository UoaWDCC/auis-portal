import { pgTable, serial, varchar, timestamp, json, text, jsonb, boolean, index, foreignKey, integer, bigint, numeric, unique, date, doublePrecision } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const strapi_migrations = pgTable("strapi_migrations", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	time: timestamp("time", { mode: 'string' }),
});

export const strapi_database_schema = pgTable("strapi_database_schema", {
	id: serial("id").primaryKey().notNull(),
	schema: json("schema"),
	time: timestamp("time", { mode: 'string' }),
	hash: varchar("hash", { length: 255 }),
});

export const strapi_core_store_settings = pgTable("strapi_core_store_settings", {
	id: serial("id").primaryKey().notNull(),
	key: varchar("key", { length: 255 }),
	value: text("value"),
	type: varchar("type", { length: 255 }),
	environment: varchar("environment", { length: 255 }),
	tag: varchar("tag", { length: 255 }),
});

export const strapi_webhooks = pgTable("strapi_webhooks", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	url: text("url"),
	headers: jsonb("headers"),
	events: jsonb("events"),
	enabled: boolean("enabled"),
});

export const admin_users = pgTable("admin_users", {
	id: serial("id").primaryKey().notNull(),
	firstname: varchar("firstname", { length: 255 }),
	lastname: varchar("lastname", { length: 255 }),
	username: varchar("username", { length: 255 }),
	email: varchar("email", { length: 255 }),
	password: varchar("password", { length: 255 }),
	reset_password_token: varchar("reset_password_token", { length: 255 }),
	registration_token: varchar("registration_token", { length: 255 }),
	is_active: boolean("is_active"),
	blocked: boolean("blocked"),
	prefered_language: varchar("prefered_language", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id"),
	updated_by_id: integer("updated_by_id"),
},
(table) => {
	return {
		created_by_id_fk: index("admin_users_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("admin_users_updated_by_id_fk").using("btree", table.updated_by_id),
		admin_users_created_by_id_fk: foreignKey({
			columns: [table.created_by_id],
			foreignColumns: [table.id],
			name: "admin_users_created_by_id_fk"
		}).onDelete("set null"),
		admin_users_updated_by_id_fk: foreignKey({
			columns: [table.updated_by_id],
			foreignColumns: [table.id],
			name: "admin_users_updated_by_id_fk"
		}).onDelete("set null"),
	}
});

export const admin_permissions = pgTable("admin_permissions", {
	id: serial("id").primaryKey().notNull(),
	action: varchar("action", { length: 255 }),
	action_parameters: jsonb("action_parameters"),
	subject: varchar("subject", { length: 255 }),
	properties: jsonb("properties"),
	conditions: jsonb("conditions"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("admin_permissions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("admin_permissions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const admin_roles = pgTable("admin_roles", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	code: varchar("code", { length: 255 }),
	description: varchar("description", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("admin_roles_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("admin_roles_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const strapi_api_tokens = pgTable("strapi_api_tokens", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	type: varchar("type", { length: 255 }),
	access_key: varchar("access_key", { length: 255 }),
	last_used_at: timestamp("last_used_at", { precision: 6, mode: 'string' }),
	expires_at: timestamp("expires_at", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lifespan: bigint("lifespan", { mode: "number" }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_api_tokens_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_api_tokens_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const strapi_api_token_permissions = pgTable("strapi_api_token_permissions", {
	id: serial("id").primaryKey().notNull(),
	action: varchar("action", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_api_token_permissions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_api_token_permissions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const strapi_transfer_tokens = pgTable("strapi_transfer_tokens", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	access_key: varchar("access_key", { length: 255 }),
	last_used_at: timestamp("last_used_at", { precision: 6, mode: 'string' }),
	expires_at: timestamp("expires_at", { precision: 6, mode: 'string' }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	lifespan: bigint("lifespan", { mode: "number" }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_transfer_tokens_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_transfer_tokens_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const strapi_transfer_token_permissions = pgTable("strapi_transfer_token_permissions", {
	id: serial("id").primaryKey().notNull(),
	action: varchar("action", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_transfer_token_permissions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_transfer_token_permissions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const files = pgTable("files", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	alternative_text: varchar("alternative_text", { length: 255 }),
	caption: varchar("caption", { length: 255 }),
	width: integer("width"),
	height: integer("height"),
	formats: jsonb("formats"),
	hash: varchar("hash", { length: 255 }),
	ext: varchar("ext", { length: 255 }),
	mime: varchar("mime", { length: 255 }),
	size: numeric("size", { precision: 10, scale:  2 }),
	url: varchar("url", { length: 255 }),
	preview_url: varchar("preview_url", { length: 255 }),
	provider: varchar("provider", { length: 255 }),
	provider_metadata: jsonb("provider_metadata"),
	folder_path: varchar("folder_path", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("files_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("files_updated_by_id_fk").using("btree", table.updated_by_id),
		upload_files_created_at_idx: index("upload_files_created_at_index").using("btree", table.created_at),
		upload_files_ext_idx: index("upload_files_ext_index").using("btree", table.ext),
		upload_files_folder_path_idx: index("upload_files_folder_path_index").using("btree", table.folder_path),
		upload_files_name_idx: index("upload_files_name_index").using("btree", table.name),
		upload_files_size_idx: index("upload_files_size_index").using("btree", table.size),
		upload_files_updated_at_idx: index("upload_files_updated_at_index").using("btree", table.updated_at),
	}
});

export const upload_folders = pgTable("upload_folders", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	path_id: integer("path_id"),
	path: varchar("path", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("upload_folders_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("upload_folders_updated_by_id_fk").using("btree", table.updated_by_id),
		upload_folders_path_id_index: unique("upload_folders_path_id_index").on(table.path_id),
		upload_folders_path_index: unique("upload_folders_path_index").on(table.path),
	}
});

export const strapi_releases = pgTable("strapi_releases", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	released_at: timestamp("released_at", { precision: 6, mode: 'string' }),
	scheduled_at: timestamp("scheduled_at", { precision: 6, mode: 'string' }),
	timezone: varchar("timezone", { length: 255 }),
	status: varchar("status", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_releases_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_releases_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const strapi_release_actions = pgTable("strapi_release_actions", {
	id: serial("id").primaryKey().notNull(),
	type: varchar("type", { length: 255 }),
	target_id: integer("target_id"),
	target_type: varchar("target_type", { length: 255 }),
	content_type: varchar("content_type", { length: 255 }),
	locale: varchar("locale", { length: 255 }),
	is_entry_valid: boolean("is_entry_valid"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("strapi_release_actions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("strapi_release_actions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const i18n_locale = pgTable("i18n_locale", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	code: varchar("code", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("i18n_locale_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("i18n_locale_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const up_permissions = pgTable("up_permissions", {
	id: serial("id").primaryKey().notNull(),
	action: varchar("action", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("up_permissions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("up_permissions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const up_roles = pgTable("up_roles", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	type: varchar("type", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("up_roles_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("up_roles_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const up_users = pgTable("up_users", {
	id: serial("id").primaryKey().notNull(),
	username: varchar("username", { length: 255 }),
	email: varchar("email", { length: 255 }),
	provider: varchar("provider", { length: 255 }),
	password: varchar("password", { length: 255 }),
	reset_password_token: varchar("reset_password_token", { length: 255 }),
	confirmation_token: varchar("confirmation_token", { length: 255 }),
	confirmed: boolean("confirmed"),
	blocked: boolean("blocked"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("up_users_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("up_users_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const answers = pgTable("answers", {
	id: serial("id").primaryKey().notNull(),
	answer: text("answer"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("answers_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("answers_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const events = pgTable("events", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	subtitle: varchar("subtitle", { length: 255 }),
	location: varchar("location", { length: 255 }),
	location_link: varchar("location_link", { length: 255 }),
	event_date_start: timestamp("event_date_start", { precision: 6, mode: 'string' }),
	event_date_end: timestamp("event_date_end", { precision: 6, mode: 'string' }),
	event_capacity: integer("event_capacity"),
	is_live: boolean("is_live"),
	terms_and_conditions: text("terms_and_conditions"),
	event_capacity_remaining: integer("event_capacity_remaining"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("events_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("events_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const event_galleries = pgTable("event_galleries", {
	id: serial("id").primaryKey().notNull(),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("event_galleries_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("event_galleries_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const execs = pgTable("execs", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	description: text("description"),
	position: varchar("position", { length: 255 }),
	role: varchar("role", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("execs_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("execs_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const introductions = pgTable("introductions", {
	id: serial("id").primaryKey().notNull(),
	description: text("description"),
	events: varchar("events", { length: 255 }),
	members: varchar("members", { length: 255 }),
	followers: varchar("followers", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("introductions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("introductions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const partners = pgTable("partners", {
	id: serial("id").primaryKey().notNull(),
	type: varchar("type", { length: 255 }),
	name: varchar("name", { length: 255 }),
	location: text("location"),
	description: text("description"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("partners_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("partners_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const peoples = pgTable("peoples", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	university_id: varchar("university_id", { length: 255 }),
	upi: varchar("upi", { length: 255 }),
	year_of_study: varchar("year_of_study", { length: 255 }),
	study_field: varchar("study_field", { length: 255 }),
	is_member: boolean("is_member"),
	status: varchar("status", { length: 255 }),
	member_expiry_date: date("member_expiry_date"),
	institution: varchar("institution", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("peoples_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("peoples_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const previous_teams = pgTable("previous_teams", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	role: varchar("role", { length: 255 }),
	year: varchar("year", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("previous_teams_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("previous_teams_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const questions = pgTable("questions", {
	id: serial("id").primaryKey().notNull(),
	question: varchar("question", { length: 255 }),
	check_for_member_email: boolean("check_for_member_email"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("questions_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("questions_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const socials = pgTable("socials", {
	id: serial("id").primaryKey().notNull(),
	type: varchar("type", { length: 255 }),
	link: varchar("link", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("socials_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("socials_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const some_photos = pgTable("some_photos", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }),
	year: varchar("year", { length: 255 }),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("some_photos_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("some_photos_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const tickets = pgTable("tickets", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	discount_code: varchar("discount_code", { length: 255 }),
	discount_price: numeric("discount_price", { precision: 10, scale:  2 }),
	price: numeric("price", { precision: 10, scale:  2 }),
	is_member_only: boolean("is_member_only"),
	is_double: boolean("is_double"),
	max_number_tickets: integer("max_number_tickets"),
	number_tickets_left: integer("number_tickets_left"),
	ticket_description: text("ticket_description"),
	start_date_ticket_sales: timestamp("start_date_ticket_sales", { precision: 6, mode: 'string' }),
	is_ticket_live: boolean("is_ticket_live"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("tickets_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("tickets_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const user_tickets = pgTable("user_tickets", {
	id: serial("id").primaryKey().notNull(),
	people_ticket_code: integer("people_ticket_code"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("user_tickets_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("user_tickets_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const values = pgTable("values", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	created_at: timestamp("created_at", { precision: 6, mode: 'string' }),
	updated_at: timestamp("updated_at", { precision: 6, mode: 'string' }),
	published_at: timestamp("published_at", { precision: 6, mode: 'string' }),
	created_by_id: integer("created_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
	updated_by_id: integer("updated_by_id").references(() => admin_users.id, { onDelete: "set null" } ),
},
(table) => {
	return {
		created_by_id_fk: index("values_created_by_id_fk").using("btree", table.created_by_id),
		updated_by_id_fk: index("values_updated_by_id_fk").using("btree", table.updated_by_id),
	}
});

export const admin_permissions_role_links = pgTable("admin_permissions_role_links", {
	id: serial("id").primaryKey().notNull(),
	permission_id: integer("permission_id").references(() => admin_permissions.id, { onDelete: "cascade" } ),
	role_id: integer("role_id").references(() => admin_roles.id, { onDelete: "cascade" } ),
	permission_order: doublePrecision("permission_order"),
},
(table) => {
	return {
		fk: index("admin_permissions_role_links_fk").using("btree", table.permission_id),
		inv_fk: index("admin_permissions_role_links_inv_fk").using("btree", table.role_id),
		order_inv_fk: index("admin_permissions_role_links_order_inv_fk").using("btree", table.permission_order),
		admin_permissions_role_links_unique: unique("admin_permissions_role_links_unique").on(table.permission_id, table.role_id),
	}
});

export const admin_users_roles_links = pgTable("admin_users_roles_links", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => admin_users.id, { onDelete: "cascade" } ),
	role_id: integer("role_id").references(() => admin_roles.id, { onDelete: "cascade" } ),
	role_order: doublePrecision("role_order"),
	user_order: doublePrecision("user_order"),
},
(table) => {
	return {
		fk: index("admin_users_roles_links_fk").using("btree", table.user_id),
		inv_fk: index("admin_users_roles_links_inv_fk").using("btree", table.role_id),
		order_fk: index("admin_users_roles_links_order_fk").using("btree", table.role_order),
		order_inv_fk: index("admin_users_roles_links_order_inv_fk").using("btree", table.user_order),
		admin_users_roles_links_unique: unique("admin_users_roles_links_unique").on(table.user_id, table.role_id),
	}
});

export const strapi_api_token_permissions_token_links = pgTable("strapi_api_token_permissions_token_links", {
	id: serial("id").primaryKey().notNull(),
	api_token_permission_id: integer("api_token_permission_id").references(() => strapi_api_token_permissions.id, { onDelete: "cascade" } ),
	api_token_id: integer("api_token_id").references(() => strapi_api_tokens.id, { onDelete: "cascade" } ),
	api_token_permission_order: doublePrecision("api_token_permission_order"),
},
(table) => {
	return {
		fk: index("strapi_api_token_permissions_token_links_fk").using("btree", table.api_token_permission_id),
		inv_fk: index("strapi_api_token_permissions_token_links_inv_fk").using("btree", table.api_token_id),
		order_inv_fk: index("strapi_api_token_permissions_token_links_order_inv_fk").using("btree", table.api_token_permission_order),
		strapi_api_token_permissions_token_links_unique: unique("strapi_api_token_permissions_token_links_unique").on(table.api_token_permission_id, table.api_token_id),
	}
});

export const strapi_transfer_token_permissions_token_links = pgTable("strapi_transfer_token_permissions_token_links", {
	id: serial("id").primaryKey().notNull(),
	transfer_token_permission_id: integer("transfer_token_permission_id").references(() => strapi_transfer_token_permissions.id, { onDelete: "cascade" } ),
	transfer_token_id: integer("transfer_token_id").references(() => strapi_transfer_tokens.id, { onDelete: "cascade" } ),
	transfer_token_permission_order: doublePrecision("transfer_token_permission_order"),
},
(table) => {
	return {
		fk: index("strapi_transfer_token_permissions_token_links_fk").using("btree", table.transfer_token_permission_id),
		inv_fk: index("strapi_transfer_token_permissions_token_links_inv_fk").using("btree", table.transfer_token_id),
		order_inv_fk: index("strapi_transfer_token_permissions_token_links_order_inv_fk").using("btree", table.transfer_token_permission_order),
		strapi_transfer_token_permissions_token_links_unique: unique("strapi_transfer_token_permissions_token_links_unique").on(table.transfer_token_permission_id, table.transfer_token_id),
	}
});

export const files_related_morphs = pgTable("files_related_morphs", {
	id: serial("id").primaryKey().notNull(),
	file_id: integer("file_id").references(() => files.id, { onDelete: "cascade" } ),
	related_id: integer("related_id"),
	related_type: varchar("related_type", { length: 255 }),
	field: varchar("field", { length: 255 }),
	order: doublePrecision("order"),
},
(table) => {
	return {
		fk: index("files_related_morphs_fk").using("btree", table.file_id),
		id_column_idx: index("files_related_morphs_id_column_index").using("btree", table.related_id),
		order_idx: index().using("btree", table.order),
	}
});

export const files_folder_links = pgTable("files_folder_links", {
	id: serial("id").primaryKey().notNull(),
	file_id: integer("file_id").references(() => files.id, { onDelete: "cascade" } ),
	folder_id: integer("folder_id").references(() => upload_folders.id, { onDelete: "cascade" } ),
	file_order: doublePrecision("file_order"),
},
(table) => {
	return {
		fk: index("files_folder_links_fk").using("btree", table.file_id),
		inv_fk: index("files_folder_links_inv_fk").using("btree", table.folder_id),
		order_inv_fk: index("files_folder_links_order_inv_fk").using("btree", table.file_order),
		files_folder_links_unique: unique("files_folder_links_unique").on(table.file_id, table.folder_id),
	}
});

export const upload_folders_parent_links = pgTable("upload_folders_parent_links", {
	id: serial("id").primaryKey().notNull(),
	folder_id: integer("folder_id").references(() => upload_folders.id, { onDelete: "cascade" } ),
	inv_folder_id: integer("inv_folder_id").references(() => upload_folders.id, { onDelete: "cascade" } ),
	folder_order: doublePrecision("folder_order"),
},
(table) => {
	return {
		fk: index("upload_folders_parent_links_fk").using("btree", table.folder_id),
		inv_fk: index("upload_folders_parent_links_inv_fk").using("btree", table.inv_folder_id),
		order_inv_fk: index("upload_folders_parent_links_order_inv_fk").using("btree", table.folder_order),
		upload_folders_parent_links_unique: unique("upload_folders_parent_links_unique").on(table.folder_id, table.inv_folder_id),
	}
});

export const strapi_release_actions_release_links = pgTable("strapi_release_actions_release_links", {
	id: serial("id").primaryKey().notNull(),
	release_action_id: integer("release_action_id").references(() => strapi_release_actions.id, { onDelete: "cascade" } ),
	release_id: integer("release_id").references(() => strapi_releases.id, { onDelete: "cascade" } ),
	release_action_order: doublePrecision("release_action_order"),
},
(table) => {
	return {
		fk: index("strapi_release_actions_release_links_fk").using("btree", table.release_action_id),
		inv_fk: index("strapi_release_actions_release_links_inv_fk").using("btree", table.release_id),
		order_inv_fk: index("strapi_release_actions_release_links_order_inv_fk").using("btree", table.release_action_order),
		strapi_release_actions_release_links_unique: unique("strapi_release_actions_release_links_unique").on(table.release_action_id, table.release_id),
	}
});

export const up_permissions_role_links = pgTable("up_permissions_role_links", {
	id: serial("id").primaryKey().notNull(),
	permission_id: integer("permission_id").references(() => up_permissions.id, { onDelete: "cascade" } ),
	role_id: integer("role_id").references(() => up_roles.id, { onDelete: "cascade" } ),
	permission_order: doublePrecision("permission_order"),
},
(table) => {
	return {
		fk: index("up_permissions_role_links_fk").using("btree", table.permission_id),
		inv_fk: index("up_permissions_role_links_inv_fk").using("btree", table.role_id),
		order_inv_fk: index("up_permissions_role_links_order_inv_fk").using("btree", table.permission_order),
		up_permissions_role_links_unique: unique("up_permissions_role_links_unique").on(table.permission_id, table.role_id),
	}
});

export const up_users_role_links = pgTable("up_users_role_links", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").references(() => up_users.id, { onDelete: "cascade" } ),
	role_id: integer("role_id").references(() => up_roles.id, { onDelete: "cascade" } ),
	user_order: doublePrecision("user_order"),
},
(table) => {
	return {
		fk: index("up_users_role_links_fk").using("btree", table.user_id),
		inv_fk: index("up_users_role_links_inv_fk").using("btree", table.role_id),
		order_inv_fk: index("up_users_role_links_order_inv_fk").using("btree", table.user_order),
		up_users_role_links_unique: unique("up_users_role_links_unique").on(table.user_id, table.role_id),
	}
});

export const answers_people_id_links = pgTable("answers_people_id_links", {
	id: serial("id").primaryKey().notNull(),
	answer_id: integer("answer_id").references(() => answers.id, { onDelete: "cascade" } ),
	people_id: integer("people_id").references(() => peoples.id, { onDelete: "cascade" } ),
	answer_order: doublePrecision("answer_order"),
},
(table) => {
	return {
		fk: index("answers_people_id_links_fk").using("btree", table.answer_id),
		inv_fk: index("answers_people_id_links_inv_fk").using("btree", table.people_id),
		order_inv_fk: index("answers_people_id_links_order_inv_fk").using("btree", table.answer_order),
		answers_people_id_links_unique: unique("answers_people_id_links_unique").on(table.answer_id, table.people_id),
	}
});

export const answers_question_id_links = pgTable("answers_question_id_links", {
	id: serial("id").primaryKey().notNull(),
	answer_id: integer("answer_id").references(() => answers.id, { onDelete: "cascade" } ),
	question_id: integer("question_id").references(() => questions.id, { onDelete: "cascade" } ),
	answer_order: doublePrecision("answer_order"),
},
(table) => {
	return {
		fk: index("answers_question_id_links_fk").using("btree", table.answer_id),
		inv_fk: index("answers_question_id_links_inv_fk").using("btree", table.question_id),
		order_inv_fk: index("answers_question_id_links_order_inv_fk").using("btree", table.answer_order),
		answers_question_id_links_unique: unique("answers_question_id_links_unique").on(table.answer_id, table.question_id),
	}
});

export const questions_ticket_id_links = pgTable("questions_ticket_id_links", {
	id: serial("id").primaryKey().notNull(),
	question_id: integer("question_id").references(() => questions.id, { onDelete: "cascade" } ),
	ticket_id: integer("ticket_id").references(() => tickets.id, { onDelete: "cascade" } ),
	question_order: doublePrecision("question_order"),
},
(table) => {
	return {
		fk: index("questions_ticket_id_links_fk").using("btree", table.question_id),
		inv_fk: index("questions_ticket_id_links_inv_fk").using("btree", table.ticket_id),
		order_inv_fk: index("questions_ticket_id_links_order_inv_fk").using("btree", table.question_order),
		questions_ticket_id_links_unique: unique("questions_ticket_id_links_unique").on(table.question_id, table.ticket_id),
	}
});

export const tickets_event_id_links = pgTable("tickets_event_id_links", {
	id: serial("id").primaryKey().notNull(),
	ticket_id: integer("ticket_id").references(() => tickets.id, { onDelete: "cascade" } ),
	event_id: integer("event_id").references(() => events.id, { onDelete: "cascade" } ),
	ticket_order: doublePrecision("ticket_order"),
},
(table) => {
	return {
		fk: index("tickets_event_id_links_fk").using("btree", table.ticket_id),
		inv_fk: index("tickets_event_id_links_inv_fk").using("btree", table.event_id),
		order_inv_fk: index("tickets_event_id_links_order_inv_fk").using("btree", table.ticket_order),
		tickets_event_id_links_unique: unique("tickets_event_id_links_unique").on(table.ticket_id, table.event_id),
	}
});

export const user_tickets_people_id_links = pgTable("user_tickets_people_id_links", {
	id: serial("id").primaryKey().notNull(),
	user_ticket_id: integer("user_ticket_id").references(() => user_tickets.id, { onDelete: "cascade" } ),
	people_id: integer("people_id").references(() => peoples.id, { onDelete: "cascade" } ),
	user_ticket_order: doublePrecision("user_ticket_order"),
},
(table) => {
	return {
		fk: index("user_tickets_people_id_links_fk").using("btree", table.user_ticket_id),
		inv_fk: index("user_tickets_people_id_links_inv_fk").using("btree", table.people_id),
		order_inv_fk: index("user_tickets_people_id_links_order_inv_fk").using("btree", table.user_ticket_order),
		user_tickets_people_id_links_unique: unique("user_tickets_people_id_links_unique").on(table.user_ticket_id, table.people_id),
	}
});

export const user_tickets_ticket_id_links = pgTable("user_tickets_ticket_id_links", {
	id: serial("id").primaryKey().notNull(),
	user_ticket_id: integer("user_ticket_id").references(() => user_tickets.id, { onDelete: "cascade" } ),
	ticket_id: integer("ticket_id").references(() => tickets.id, { onDelete: "cascade" } ),
	user_ticket_order: doublePrecision("user_ticket_order"),
},
(table) => {
	return {
		fk: index("user_tickets_ticket_id_links_fk").using("btree", table.user_ticket_id),
		inv_fk: index("user_tickets_ticket_id_links_inv_fk").using("btree", table.ticket_id),
		order_inv_fk: index("user_tickets_ticket_id_links_order_inv_fk").using("btree", table.user_ticket_order),
		user_tickets_ticket_id_links_unique: unique("user_tickets_ticket_id_links_unique").on(table.user_ticket_id, table.ticket_id),
	}
});