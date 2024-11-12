import {
  pgTable,
  serial,
  varchar,
  timestamp,
  json,
  text,
  jsonb,
  boolean,
  index,
  foreignKey,
  numeric,
  integer,
  bigint,
  unique,
  date,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const strapiMigrations = pgTable("strapi_migrations", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  time: timestamp("time", { mode: "string" }),
});

export const strapiDatabaseSchema = pgTable("strapi_database_schema", {
  id: serial("id").primaryKey().notNull(),
  schema: json("schema"),
  time: timestamp("time", { mode: "string" }),
  hash: varchar("hash", { length: 255 }),
});

export const strapiCoreStoreSettings = pgTable("strapi_core_store_settings", {
  id: serial("id").primaryKey().notNull(),
  key: varchar("key", { length: 255 }),
  value: text("value"),
  type: varchar("type", { length: 255 }),
  environment: varchar("environment", { length: 255 }),
  tag: varchar("tag", { length: 255 }),
});

export const strapiWebhooks = pgTable("strapi_webhooks", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  url: text("url"),
  headers: jsonb("headers"),
  events: jsonb("events"),
  enabled: boolean("enabled"),
});

export const purchasableMemberships = pgTable(
  "purchasable_memberships",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }),
    expiry: timestamp("expiry", { precision: 6, mode: "string" }),
    price: numeric("price", { precision: 10, scale: 2 }),
    stripeLink: varchar("stripe_link", { length: 255 }),
    description: text("description"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("purchasable_memberships_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("purchasable_memberships_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey().notNull(),
    firstname: varchar("firstname", { length: 255 }),
    lastname: varchar("lastname", { length: 255 }),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }),
    password: varchar("password", { length: 255 }),
    resetPasswordToken: varchar("reset_password_token", { length: 255 }),
    registrationToken: varchar("registration_token", { length: 255 }),
    isActive: boolean("is_active"),
    blocked: boolean("blocked"),
    preferedLanguage: varchar("prefered_language", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id"),
    updatedById: integer("updated_by_id"),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_users_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("admin_users_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
      adminUsersCreatedByIdFk: foreignKey({
        columns: [table.createdById],
        foreignColumns: [table.id],
        name: "admin_users_created_by_id_fk",
      }).onDelete("set null"),
      adminUsersUpdatedByIdFk: foreignKey({
        columns: [table.updatedById],
        foreignColumns: [table.id],
        name: "admin_users_updated_by_id_fk",
      }).onDelete("set null"),
    };
  }
);

export const adminPermissions = pgTable(
  "admin_permissions",
  {
    id: serial("id").primaryKey().notNull(),
    action: varchar("action", { length: 255 }),
    actionParameters: jsonb("action_parameters"),
    subject: varchar("subject", { length: 255 }),
    properties: jsonb("properties"),
    conditions: jsonb("conditions"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_permissions_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("admin_permissions_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const adminRoles = pgTable(
  "admin_roles",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    code: varchar("code", { length: 255 }),
    description: varchar("description", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("admin_roles_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("admin_roles_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const strapiApiTokens = pgTable(
  "strapi_api_tokens",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    type: varchar("type", { length: 255 }),
    accessKey: varchar("access_key", { length: 255 }),
    lastUsedAt: timestamp("last_used_at", { precision: 6, mode: "string" }),
    expiresAt: timestamp("expires_at", { precision: 6, mode: "string" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    lifespan: bigint("lifespan", { mode: "number" }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("strapi_api_tokens_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("strapi_api_tokens_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const strapiApiTokenPermissions = pgTable(
  "strapi_api_token_permissions",
  {
    id: serial("id").primaryKey().notNull(),
    action: varchar("action", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index(
        "strapi_api_token_permissions_created_by_id_fk"
      ).using("btree", table.createdById),
      updatedByIdFk: index(
        "strapi_api_token_permissions_updated_by_id_fk"
      ).using("btree", table.updatedById),
    };
  }
);

export const strapiTransferTokens = pgTable(
  "strapi_transfer_tokens",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    accessKey: varchar("access_key", { length: 255 }),
    lastUsedAt: timestamp("last_used_at", { precision: 6, mode: "string" }),
    expiresAt: timestamp("expires_at", { precision: 6, mode: "string" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    lifespan: bigint("lifespan", { mode: "number" }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("strapi_transfer_tokens_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("strapi_transfer_tokens_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const strapiTransferTokenPermissions = pgTable(
  "strapi_transfer_token_permissions",
  {
    id: serial("id").primaryKey().notNull(),
    action: varchar("action", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index(
        "strapi_transfer_token_permissions_created_by_id_fk"
      ).using("btree", table.createdById),
      updatedByIdFk: index(
        "strapi_transfer_token_permissions_updated_by_id_fk"
      ).using("btree", table.updatedById),
    };
  }
);

export const files = pgTable(
  "files",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    alternativeText: varchar("alternative_text", { length: 255 }),
    caption: varchar("caption", { length: 255 }),
    width: integer("width"),
    height: integer("height"),
    formats: jsonb("formats"),
    hash: varchar("hash", { length: 255 }),
    ext: varchar("ext", { length: 255 }),
    mime: varchar("mime", { length: 255 }),
    size: numeric("size", { precision: 10, scale: 2 }),
    url: varchar("url", { length: 255 }),
    previewUrl: varchar("preview_url", { length: 255 }),
    provider: varchar("provider", { length: 255 }),
    providerMetadata: jsonb("provider_metadata"),
    folderPath: varchar("folder_path", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("files_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("files_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
      uploadFilesCreatedAtIdx: index("upload_files_created_at_index").using(
        "btree",
        table.createdAt
      ),
      uploadFilesExtIdx: index("upload_files_ext_index").using(
        "btree",
        table.ext
      ),
      uploadFilesFolderPathIdx: index("upload_files_folder_path_index").using(
        "btree",
        table.folderPath
      ),
      uploadFilesNameIdx: index("upload_files_name_index").using(
        "btree",
        table.name
      ),
      uploadFilesSizeIdx: index("upload_files_size_index").using(
        "btree",
        table.size
      ),
      uploadFilesUpdatedAtIdx: index("upload_files_updated_at_index").using(
        "btree",
        table.updatedAt
      ),
    };
  }
);

export const uploadFolders = pgTable(
  "upload_folders",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    pathId: integer("path_id"),
    path: varchar("path", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("upload_folders_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("upload_folders_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
      uploadFoldersPathIdIndex: unique("upload_folders_path_id_index").on(
        table.pathId
      ),
      uploadFoldersPathIndex: unique("upload_folders_path_index").on(
        table.path
      ),
    };
  }
);

export const strapiReleases = pgTable(
  "strapi_releases",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    releasedAt: timestamp("released_at", { precision: 6, mode: "string" }),
    scheduledAt: timestamp("scheduled_at", { precision: 6, mode: "string" }),
    timezone: varchar("timezone", { length: 255 }),
    status: varchar("status", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("strapi_releases_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("strapi_releases_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const strapiReleaseActions = pgTable(
  "strapi_release_actions",
  {
    id: serial("id").primaryKey().notNull(),
    type: varchar("type", { length: 255 }),
    targetId: integer("target_id"),
    targetType: varchar("target_type", { length: 255 }),
    contentType: varchar("content_type", { length: 255 }),
    locale: varchar("locale", { length: 255 }),
    isEntryValid: boolean("is_entry_valid"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("strapi_release_actions_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("strapi_release_actions_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const i18NLocale = pgTable(
  "i18n_locale",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    code: varchar("code", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("i18n_locale_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("i18n_locale_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const upPermissions = pgTable(
  "up_permissions",
  {
    id: serial("id").primaryKey().notNull(),
    action: varchar("action", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("up_permissions_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("up_permissions_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const upRoles = pgTable(
  "up_roles",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    type: varchar("type", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("up_roles_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("up_roles_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const upUsers = pgTable(
  "up_users",
  {
    id: serial("id").primaryKey().notNull(),
    username: varchar("username", { length: 255 }),
    email: varchar("email", { length: 255 }),
    provider: varchar("provider", { length: 255 }),
    password: varchar("password", { length: 255 }),
    resetPasswordToken: varchar("reset_password_token", { length: 255 }),
    confirmationToken: varchar("confirmation_token", { length: 255 }),
    confirmed: boolean("confirmed"),
    blocked: boolean("blocked"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("up_users_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("up_users_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const answers = pgTable(
  "answers",
  {
    id: serial("id").primaryKey().notNull(),
    answer: text("answer"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("answers_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("answers_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }),
    description: text("description"),
    subtitle: varchar("subtitle", { length: 255 }),
    location: varchar("location", { length: 255 }),
    locationLink: varchar("location_link", { length: 255 }),
    eventDateStart: timestamp("event_date_start", {
      precision: 6,
      mode: "string",
    }),
    eventDateEnd: timestamp("event_date_end", { precision: 6, mode: "string" }),
    eventCapacity: integer("event_capacity"),
    isLive: boolean("is_live"),
    termsAndConditions: text("terms_and_conditions"),
    eventCapacityRemaining: integer("event_capacity_remaining"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("events_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("events_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const eventGalleries = pgTable(
  "event_galleries",
  {
    id: serial("id").primaryKey().notNull(),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("event_galleries_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("event_galleries_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const execs = pgTable(
  "execs",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    description: text("description"),
    position: varchar("position", { length: 255 }),
    role: varchar("role", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("execs_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("execs_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const introductions = pgTable(
  "introductions",
  {
    id: serial("id").primaryKey().notNull(),
    description: text("description"),
    events: varchar("events", { length: 255 }),
    members: varchar("members", { length: 255 }),
    followers: varchar("followers", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("introductions_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("introductions_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const partners = pgTable(
  "partners",
  {
    id: serial("id").primaryKey().notNull(),
    type: varchar("type", { length: 255 }),
    name: varchar("name", { length: 255 }),
    location: text("location"),
    description: text("description"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("partners_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("partners_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const peoples = pgTable(
  "peoples",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    universityId: varchar("university_id", { length: 255 }),
    upi: varchar("upi", { length: 255 }),
    yearOfStudy: varchar("year_of_study", { length: 255 }),
    studyField: varchar("study_field", { length: 255 }),
    isMember: boolean("is_member"),
    status: varchar("status", { length: 255 }),
    memberExpiryDate: date("member_expiry_date"),
    institution: varchar("institution", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("peoples_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("peoples_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const previousTeams = pgTable(
  "previous_teams",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    role: varchar("role", { length: 255 }),
    year: varchar("year", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("previous_teams_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("previous_teams_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const questions = pgTable(
  "questions",
  {
    id: serial("id").primaryKey().notNull(),
    question: varchar("question", { length: 255 }),
    checkForMemberEmail: boolean("check_for_member_email"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("questions_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("questions_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const socials = pgTable(
  "socials",
  {
    id: serial("id").primaryKey().notNull(),
    type: varchar("type", { length: 255 }),
    link: varchar("link", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("socials_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("socials_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const somePhotos = pgTable(
  "some_photos",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }),
    year: varchar("year", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("some_photos_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("some_photos_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const userTickets = pgTable(
  "user_tickets",
  {
    id: serial("id").primaryKey().notNull(),
    peopleTicketCode: integer("people_ticket_code"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("user_tickets_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("user_tickets_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const values = pgTable(
  "values",
  {
    id: serial("id").primaryKey().notNull(),
    title: varchar("title", { length: 255 }),
    description: text("description"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => {
    return {
      createdByIdFk: index("values_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("values_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);

export const adminPermissionsRoleLinks = pgTable(
  "admin_permissions_role_links",
  {
    id: serial("id").primaryKey().notNull(),
    permissionId: integer("permission_id").references(
      () => adminPermissions.id,
      { onDelete: "cascade" }
    ),
    roleId: integer("role_id").references(() => adminRoles.id, {
      onDelete: "cascade",
    }),
    permissionOrder: doublePrecision("permission_order"),
  },
  (table) => {
    return {
      fk: index("admin_permissions_role_links_fk").using(
        "btree",
        table.permissionId
      ),
      invFk: index("admin_permissions_role_links_inv_fk").using(
        "btree",
        table.roleId
      ),
      orderInvFk: index("admin_permissions_role_links_order_inv_fk").using(
        "btree",
        table.permissionOrder
      ),
      adminPermissionsRoleLinksUnique: unique(
        "admin_permissions_role_links_unique"
      ).on(table.permissionId, table.roleId),
    };
  }
);

export const adminUsersRolesLinks = pgTable(
  "admin_users_roles_links",
  {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => adminUsers.id, {
      onDelete: "cascade",
    }),
    roleId: integer("role_id").references(() => adminRoles.id, {
      onDelete: "cascade",
    }),
    roleOrder: doublePrecision("role_order"),
    userOrder: doublePrecision("user_order"),
  },
  (table) => {
    return {
      fk: index("admin_users_roles_links_fk").using("btree", table.userId),
      invFk: index("admin_users_roles_links_inv_fk").using(
        "btree",
        table.roleId
      ),
      orderFk: index("admin_users_roles_links_order_fk").using(
        "btree",
        table.roleOrder
      ),
      orderInvFk: index("admin_users_roles_links_order_inv_fk").using(
        "btree",
        table.userOrder
      ),
      adminUsersRolesLinksUnique: unique("admin_users_roles_links_unique").on(
        table.userId,
        table.roleId
      ),
    };
  }
);

export const strapiApiTokenPermissionsTokenLinks = pgTable(
  "strapi_api_token_permissions_token_links",
  {
    id: serial("id").primaryKey().notNull(),
    apiTokenPermissionId: integer("api_token_permission_id").references(
      () => strapiApiTokenPermissions.id,
      { onDelete: "cascade" }
    ),
    apiTokenId: integer("api_token_id").references(() => strapiApiTokens.id, {
      onDelete: "cascade",
    }),
    apiTokenPermissionOrder: doublePrecision("api_token_permission_order"),
  },
  (table) => {
    return {
      fk: index("strapi_api_token_permissions_token_links_fk").using(
        "btree",
        table.apiTokenPermissionId
      ),
      invFk: index("strapi_api_token_permissions_token_links_inv_fk").using(
        "btree",
        table.apiTokenId
      ),
      orderInvFk: index(
        "strapi_api_token_permissions_token_links_order_inv_fk"
      ).using("btree", table.apiTokenPermissionOrder),
      strapiApiTokenPermissionsTokenLinksUnique: unique(
        "strapi_api_token_permissions_token_links_unique"
      ).on(table.apiTokenPermissionId, table.apiTokenId),
    };
  }
);

export const strapiTransferTokenPermissionsTokenLinks = pgTable(
  "strapi_transfer_token_permissions_token_links",
  {
    id: serial("id").primaryKey().notNull(),
    transferTokenPermissionId: integer(
      "transfer_token_permission_id"
    ).references(() => strapiTransferTokenPermissions.id, {
      onDelete: "cascade",
    }),
    transferTokenId: integer("transfer_token_id").references(
      () => strapiTransferTokens.id,
      { onDelete: "cascade" }
    ),
    transferTokenPermissionOrder: doublePrecision(
      "transfer_token_permission_order"
    ),
  },
  (table) => {
    return {
      fk: index("strapi_transfer_token_permissions_token_links_fk").using(
        "btree",
        table.transferTokenPermissionId
      ),
      invFk: index(
        "strapi_transfer_token_permissions_token_links_inv_fk"
      ).using("btree", table.transferTokenId),
      orderInvFk: index(
        "strapi_transfer_token_permissions_token_links_order_inv_fk"
      ).using("btree", table.transferTokenPermissionOrder),
      strapiTransferTokenPermissionsTokenLinksUnique: unique(
        "strapi_transfer_token_permissions_token_links_unique"
      ).on(table.transferTokenPermissionId, table.transferTokenId),
    };
  }
);

export const filesRelatedMorphs = pgTable(
  "files_related_morphs",
  {
    id: serial("id").primaryKey().notNull(),
    fileId: integer("file_id").references(() => files.id, {
      onDelete: "cascade",
    }),
    relatedId: integer("related_id"),
    relatedType: varchar("related_type", { length: 255 }),
    field: varchar("field", { length: 255 }),
    order: doublePrecision("order"),
  },
  (table) => {
    return {
      fk: index("files_related_morphs_fk").using("btree", table.fileId),
      idColumnIdx: index("files_related_morphs_id_column_index").using(
        "btree",
        table.relatedId
      ),
      orderIdx: index().using("btree", table.order),
    };
  }
);

export const filesFolderLinks = pgTable(
  "files_folder_links",
  {
    id: serial("id").primaryKey().notNull(),
    fileId: integer("file_id").references(() => files.id, {
      onDelete: "cascade",
    }),
    folderId: integer("folder_id").references(() => uploadFolders.id, {
      onDelete: "cascade",
    }),
    fileOrder: doublePrecision("file_order"),
  },
  (table) => {
    return {
      fk: index("files_folder_links_fk").using("btree", table.fileId),
      invFk: index("files_folder_links_inv_fk").using("btree", table.folderId),
      orderInvFk: index("files_folder_links_order_inv_fk").using(
        "btree",
        table.fileOrder
      ),
      filesFolderLinksUnique: unique("files_folder_links_unique").on(
        table.fileId,
        table.folderId
      ),
    };
  }
);

export const uploadFoldersParentLinks = pgTable(
  "upload_folders_parent_links",
  {
    id: serial("id").primaryKey().notNull(),
    folderId: integer("folder_id").references(() => uploadFolders.id, {
      onDelete: "cascade",
    }),
    invFolderId: integer("inv_folder_id").references(() => uploadFolders.id, {
      onDelete: "cascade",
    }),
    folderOrder: doublePrecision("folder_order"),
  },
  (table) => {
    return {
      fk: index("upload_folders_parent_links_fk").using(
        "btree",
        table.folderId
      ),
      invFk: index("upload_folders_parent_links_inv_fk").using(
        "btree",
        table.invFolderId
      ),
      orderInvFk: index("upload_folders_parent_links_order_inv_fk").using(
        "btree",
        table.folderOrder
      ),
      uploadFoldersParentLinksUnique: unique(
        "upload_folders_parent_links_unique"
      ).on(table.folderId, table.invFolderId),
    };
  }
);

export const strapiReleaseActionsReleaseLinks = pgTable(
  "strapi_release_actions_release_links",
  {
    id: serial("id").primaryKey().notNull(),
    releaseActionId: integer("release_action_id").references(
      () => strapiReleaseActions.id,
      { onDelete: "cascade" }
    ),
    releaseId: integer("release_id").references(() => strapiReleases.id, {
      onDelete: "cascade",
    }),
    releaseActionOrder: doublePrecision("release_action_order"),
  },
  (table) => {
    return {
      fk: index("strapi_release_actions_release_links_fk").using(
        "btree",
        table.releaseActionId
      ),
      invFk: index("strapi_release_actions_release_links_inv_fk").using(
        "btree",
        table.releaseId
      ),
      orderInvFk: index(
        "strapi_release_actions_release_links_order_inv_fk"
      ).using("btree", table.releaseActionOrder),
      strapiReleaseActionsReleaseLinksUnique: unique(
        "strapi_release_actions_release_links_unique"
      ).on(table.releaseActionId, table.releaseId),
    };
  }
);

export const upPermissionsRoleLinks = pgTable(
  "up_permissions_role_links",
  {
    id: serial("id").primaryKey().notNull(),
    permissionId: integer("permission_id").references(() => upPermissions.id, {
      onDelete: "cascade",
    }),
    roleId: integer("role_id").references(() => upRoles.id, {
      onDelete: "cascade",
    }),
    permissionOrder: doublePrecision("permission_order"),
  },
  (table) => {
    return {
      fk: index("up_permissions_role_links_fk").using(
        "btree",
        table.permissionId
      ),
      invFk: index("up_permissions_role_links_inv_fk").using(
        "btree",
        table.roleId
      ),
      orderInvFk: index("up_permissions_role_links_order_inv_fk").using(
        "btree",
        table.permissionOrder
      ),
      upPermissionsRoleLinksUnique: unique(
        "up_permissions_role_links_unique"
      ).on(table.permissionId, table.roleId),
    };
  }
);

export const upUsersRoleLinks = pgTable(
  "up_users_role_links",
  {
    id: serial("id").primaryKey().notNull(),
    userId: integer("user_id").references(() => upUsers.id, {
      onDelete: "cascade",
    }),
    roleId: integer("role_id").references(() => upRoles.id, {
      onDelete: "cascade",
    }),
    userOrder: doublePrecision("user_order"),
  },
  (table) => {
    return {
      fk: index("up_users_role_links_fk").using("btree", table.userId),
      invFk: index("up_users_role_links_inv_fk").using("btree", table.roleId),
      orderInvFk: index("up_users_role_links_order_inv_fk").using(
        "btree",
        table.userOrder
      ),
      upUsersRoleLinksUnique: unique("up_users_role_links_unique").on(
        table.userId,
        table.roleId
      ),
    };
  }
);

export const answersPeopleIdLinks = pgTable(
  "answers_people_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    answerId: integer("answer_id").references(() => answers.id, {
      onDelete: "cascade",
    }),
    peopleId: integer("people_id").references(() => peoples.id, {
      onDelete: "cascade",
    }),
    answerOrder: doublePrecision("answer_order"),
  },
  (table) => {
    return {
      fk: index("answers_people_id_links_fk").using("btree", table.answerId),
      invFk: index("answers_people_id_links_inv_fk").using(
        "btree",
        table.peopleId
      ),
      orderInvFk: index("answers_people_id_links_order_inv_fk").using(
        "btree",
        table.answerOrder
      ),
      answersPeopleIdLinksUnique: unique("answers_people_id_links_unique").on(
        table.answerId,
        table.peopleId
      ),
    };
  }
);

export const answersQuestionIdLinks = pgTable(
  "answers_question_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    answerId: integer("answer_id").references(() => answers.id, {
      onDelete: "cascade",
    }),
    questionId: integer("question_id").references(() => questions.id, {
      onDelete: "cascade",
    }),
    answerOrder: doublePrecision("answer_order"),
  },
  (table) => {
    return {
      fk: index("answers_question_id_links_fk").using("btree", table.answerId),
      invFk: index("answers_question_id_links_inv_fk").using(
        "btree",
        table.questionId
      ),
      orderInvFk: index("answers_question_id_links_order_inv_fk").using(
        "btree",
        table.answerOrder
      ),
      answersQuestionIdLinksUnique: unique(
        "answers_question_id_links_unique"
      ).on(table.answerId, table.questionId),
    };
  }
);

export const questionsTicketIdLinks = pgTable(
  "questions_ticket_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    questionId: integer("question_id").references(() => questions.id, {
      onDelete: "cascade",
    }),
    ticketId: integer("ticket_id").references(() => tickets.id, {
      onDelete: "cascade",
    }),
    questionOrder: doublePrecision("question_order"),
  },
  (table) => {
    return {
      fk: index("questions_ticket_id_links_fk").using(
        "btree",
        table.questionId
      ),
      invFk: index("questions_ticket_id_links_inv_fk").using(
        "btree",
        table.ticketId
      ),
      orderInvFk: index("questions_ticket_id_links_order_inv_fk").using(
        "btree",
        table.questionOrder
      ),
      questionsTicketIdLinksUnique: unique(
        "questions_ticket_id_links_unique"
      ).on(table.questionId, table.ticketId),
    };
  }
);

export const ticketsEventIdLinks = pgTable(
  "tickets_event_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    ticketId: integer("ticket_id").references(() => tickets.id, {
      onDelete: "cascade",
    }),
    eventId: integer("event_id").references(() => events.id, {
      onDelete: "cascade",
    }),
    ticketOrder: doublePrecision("ticket_order"),
  },
  (table) => {
    return {
      fk: index("tickets_event_id_links_fk").using("btree", table.ticketId),
      invFk: index("tickets_event_id_links_inv_fk").using(
        "btree",
        table.eventId
      ),
      orderInvFk: index("tickets_event_id_links_order_inv_fk").using(
        "btree",
        table.ticketOrder
      ),
      ticketsEventIdLinksUnique: unique("tickets_event_id_links_unique").on(
        table.ticketId,
        table.eventId
      ),
    };
  }
);

export const userTicketsPeopleIdLinks = pgTable(
  "user_tickets_people_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    userTicketId: integer("user_ticket_id").references(() => userTickets.id, {
      onDelete: "cascade",
    }),
    peopleId: integer("people_id").references(() => peoples.id, {
      onDelete: "cascade",
    }),
    userTicketOrder: doublePrecision("user_ticket_order"),
  },
  (table) => {
    return {
      fk: index("user_tickets_people_id_links_fk").using(
        "btree",
        table.userTicketId
      ),
      invFk: index("user_tickets_people_id_links_inv_fk").using(
        "btree",
        table.peopleId
      ),
      orderInvFk: index("user_tickets_people_id_links_order_inv_fk").using(
        "btree",
        table.userTicketOrder
      ),
      userTicketsPeopleIdLinksUnique: unique(
        "user_tickets_people_id_links_unique"
      ).on(table.userTicketId, table.peopleId),
    };
  }
);

export const userTicketsTicketIdLinks = pgTable(
  "user_tickets_ticket_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    userTicketId: integer("user_ticket_id").references(() => userTickets.id, {
      onDelete: "cascade",
    }),
    ticketId: integer("ticket_id").references(() => tickets.id, {
      onDelete: "cascade",
    }),
    userTicketOrder: doublePrecision("user_ticket_order"),
  },
  (table) => {
    return {
      fk: index("user_tickets_ticket_id_links_fk").using(
        "btree",
        table.userTicketId
      ),
      invFk: index("user_tickets_ticket_id_links_inv_fk").using(
        "btree",
        table.ticketId
      ),
      orderInvFk: index("user_tickets_ticket_id_links_order_inv_fk").using(
        "btree",
        table.userTicketOrder
      ),
      userTicketsTicketIdLinksUnique: unique(
        "user_tickets_ticket_id_links_unique"
      ).on(table.userTicketId, table.ticketId),
    };
  }
);

export const tickets = pgTable(
  "tickets",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    discountCode: varchar("discount_code", { length: 255 }),
    discountPrice: numeric("discount_price", { precision: 10, scale: 2 }),
    price: numeric("price", { precision: 10, scale: 2 }),
    isMemberOnly: boolean("is_member_only"),
    isDouble: boolean("is_double"),
    maxNumberTickets: integer("max_number_tickets"),
    numberTicketsLeft: integer("number_tickets_left"),
    ticketDescription: text("ticket_description"),
    startDateTicketSales: timestamp("start_date_ticket_sales", {
      precision: 6,
      mode: "string",
    }),
    isTicketLive: boolean("is_ticket_live"),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    ticketLinkBypass: boolean("ticket_link_bypass"),
    bypassTicketLink: varchar("bypass_ticket_link", { length: 255 }),
  },
  (table) => {
    return {
      createdByIdFk: index("tickets_created_by_id_fk").using(
        "btree",
        table.createdById
      ),
      updatedByIdFk: index("tickets_updated_by_id_fk").using(
        "btree",
        table.updatedById
      ),
    };
  }
);
