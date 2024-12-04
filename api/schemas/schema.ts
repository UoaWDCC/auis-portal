import {
  pgTable,
  index,
  foreignKey,
  serial,
  varchar,
  numeric,
  boolean,
  integer,
  text,
  timestamp,
  bigint,
  unique,
  json,
  jsonb,
  date,
  doublePrecision,
  primaryKey,
  char,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

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
    ticketLinkBypass: boolean("ticket_link_bypass"),
    bypassTicketLink: varchar("bypass_ticket_link", { length: 255 }),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "string" }),
    publishedAt: timestamp("published_at", { precision: 6, mode: "string" }),
    createdById: integer("created_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    updatedById: integer("updated_by_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    stripeLink: varchar("stripe_link", { length: 255 }),
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

export const apps = pgTable("apps", {
  appId: varchar("app_id", { length: 64 })
    .default("public")
    .primaryKey()
    .notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  createdAtTime: bigint("created_at_time", { mode: "number" }),
});

export const oauthSessions = pgTable(
  "oauth_sessions",
  {
    gid: varchar("gid", { length: 255 }).primaryKey().notNull(),
    appId: varchar("app_id", { length: 64 }).default("public"),
    clientId: varchar("client_id", { length: 255 }).notNull(),
    sessionHandle: varchar("session_handle", { length: 128 }),
    externalRefreshToken: varchar("external_refresh_token", { length: 255 }),
    internalRefreshToken: varchar("internal_refresh_token", { length: 255 }),
    jti: text("jti").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    exp: bigint("exp", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      oauthSessionExpIdx: index("oauth_session_exp_index").using(
        "btree",
        table.exp
      ),
      oauthSessionExternalRefreshTokenIdx: index(
        "oauth_session_external_refresh_token_index"
      ).using("btree", table.appId, table.externalRefreshToken),
      oauthSessionsClientIdFkey: foreignKey({
        columns: [table.appId, table.clientId],
        foreignColumns: [oauthClients.appId, oauthClients.clientId],
        name: "oauth_sessions_client_id_fkey",
      }).onDelete("cascade"),
      oauthSessionsExternalRefreshTokenKey: unique(
        "oauth_sessions_external_refresh_token_key"
      ).on(table.externalRefreshToken),
      oauthSessionsInternalRefreshTokenKey: unique(
        "oauth_sessions_internal_refresh_token_key"
      ).on(table.internalRefreshToken),
    };
  }
);

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
    membershipLinkBypass: boolean("membership_link_bypass"),
    bypassMembershipLink: varchar("bypass_membership_link", { length: 255 }),
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
    description: text("description"),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
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
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }),
    phoneNumber: varchar("phone_number", { length: 255 }),
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

// THIS NEEDS TO BE CHANMGED
export const answersUserTicketIdLinks = pgTable(
  "answers_user_ticket_id_links",
  {
    id: serial("id").primaryKey().notNull(),
    answerId: integer("answer_id").references(() => answers.id, {
      onDelete: "cascade",
    }),
    userTicketId: integer("user_ticket_id").references(() => peoples.id, {
      onDelete: "cascade",
    }),
    answerOrder: doublePrecision("answer_order"),
  },
  (table) => {
    return {
      fk: index("answers_user_ticket_id_links_fk").using(
        "btree",
        table.answerId
      ),
      invFk: index("answers_user_ticket_id_links_inv_fk").using(
        "btree",
        table.userTicketId
      ),
      orderInvFk: index("answers_user_ticket_id_links_order_inv_fk").using(
        "btree",
        table.answerOrder
      ),
      answersUserTicketIdLinksUnique: unique(
        "answers_user_ticket_id_links_unique"
      ).on(table.answerId, table.userTicketId),
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
// update this
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

export const roles = pgTable(
  "roles",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    role: varchar("role", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      rolesPkey: primaryKey({
        columns: [table.appId, table.role],
        name: "roles_pkey",
      }),
    };
  }
);

export const totpUsers = pgTable(
  "totp_users",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      totpUsersPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "totp_users_pkey",
      }),
    };
  }
);

export const tenants = pgTable(
  "tenants",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAtTime: bigint("created_at_time", { mode: "number" }),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      tenantsPkey: primaryKey({
        columns: [table.appId, table.tenantId],
        name: "tenants_pkey",
      }),
    };
  }
);

export const sessionAccessTokenSigningKeys = pgTable(
  "session_access_token_signing_keys",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAtTime: bigint("created_at_time", { mode: "number" }).notNull(),
    value: text("value"),
  },
  (table) => {
    return {
      accessTokenSigningKeysAppIdIdx: index(
        "access_token_signing_keys_app_id_index"
      ).using("btree", table.appId),
      sessionAccessTokenSigningKeysPkey: primaryKey({
        columns: [table.appId, table.createdAtTime],
        name: "session_access_token_signing_keys_pkey",
      }),
    };
  }
);

export const userLastActive = pgTable(
  "user_last_active",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 128 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    lastActiveTime: bigint("last_active_time", { mode: "number" }),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      lastActiveTimeIdx: index("user_last_active_last_active_time_index").using(
        "btree",
        table.lastActiveTime,
        table.appId
      ),
      userLastActivePkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "user_last_active_pkey",
      }),
    };
  }
);

export const emailverificationVerifiedEmails = pgTable(
  "emailverification_verified_emails",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 128 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      emailverificationVerifiedEmailsPkey: primaryKey({
        columns: [table.appId, table.userId, table.email],
        name: "emailverification_verified_emails_pkey",
      }),
    };
  }
);

export const userMetadata = pgTable(
  "user_metadata",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 128 }).notNull(),
    userMetadata: text("user_metadata").notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      userMetadataPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "user_metadata_pkey",
      }),
    };
  }
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    role: varchar("role", { length: 255 }).notNull(),
    permission: varchar("permission", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      permissionIdx: index("role_permissions_permission_index").using(
        "btree",
        table.appId,
        table.permission
      ),
      roleIdx: index("role_permissions_role_index").using(
        "btree",
        table.appId,
        table.role
      ),
      rolePermissionsRoleFkey: foreignKey({
        columns: [table.appId, table.role],
        foreignColumns: [roles.appId, roles.role],
        name: "role_permissions_role_fkey",
      }).onDelete("cascade"),
      rolePermissionsPkey: primaryKey({
        columns: [table.appId, table.role, table.permission],
        name: "role_permissions_pkey",
      }),
    };
  }
);

export const tenantFirstFactors = pgTable(
  "tenant_first_factors",
  {
    connectionUriDomain: varchar("connection_uri_domain", { length: 256 })
      .default("")
      .notNull(),
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    factorId: varchar("factor_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      tenantIdIdx: index("tenant_first_factors_tenant_id_index").using(
        "btree",
        table.connectionUriDomain,
        table.appId,
        table.tenantId
      ),
      tenantFirstFactorsTenantIdFkey: foreignKey({
        columns: [table.connectionUriDomain, table.appId, table.tenantId],
        foreignColumns: [
          tenantConfigs.connectionUriDomain,
          tenantConfigs.appId,
          tenantConfigs.tenantId,
        ],
        name: "tenant_first_factors_tenant_id_fkey",
      }).onDelete("cascade"),
      tenantFirstFactorsPkey: primaryKey({
        columns: [
          table.connectionUriDomain,
          table.appId,
          table.tenantId,
          table.factorId,
        ],
        name: "tenant_first_factors_pkey",
      }),
    };
  }
);

export const tenantRequiredSecondaryFactors = pgTable(
  "tenant_required_secondary_factors",
  {
    connectionUriDomain: varchar("connection_uri_domain", { length: 256 })
      .default("")
      .notNull(),
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    factorId: varchar("factor_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      tenantDefaultRequiredFactorIdsTenantIdIdx: index(
        "tenant_default_required_factor_ids_tenant_id_index"
      ).using("btree", table.connectionUriDomain, table.appId, table.tenantId),
      tenantRequiredSecondaryFactorsTenantIdFkey: foreignKey({
        columns: [table.connectionUriDomain, table.appId, table.tenantId],
        foreignColumns: [
          tenantConfigs.connectionUriDomain,
          tenantConfigs.appId,
          tenantConfigs.tenantId,
        ],
        name: "tenant_required_secondary_factors_tenant_id_fkey",
      }).onDelete("cascade"),
      tenantRequiredSecondaryFactorsPkey: primaryKey({
        columns: [
          table.connectionUriDomain,
          table.appId,
          table.tenantId,
          table.factorId,
        ],
        name: "tenant_required_secondary_factors_pkey",
      }),
    };
  }
);

export const emailpasswordUserToTenant = pgTable(
  "emailpassword_user_to_tenant",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      emailpasswordUserToTenantUserIdFkey: foreignKey({
        columns: [table.appId, table.tenantId, table.userId],
        foreignColumns: [
          allAuthRecipeUsers.appId,
          allAuthRecipeUsers.tenantId,
          allAuthRecipeUsers.userId,
        ],
        name: "emailpassword_user_to_tenant_user_id_fkey",
      }).onDelete("cascade"),
      emailpasswordUserToTenantPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.userId],
        name: "emailpassword_user_to_tenant_pkey",
      }),
      emailpasswordUserToTenantEmailKey: unique(
        "emailpassword_user_to_tenant_email_key"
      ).on(table.appId, table.tenantId, table.email),
    };
  }
);

export const userRoles = pgTable(
  "user_roles",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
    role: varchar("role", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      appIdRoleIdx: index().using("btree", table.appId, table.role),
      roleIdx: index("user_roles_role_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.role
      ),
      tenantIdIdx: index("user_roles_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      userRolesTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "user_roles_tenant_id_fkey",
      }).onDelete("cascade"),
      userRolesPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.userId, table.role],
        name: "user_roles_pkey",
      }),
    };
  }
);

export const useridMapping = pgTable(
  "userid_mapping",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    supertokensUserId: char("supertokens_user_id", { length: 36 }).notNull(),
    externalUserId: varchar("external_user_id", { length: 128 }).notNull(),
    externalUserIdInfo: text("external_user_id_info"),
  },
  (table) => {
    return {
      supertokensUserIdIdx: index(
        "userid_mapping_supertokens_user_id_index"
      ).using("btree", table.appId, table.supertokensUserId),
      useridMappingSupertokensUserIdFkey: foreignKey({
        columns: [table.appId, table.supertokensUserId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "userid_mapping_supertokens_user_id_fkey",
      }).onDelete("cascade"),
      useridMappingPkey: primaryKey({
        columns: [table.appId, table.supertokensUserId, table.externalUserId],
        name: "userid_mapping_pkey",
      }),
      useridMappingSupertokensUserIdKey: unique(
        "userid_mapping_supertokens_user_id_key"
      ).on(table.appId, table.supertokensUserId),
      useridMappingExternalUserIdKey: unique(
        "userid_mapping_external_user_id_key"
      ).on(table.appId, table.externalUserId),
    };
  }
);

export const oauthM2MTokens = pgTable(
  "oauth_m2m_tokens",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    clientId: varchar("client_id", { length: 255 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    iat: bigint("iat", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    exp: bigint("exp", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      oauthM2MTokenExpIdx: index("oauth_m2m_token_exp_index").using(
        "btree",
        table.exp
      ),
      oauthM2MTokenIatIdx: index("oauth_m2m_token_iat_index").using(
        "btree",
        table.iat,
        table.appId
      ),
      oauthM2MTokensClientIdFkey: foreignKey({
        columns: [table.appId, table.clientId],
        foreignColumns: [oauthClients.appId, oauthClients.clientId],
        name: "oauth_m2m_tokens_client_id_fkey",
      }).onDelete("cascade"),
      oauthM2MTokensPkey: primaryKey({
        columns: [table.appId, table.clientId, table.iat],
        name: "oauth_m2m_tokens_pkey",
      }),
    };
  }
);

export const keyValue = pgTable(
  "key_value",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    value: text("value"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAtTime: bigint("created_at_time", { mode: "number" }),
  },
  (table) => {
    return {
      tenantIdIdx: index("key_value_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      keyValueTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "key_value_tenant_id_fkey",
      }).onDelete("cascade"),
      keyValuePkey: primaryKey({
        columns: [table.appId, table.tenantId, table.name],
        name: "key_value_pkey",
      }),
    };
  }
);

export const appIdToUserId = pgTable(
  "app_id_to_user_id",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: char("user_id", { length: 36 }).notNull(),
    recipeId: varchar("recipe_id", { length: 128 }).notNull(),
    primaryOrRecipeUserId: char("primary_or_recipe_user_id", {
      length: 36,
    }).notNull(),
    isLinkedOrIsAPrimaryUser: boolean("is_linked_or_is_a_primary_user")
      .default(false)
      .notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      primaryUserIdIdx: index("app_id_to_user_id_primary_user_id_index").using(
        "btree",
        table.primaryOrRecipeUserId,
        table.appId
      ),
      appIdToUserIdPrimaryOrRecipeUserIdFkey: foreignKey({
        columns: [table.appId, table.primaryOrRecipeUserId],
        foreignColumns: [table.appId, table.userId],
        name: "app_id_to_user_id_primary_or_recipe_user_id_fkey",
      }).onDelete("cascade"),
      appIdToUserIdPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "app_id_to_user_id_pkey",
      }),
    };
  }
);

export const emailpasswordUsers = pgTable(
  "emailpassword_users",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    passwordHash: varchar("password_hash", { length: 256 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeJoined: bigint("time_joined", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      emailpasswordUsersUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "emailpassword_users_user_id_fkey",
      }).onDelete("cascade"),
      emailpasswordUsersPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "emailpassword_users_pkey",
      }),
    };
  }
);

export const emailpasswordPswdResetTokens = pgTable(
  "emailpassword_pswd_reset_tokens",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    token: varchar("token", { length: 128 }).notNull(),
    email: varchar("email", { length: 256 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tokenExpiry: bigint("token_expiry", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      emailpasswordPasswordResetTokenExpiryIdx: index(
        "emailpassword_password_reset_token_expiry_index"
      ).using("btree", table.tokenExpiry),
      userIdIdx: index("emailpassword_pswd_reset_tokens_user_id_index").using(
        "btree",
        table.appId,
        table.userId
      ),
      emailpasswordPswdResetTokensUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "emailpassword_pswd_reset_tokens_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
      emailpasswordPswdResetTokensPkey: primaryKey({
        columns: [table.appId, table.userId, table.token],
        name: "emailpassword_pswd_reset_tokens_pkey",
      }),
      emailpasswordPswdResetTokensTokenKey: unique(
        "emailpassword_pswd_reset_tokens_token_key"
      ).on(table.token),
    };
  }
);

export const thirdpartyUserToTenant = pgTable(
  "thirdparty_user_to_tenant",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    thirdPartyId: varchar("third_party_id", { length: 28 }).notNull(),
    thirdPartyUserId: varchar("third_party_user_id", { length: 256 }).notNull(),
  },
  (table) => {
    return {
      thirdpartyUserToTenantUserIdFkey: foreignKey({
        columns: [table.appId, table.tenantId, table.userId],
        foreignColumns: [
          allAuthRecipeUsers.appId,
          allAuthRecipeUsers.tenantId,
          allAuthRecipeUsers.userId,
        ],
        name: "thirdparty_user_to_tenant_user_id_fkey",
      }).onDelete("cascade"),
      thirdpartyUserToTenantPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.userId],
        name: "thirdparty_user_to_tenant_pkey",
      }),
      thirdpartyUserToTenantThirdPartyUserIdKey: unique(
        "thirdparty_user_to_tenant_third_party_user_id_key"
      ).on(
        table.appId,
        table.tenantId,
        table.thirdPartyId,
        table.thirdPartyUserId
      ),
    };
  }
);

export const jwtSigningKeys = pgTable(
  "jwt_signing_keys",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    keyId: varchar("key_id", { length: 255 }).notNull(),
    keyString: text("key_string").notNull(),
    algorithm: varchar("algorithm", { length: 10 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAt: bigint("created_at", { mode: "number" }),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      jwtSigningKeysPkey: primaryKey({
        columns: [table.appId, table.keyId],
        name: "jwt_signing_keys_pkey",
      }),
    };
  }
);

export const passwordlessUsers = pgTable(
  "passwordless_users",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }),
    phoneNumber: varchar("phone_number", { length: 256 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeJoined: bigint("time_joined", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      passwordlessUsersUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "passwordless_users_user_id_fkey",
      }).onDelete("cascade"),
      passwordlessUsersPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "passwordless_users_pkey",
      }),
    };
  }
);

export const passwordlessUserToTenant = pgTable(
  "passwordless_user_to_tenant",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }),
    phoneNumber: varchar("phone_number", { length: 256 }),
  },
  (table) => {
    return {
      passwordlessUserToTenantUserIdFkey: foreignKey({
        columns: [table.appId, table.tenantId, table.userId],
        foreignColumns: [
          allAuthRecipeUsers.appId,
          allAuthRecipeUsers.tenantId,
          allAuthRecipeUsers.userId,
        ],
        name: "passwordless_user_to_tenant_user_id_fkey",
      }).onDelete("cascade"),
      passwordlessUserToTenantPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.userId],
        name: "passwordless_user_to_tenant_pkey",
      }),
      passwordlessUserToTenantEmailKey: unique(
        "passwordless_user_to_tenant_email_key"
      ).on(table.appId, table.tenantId, table.email),
      passwordlessUserToTenantPhoneNumberKey: unique(
        "passwordless_user_to_tenant_phone_number_key"
      ).on(table.appId, table.tenantId, table.phoneNumber),
    };
  }
);

export const dashboardUsers = pgTable(
  "dashboard_users",
  {
    appId: varchar("app_id", { length: 64 })
      .default("public")
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    passwordHash: varchar("password_hash", { length: 256 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeJoined: bigint("time_joined", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      appIdIdx: index().using("btree", table.appId),
      dashboardUsersPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "dashboard_users_pkey",
      }),
      dashboardUsersEmailKey: unique("dashboard_users_email_key").on(
        table.appId,
        table.email
      ),
    };
  }
);

export const dashboardUserSessions = pgTable(
  "dashboard_user_sessions",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    sessionId: char("session_id", { length: 36 }).notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeCreated: bigint("time_created", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expiry: bigint("expiry", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      expiryIdx: index().using("btree", table.expiry),
      userIdIdx: index("dashboard_user_sessions_user_id_index").using(
        "btree",
        table.appId,
        table.userId
      ),
      dashboardUserSessionsUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [dashboardUsers.appId, dashboardUsers.userId],
        name: "dashboard_user_sessions_user_id_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
      dashboardUserSessionsPkey: primaryKey({
        columns: [table.appId, table.sessionId],
        name: "dashboard_user_sessions_pkey",
      }),
    };
  }
);

export const oauthClients = pgTable(
  "oauth_clients",
  {
    appId: varchar("app_id", { length: 64 })
      .notNull()
      .references(() => apps.appId, { onDelete: "cascade" }),
    clientId: varchar("client_id", { length: 255 }).notNull(),
    clientSecret: text("client_secret"),
    enableRefreshTokenRotation: boolean(
      "enable_refresh_token_rotation"
    ).notNull(),
    isClientCredentialsOnly: boolean("is_client_credentials_only").notNull(),
  },
  (table) => {
    return {
      oauthClientsPkey: primaryKey({
        columns: [table.appId, table.clientId],
        name: "oauth_clients_pkey",
      }),
    };
  }
);

export const emailverificationTokens = pgTable(
  "emailverification_tokens",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    token: varchar("token", { length: 128 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tokenExpiry: bigint("token_expiry", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      index: index("emailverification_tokens_index").using(
        "btree",
        table.tokenExpiry
      ),
      tenantIdIdx: index("emailverification_tokens_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      emailverificationTokensTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "emailverification_tokens_tenant_id_fkey",
      }).onDelete("cascade"),
      emailverificationTokensPkey: primaryKey({
        columns: [
          table.appId,
          table.tenantId,
          table.userId,
          table.email,
          table.token,
        ],
        name: "emailverification_tokens_pkey",
      }),
      emailverificationTokensTokenKey: unique(
        "emailverification_tokens_token_key"
      ).on(table.token),
    };
  }
);

export const thirdpartyUsers = pgTable(
  "thirdparty_users",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    thirdPartyId: varchar("third_party_id", { length: 28 }).notNull(),
    thirdPartyUserId: varchar("third_party_user_id", { length: 256 }).notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeJoined: bigint("time_joined", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      emailIdx: index("thirdparty_users_email_index").using(
        "btree",
        table.appId,
        table.email
      ),
      thirdpartyUserIdIdx: index(
        "thirdparty_users_thirdparty_user_id_index"
      ).using("btree", table.appId, table.thirdPartyId, table.thirdPartyUserId),
      thirdpartyUsersUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "thirdparty_users_user_id_fkey",
      }).onDelete("cascade"),
      thirdpartyUsersPkey: primaryKey({
        columns: [table.appId, table.userId],
        name: "thirdparty_users_pkey",
      }),
    };
  }
);

export const passwordlessCodes = pgTable(
  "passwordless_codes",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    codeId: char("code_id", { length: 36 }).notNull(),
    deviceIdHash: char("device_id_hash", { length: 44 }).notNull(),
    linkCodeHash: char("link_code_hash", { length: 44 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAt: bigint("created_at", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      createdAtIdx: index("passwordless_codes_created_at_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.createdAt
      ),
      deviceIdHashIdx: index("passwordless_codes_device_id_hash_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.deviceIdHash
      ),
      passwordlessCodesDeviceIdHashFkey: foreignKey({
        columns: [table.appId, table.tenantId, table.deviceIdHash],
        foreignColumns: [
          passwordlessDevices.appId,
          passwordlessDevices.tenantId,
          passwordlessDevices.deviceIdHash,
        ],
        name: "passwordless_codes_device_id_hash_fkey",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
      passwordlessCodesPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.codeId],
        name: "passwordless_codes_pkey",
      }),
      passwordlessCodesLinkCodeHashKey: unique(
        "passwordless_codes_link_code_hash_key"
      ).on(table.appId, table.tenantId, table.linkCodeHash),
    };
  }
);

export const passwordlessDevices = pgTable(
  "passwordless_devices",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    deviceIdHash: char("device_id_hash", { length: 44 }).notNull(),
    email: varchar("email", { length: 256 }),
    phoneNumber: varchar("phone_number", { length: 256 }),
    linkCodeSalt: char("link_code_salt", { length: 44 }).notNull(),
    failedAttempts: integer("failed_attempts").notNull(),
  },
  (table) => {
    return {
      emailIdx: index("passwordless_devices_email_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.email
      ),
      phoneNumberIdx: index("passwordless_devices_phone_number_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.phoneNumber
      ),
      tenantIdIdx: index("passwordless_devices_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      passwordlessDevicesTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "passwordless_devices_tenant_id_fkey",
      }).onDelete("cascade"),
      passwordlessDevicesPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.deviceIdHash],
        name: "passwordless_devices_pkey",
      }),
    };
  }
);

export const totpUsedCodes = pgTable(
  "totp_used_codes",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    isValid: boolean("is_valid").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expiryTimeMs: bigint("expiry_time_ms", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdTimeMs: bigint("created_time_ms", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      expiryTimeMsIdx: index("totp_used_codes_expiry_time_ms_index").using(
        "btree",
        table.appId,
        table.tenantId,
        table.expiryTimeMs
      ),
      tenantIdIdx: index("totp_used_codes_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      userIdIdx: index("totp_used_codes_user_id_index").using(
        "btree",
        table.appId,
        table.userId
      ),
      totpUsedCodesUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [totpUsers.appId, totpUsers.userId],
        name: "totp_used_codes_user_id_fkey",
      }).onDelete("cascade"),
      totpUsedCodesTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "totp_used_codes_tenant_id_fkey",
      }).onDelete("cascade"),
      totpUsedCodesPkey: primaryKey({
        columns: [
          table.appId,
          table.tenantId,
          table.userId,
          table.createdTimeMs,
        ],
        name: "totp_used_codes_pkey",
      }),
    };
  }
);

export const oauthLogoutChallenges = pgTable(
  "oauth_logout_challenges",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    challenge: varchar("challenge", { length: 128 }).notNull(),
    clientId: varchar("client_id", { length: 255 }).notNull(),
    postLogoutRedirectUri: varchar("post_logout_redirect_uri", {
      length: 1024,
    }),
    sessionHandle: varchar("session_handle", { length: 128 }),
    state: varchar("state", { length: 128 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeCreated: bigint("time_created", { mode: "number" }).notNull(),
  },
  (table) => {
    return {
      timeCreatedIdx: index().using("btree", table.timeCreated),
      oauthLogoutChallengesClientIdFkey: foreignKey({
        columns: [table.appId, table.clientId],
        foreignColumns: [oauthClients.appId, oauthClients.clientId],
        name: "oauth_logout_challenges_client_id_fkey",
      }).onDelete("cascade"),
      oauthLogoutChallengesPkey: primaryKey({
        columns: [table.appId, table.challenge],
        name: "oauth_logout_challenges_pkey",
      }),
    };
  }
);

export const allAuthRecipeUsers = pgTable(
  "all_auth_recipe_users",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    userId: char("user_id", { length: 36 }).notNull(),
    primaryOrRecipeUserId: char("primary_or_recipe_user_id", {
      length: 36,
    }).notNull(),
    isLinkedOrIsAPrimaryUser: boolean("is_linked_or_is_a_primary_user")
      .default(false)
      .notNull(),
    recipeId: varchar("recipe_id", { length: 128 }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    timeJoined: bigint("time_joined", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    primaryOrRecipeUserTimeJoined: bigint(
      "primary_or_recipe_user_time_joined",
      { mode: "number" }
    ).notNull(),
  },
  (table) => {
    return {
      allAuthRecipeTenantIdIdx: index("all_auth_recipe_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      allAuthRecipeUserIdIdx: index("all_auth_recipe_user_id_index").using(
        "btree",
        table.appId,
        table.userId
      ),
      paginationIndex1: index("all_auth_recipe_users_pagination_index1").using(
        "btree",
        table.appId,
        table.tenantId,
        table.primaryOrRecipeUserTimeJoined,
        table.primaryOrRecipeUserId
      ),
      paginationIndex2: index("all_auth_recipe_users_pagination_index2").using(
        "btree",
        table.appId,
        table.tenantId,
        table.primaryOrRecipeUserTimeJoined,
        table.primaryOrRecipeUserId
      ),
      paginationIndex3: index("all_auth_recipe_users_pagination_index3").using(
        "btree",
        table.recipeId,
        table.appId,
        table.tenantId,
        table.primaryOrRecipeUserTimeJoined,
        table.primaryOrRecipeUserId
      ),
      paginationIndex4: index("all_auth_recipe_users_pagination_index4").using(
        "btree",
        table.recipeId,
        table.appId,
        table.tenantId,
        table.primaryOrRecipeUserTimeJoined,
        table.primaryOrRecipeUserId
      ),
      primaryUserIdIdx: index(
        "all_auth_recipe_users_primary_user_id_index"
      ).using("btree", table.primaryOrRecipeUserId, table.appId),
      recipeIdIdx: index("all_auth_recipe_users_recipe_id_index").using(
        "btree",
        table.appId,
        table.recipeId,
        table.tenantId
      ),
      allAuthRecipeUsersTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "all_auth_recipe_users_tenant_id_fkey",
      }).onDelete("cascade"),
      allAuthRecipeUsersPrimaryOrRecipeUserIdFkey: foreignKey({
        columns: [table.appId, table.primaryOrRecipeUserId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "all_auth_recipe_users_primary_or_recipe_user_id_fkey",
      }).onDelete("cascade"),
      allAuthRecipeUsersUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [appIdToUserId.appId, appIdToUserId.userId],
        name: "all_auth_recipe_users_user_id_fkey",
      }).onDelete("cascade"),
      allAuthRecipeUsersPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.userId],
        name: "all_auth_recipe_users_pkey",
      }),
    };
  }
);

export const tenantConfigs = pgTable(
  "tenant_configs",
  {
    connectionUriDomain: varchar("connection_uri_domain", { length: 256 })
      .default("")
      .notNull(),
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    coreConfig: text("core_config"),
    emailPasswordEnabled: boolean("email_password_enabled"),
    passwordlessEnabled: boolean("passwordless_enabled"),
    thirdPartyEnabled: boolean("third_party_enabled"),
    isFirstFactorsNull: boolean("is_first_factors_null"),
  },
  (table) => {
    return {
      tenantConfigsPkey: primaryKey({
        columns: [table.connectionUriDomain, table.appId, table.tenantId],
        name: "tenant_configs_pkey",
      }),
    };
  }
);

export const totpUserDevices = pgTable(
  "totp_user_devices",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
    deviceName: varchar("device_name", { length: 256 }).notNull(),
    secretKey: varchar("secret_key", { length: 256 }).notNull(),
    period: integer("period").notNull(),
    skew: integer("skew").notNull(),
    verified: boolean("verified").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAt: bigint("created_at", { mode: "number" }),
  },
  (table) => {
    return {
      userIdIdx: index("totp_user_devices_user_id_index").using(
        "btree",
        table.appId,
        table.userId
      ),
      totpUserDevicesUserIdFkey: foreignKey({
        columns: [table.appId, table.userId],
        foreignColumns: [totpUsers.appId, totpUsers.userId],
        name: "totp_user_devices_user_id_fkey",
      }).onDelete("cascade"),
      totpUserDevicesPkey: primaryKey({
        columns: [table.appId, table.userId, table.deviceName],
        name: "totp_user_devices_pkey",
      }),
    };
  }
);

export const sessionInfo = pgTable(
  "session_info",
  {
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    sessionHandle: varchar("session_handle", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 128 }).notNull(),
    refreshTokenHash2: varchar("refresh_token_hash_2", {
      length: 128,
    }).notNull(),
    sessionData: text("session_data"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expiresAt: bigint("expires_at", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    createdAtTime: bigint("created_at_time", { mode: "number" }).notNull(),
    jwtUserPayload: text("jwt_user_payload"),
    useStaticKey: boolean("use_static_key").notNull(),
  },
  (table) => {
    return {
      sessionExpiryIdx: index("session_expiry_index").using(
        "btree",
        table.expiresAt
      ),
      tenantIdIdx: index("session_info_tenant_id_index").using(
        "btree",
        table.appId,
        table.tenantId
      ),
      sessionInfoTenantIdFkey: foreignKey({
        columns: [table.appId, table.tenantId],
        foreignColumns: [tenants.appId, tenants.tenantId],
        name: "session_info_tenant_id_fkey",
      }).onDelete("cascade"),
      sessionInfoPkey: primaryKey({
        columns: [table.appId, table.tenantId, table.sessionHandle],
        name: "session_info_pkey",
      }),
    };
  }
);

export const tenantThirdpartyProviderClients = pgTable(
  "tenant_thirdparty_provider_clients",
  {
    connectionUriDomain: varchar("connection_uri_domain", { length: 256 })
      .default("")
      .notNull(),
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    thirdPartyId: varchar("third_party_id", { length: 28 }).notNull(),
    clientType: varchar("client_type", { length: 64 }).default("").notNull(),
    clientId: varchar("client_id", { length: 256 }).notNull(),
    clientSecret: text("client_secret"),
    scope: varchar("scope", { length: 128 }).array(),
    forcePkce: boolean("force_pkce"),
    additionalConfig: text("additional_config"),
  },
  (table) => {
    return {
      thirdPartyIdIdx: index(
        "tenant_thirdparty_provider_clients_third_party_id_index"
      ).using(
        "btree",
        table.connectionUriDomain,
        table.appId,
        table.tenantId,
        table.thirdPartyId
      ),
      tenantThirdpartyProviderClientsThirdPartyIdFkey: foreignKey({
        columns: [
          table.connectionUriDomain,
          table.appId,
          table.tenantId,
          table.thirdPartyId,
        ],
        foreignColumns: [
          tenantThirdpartyProviders.connectionUriDomain,
          tenantThirdpartyProviders.appId,
          tenantThirdpartyProviders.tenantId,
          tenantThirdpartyProviders.thirdPartyId,
        ],
        name: "tenant_thirdparty_provider_clients_third_party_id_fkey",
      }).onDelete("cascade"),
      tenantThirdpartyProviderClientsPkey: primaryKey({
        columns: [
          table.connectionUriDomain,
          table.appId,
          table.tenantId,
          table.thirdPartyId,
          table.clientType,
        ],
        name: "tenant_thirdparty_provider_clients_pkey",
      }),
    };
  }
);

export const tenantThirdpartyProviders = pgTable(
  "tenant_thirdparty_providers",
  {
    connectionUriDomain: varchar("connection_uri_domain", { length: 256 })
      .default("")
      .notNull(),
    appId: varchar("app_id", { length: 64 }).default("public").notNull(),
    tenantId: varchar("tenant_id", { length: 64 }).default("public").notNull(),
    thirdPartyId: varchar("third_party_id", { length: 28 }).notNull(),
    name: varchar("name", { length: 64 }),
    authorizationEndpoint: text("authorization_endpoint"),
    authorizationEndpointQueryParams: text(
      "authorization_endpoint_query_params"
    ),
    tokenEndpoint: text("token_endpoint"),
    tokenEndpointBodyParams: text("token_endpoint_body_params"),
    userInfoEndpoint: text("user_info_endpoint"),
    userInfoEndpointQueryParams: text("user_info_endpoint_query_params"),
    userInfoEndpointHeaders: text("user_info_endpoint_headers"),
    jwksUri: text("jwks_uri"),
    oidcDiscoveryEndpoint: text("oidc_discovery_endpoint"),
    requireEmail: boolean("require_email"),
    userInfoMapFromIdTokenPayloadUserId: varchar(
      "user_info_map_from_id_token_payload_user_id",
      { length: 64 }
    ),
    userInfoMapFromIdTokenPayloadEmail: varchar(
      "user_info_map_from_id_token_payload_email",
      { length: 64 }
    ),
    userInfoMapFromIdTokenPayloadEmailVerified: varchar(
      "user_info_map_from_id_token_payload_email_verified",
      { length: 64 }
    ),
    userInfoMapFromUserInfoEndpointUserId: varchar(
      "user_info_map_from_user_info_endpoint_user_id",
      { length: 64 }
    ),
    userInfoMapFromUserInfoEndpointEmail: varchar(
      "user_info_map_from_user_info_endpoint_email",
      { length: 64 }
    ),
    userInfoMapFromUserInfoEndpointEmailVerified: varchar(
      "user_info_map_from_user_info_endpoint_email_verified",
      { length: 64 }
    ),
  },
  (table) => {
    return {
      tenantIdIdx: index("tenant_thirdparty_providers_tenant_id_index").using(
        "btree",
        table.connectionUriDomain,
        table.appId,
        table.tenantId
      ),
      tenantThirdpartyProvidersTenantIdFkey: foreignKey({
        columns: [table.connectionUriDomain, table.appId, table.tenantId],
        foreignColumns: [
          tenantConfigs.connectionUriDomain,
          tenantConfigs.appId,
          tenantConfigs.tenantId,
        ],
        name: "tenant_thirdparty_providers_tenant_id_fkey",
      }).onDelete("cascade"),
      tenantThirdpartyProvidersPkey: primaryKey({
        columns: [
          table.connectionUriDomain,
          table.appId,
          table.tenantId,
          table.thirdPartyId,
        ],
        name: "tenant_thirdparty_providers_pkey",
      }),
    };
  }
);
