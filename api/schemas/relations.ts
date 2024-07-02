import { relations } from "drizzle-orm/relations";
import {
  admin_users,
  admin_permissions,
  admin_roles,
  strapi_api_tokens,
  strapi_api_token_permissions,
  strapi_transfer_tokens,
  strapi_transfer_token_permissions,
  files,
  upload_folders,
  strapi_releases,
  strapi_release_actions,
  i18n_locale,
  up_permissions,
  up_roles,
  up_users,
  answers,
  events,
  event_galleries,
  execs,
  introductions,
  partners,
  peoples,
  previous_teams,
  questions,
  socials,
  some_photos,
  tickets,
  user_tickets,
  values,
  admin_permissions_role_links,
  admin_users_roles_links,
  strapi_api_token_permissions_token_links,
  strapi_transfer_token_permissions_token_links,
  files_related_morphs,
  files_folder_links,
  upload_folders_parent_links,
  strapi_release_actions_release_links,
  up_permissions_role_links,
  up_users_role_links,
  answers_people_id_links,
  answers_question_id_links,
  questions_ticket_id_links,
  tickets_event_id_links,
  user_tickets_people_id_links,
  user_tickets_ticket_id_links,
} from "./schema";

export const admin_usersRelations = relations(admin_users, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [admin_users.created_by_id],
    references: [admin_users.id],
    relationName: "admin_users_created_by_id_admin_users_id",
  }),
  admin_users_created_by_id: many(admin_users, {
    relationName: "admin_users_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [admin_users.updated_by_id],
    references: [admin_users.id],
    relationName: "admin_users_updated_by_id_admin_users_id",
  }),
  admin_users_updated_by_id: many(admin_users, {
    relationName: "admin_users_updated_by_id_admin_users_id",
  }),
  admin_permissions_created_by_id: many(admin_permissions, {
    relationName: "admin_permissions_created_by_id_admin_users_id",
  }),
  admin_permissions_updated_by_id: many(admin_permissions, {
    relationName: "admin_permissions_updated_by_id_admin_users_id",
  }),
  admin_roles_created_by_id: many(admin_roles, {
    relationName: "admin_roles_created_by_id_admin_users_id",
  }),
  admin_roles_updated_by_id: many(admin_roles, {
    relationName: "admin_roles_updated_by_id_admin_users_id",
  }),
  strapi_api_tokens_created_by_id: many(strapi_api_tokens, {
    relationName: "strapi_api_tokens_created_by_id_admin_users_id",
  }),
  strapi_api_tokens_updated_by_id: many(strapi_api_tokens, {
    relationName: "strapi_api_tokens_updated_by_id_admin_users_id",
  }),
  strapi_api_token_permissions_created_by_id: many(
    strapi_api_token_permissions,
    {
      relationName: "strapi_api_token_permissions_created_by_id_admin_users_id",
    }
  ),
  strapi_api_token_permissions_updated_by_id: many(
    strapi_api_token_permissions,
    {
      relationName: "strapi_api_token_permissions_updated_by_id_admin_users_id",
    }
  ),
  strapi_transfer_tokens_created_by_id: many(strapi_transfer_tokens, {
    relationName: "strapi_transfer_tokens_created_by_id_admin_users_id",
  }),
  strapi_transfer_tokens_updated_by_id: many(strapi_transfer_tokens, {
    relationName: "strapi_transfer_tokens_updated_by_id_admin_users_id",
  }),
  strapi_transfer_token_permissions_created_by_id: many(
    strapi_transfer_token_permissions,
    {
      relationName:
        "strapi_transfer_token_permissions_created_by_id_admin_users_id",
    }
  ),
  strapi_transfer_token_permissions_updated_by_id: many(
    strapi_transfer_token_permissions,
    {
      relationName:
        "strapi_transfer_token_permissions_updated_by_id_admin_users_id",
    }
  ),
  files_created_by_id: many(files, {
    relationName: "files_created_by_id_admin_users_id",
  }),
  files_updated_by_id: many(files, {
    relationName: "files_updated_by_id_admin_users_id",
  }),
  upload_folders_created_by_id: many(upload_folders, {
    relationName: "upload_folders_created_by_id_admin_users_id",
  }),
  upload_folders_updated_by_id: many(upload_folders, {
    relationName: "upload_folders_updated_by_id_admin_users_id",
  }),
  strapi_releases_created_by_id: many(strapi_releases, {
    relationName: "strapi_releases_created_by_id_admin_users_id",
  }),
  strapi_releases_updated_by_id: many(strapi_releases, {
    relationName: "strapi_releases_updated_by_id_admin_users_id",
  }),
  strapi_release_actions_created_by_id: many(strapi_release_actions, {
    relationName: "strapi_release_actions_created_by_id_admin_users_id",
  }),
  strapi_release_actions_updated_by_id: many(strapi_release_actions, {
    relationName: "strapi_release_actions_updated_by_id_admin_users_id",
  }),
  i18n_locales_created_by_id: many(i18n_locale, {
    relationName: "i18n_locale_created_by_id_admin_users_id",
  }),
  i18n_locales_updated_by_id: many(i18n_locale, {
    relationName: "i18n_locale_updated_by_id_admin_users_id",
  }),
  up_permissions_created_by_id: many(up_permissions, {
    relationName: "up_permissions_created_by_id_admin_users_id",
  }),
  up_permissions_updated_by_id: many(up_permissions, {
    relationName: "up_permissions_updated_by_id_admin_users_id",
  }),
  up_roles_created_by_id: many(up_roles, {
    relationName: "up_roles_created_by_id_admin_users_id",
  }),
  up_roles_updated_by_id: many(up_roles, {
    relationName: "up_roles_updated_by_id_admin_users_id",
  }),
  up_users_created_by_id: many(up_users, {
    relationName: "up_users_created_by_id_admin_users_id",
  }),
  up_users_updated_by_id: many(up_users, {
    relationName: "up_users_updated_by_id_admin_users_id",
  }),
  answers_created_by_id: many(answers, {
    relationName: "answers_created_by_id_admin_users_id",
  }),
  answers_updated_by_id: many(answers, {
    relationName: "answers_updated_by_id_admin_users_id",
  }),
  events_created_by_id: many(events, {
    relationName: "events_created_by_id_admin_users_id",
  }),
  events_updated_by_id: many(events, {
    relationName: "events_updated_by_id_admin_users_id",
  }),
  event_galleries_created_by_id: many(event_galleries, {
    relationName: "event_galleries_created_by_id_admin_users_id",
  }),
  event_galleries_updated_by_id: many(event_galleries, {
    relationName: "event_galleries_updated_by_id_admin_users_id",
  }),
  execs_created_by_id: many(execs, {
    relationName: "execs_created_by_id_admin_users_id",
  }),
  execs_updated_by_id: many(execs, {
    relationName: "execs_updated_by_id_admin_users_id",
  }),
  introductions_created_by_id: many(introductions, {
    relationName: "introductions_created_by_id_admin_users_id",
  }),
  introductions_updated_by_id: many(introductions, {
    relationName: "introductions_updated_by_id_admin_users_id",
  }),
  partners_created_by_id: many(partners, {
    relationName: "partners_created_by_id_admin_users_id",
  }),
  partners_updated_by_id: many(partners, {
    relationName: "partners_updated_by_id_admin_users_id",
  }),
  peoples_created_by_id: many(peoples, {
    relationName: "peoples_created_by_id_admin_users_id",
  }),
  peoples_updated_by_id: many(peoples, {
    relationName: "peoples_updated_by_id_admin_users_id",
  }),
  previous_teams_created_by_id: many(previous_teams, {
    relationName: "previous_teams_created_by_id_admin_users_id",
  }),
  previous_teams_updated_by_id: many(previous_teams, {
    relationName: "previous_teams_updated_by_id_admin_users_id",
  }),
  questions_created_by_id: many(questions, {
    relationName: "questions_created_by_id_admin_users_id",
  }),
  questions_updated_by_id: many(questions, {
    relationName: "questions_updated_by_id_admin_users_id",
  }),
  socials_created_by_id: many(socials, {
    relationName: "socials_created_by_id_admin_users_id",
  }),
  socials_updated_by_id: many(socials, {
    relationName: "socials_updated_by_id_admin_users_id",
  }),
  some_photos_created_by_id: many(some_photos, {
    relationName: "some_photos_created_by_id_admin_users_id",
  }),
  some_photos_updated_by_id: many(some_photos, {
    relationName: "some_photos_updated_by_id_admin_users_id",
  }),
  tickets_created_by_id: many(tickets, {
    relationName: "tickets_created_by_id_admin_users_id",
  }),
  tickets_updated_by_id: many(tickets, {
    relationName: "tickets_updated_by_id_admin_users_id",
  }),
  user_tickets_created_by_id: many(user_tickets, {
    relationName: "user_tickets_created_by_id_admin_users_id",
  }),
  user_tickets_updated_by_id: many(user_tickets, {
    relationName: "user_tickets_updated_by_id_admin_users_id",
  }),
  values_created_by_id: many(values, {
    relationName: "values_created_by_id_admin_users_id",
  }),
  values_updated_by_id: many(values, {
    relationName: "values_updated_by_id_admin_users_id",
  }),
  admin_users_roles_links: many(admin_users_roles_links),
}));

export const admin_permissionsRelations = relations(
  admin_permissions,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [admin_permissions.created_by_id],
      references: [admin_users.id],
      relationName: "admin_permissions_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [admin_permissions.updated_by_id],
      references: [admin_users.id],
      relationName: "admin_permissions_updated_by_id_admin_users_id",
    }),
    admin_permissions_role_links: many(admin_permissions_role_links),
  })
);

export const admin_rolesRelations = relations(admin_roles, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [admin_roles.created_by_id],
    references: [admin_users.id],
    relationName: "admin_roles_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [admin_roles.updated_by_id],
    references: [admin_users.id],
    relationName: "admin_roles_updated_by_id_admin_users_id",
  }),
  admin_permissions_role_links: many(admin_permissions_role_links),
  admin_users_roles_links: many(admin_users_roles_links),
}));

export const strapi_api_tokensRelations = relations(
  strapi_api_tokens,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_api_tokens.created_by_id],
      references: [admin_users.id],
      relationName: "strapi_api_tokens_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_api_tokens.updated_by_id],
      references: [admin_users.id],
      relationName: "strapi_api_tokens_updated_by_id_admin_users_id",
    }),
    strapi_api_token_permissions_token_links: many(
      strapi_api_token_permissions_token_links
    ),
  })
);

export const strapi_api_token_permissionsRelations = relations(
  strapi_api_token_permissions,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_api_token_permissions.created_by_id],
      references: [admin_users.id],
      relationName: "strapi_api_token_permissions_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_api_token_permissions.updated_by_id],
      references: [admin_users.id],
      relationName: "strapi_api_token_permissions_updated_by_id_admin_users_id",
    }),
    strapi_api_token_permissions_token_links: many(
      strapi_api_token_permissions_token_links
    ),
  })
);

export const strapi_transfer_tokensRelations = relations(
  strapi_transfer_tokens,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_transfer_tokens.created_by_id],
      references: [admin_users.id],
      relationName: "strapi_transfer_tokens_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_transfer_tokens.updated_by_id],
      references: [admin_users.id],
      relationName: "strapi_transfer_tokens_updated_by_id_admin_users_id",
    }),
    strapi_transfer_token_permissions_token_links: many(
      strapi_transfer_token_permissions_token_links
    ),
  })
);

export const strapi_transfer_token_permissionsRelations = relations(
  strapi_transfer_token_permissions,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_transfer_token_permissions.created_by_id],
      references: [admin_users.id],
      relationName:
        "strapi_transfer_token_permissions_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_transfer_token_permissions.updated_by_id],
      references: [admin_users.id],
      relationName:
        "strapi_transfer_token_permissions_updated_by_id_admin_users_id",
    }),
    strapi_transfer_token_permissions_token_links: many(
      strapi_transfer_token_permissions_token_links
    ),
  })
);

export const filesRelations = relations(files, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [files.created_by_id],
    references: [admin_users.id],
    relationName: "files_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [files.updated_by_id],
    references: [admin_users.id],
    relationName: "files_updated_by_id_admin_users_id",
  }),
  files_related_morphs: many(files_related_morphs),
  files_folder_links: many(files_folder_links),
}));

export const upload_foldersRelations = relations(
  upload_folders,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [upload_folders.created_by_id],
      references: [admin_users.id],
      relationName: "upload_folders_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [upload_folders.updated_by_id],
      references: [admin_users.id],
      relationName: "upload_folders_updated_by_id_admin_users_id",
    }),
    files_folder_links: many(files_folder_links),
    upload_folders_parent_links_folder_id: many(upload_folders_parent_links, {
      relationName: "upload_folders_parent_links_folder_id_upload_folders_id",
    }),
    upload_folders_parent_links_inv_folder_id: many(
      upload_folders_parent_links,
      {
        relationName:
          "upload_folders_parent_links_inv_folder_id_upload_folders_id",
      }
    ),
  })
);

export const strapi_releasesRelations = relations(
  strapi_releases,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_releases.created_by_id],
      references: [admin_users.id],
      relationName: "strapi_releases_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_releases.updated_by_id],
      references: [admin_users.id],
      relationName: "strapi_releases_updated_by_id_admin_users_id",
    }),
    strapi_release_actions_release_links: many(
      strapi_release_actions_release_links
    ),
  })
);

export const strapi_release_actionsRelations = relations(
  strapi_release_actions,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [strapi_release_actions.created_by_id],
      references: [admin_users.id],
      relationName: "strapi_release_actions_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [strapi_release_actions.updated_by_id],
      references: [admin_users.id],
      relationName: "strapi_release_actions_updated_by_id_admin_users_id",
    }),
    strapi_release_actions_release_links: many(
      strapi_release_actions_release_links
    ),
  })
);

export const i18n_localeRelations = relations(i18n_locale, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [i18n_locale.created_by_id],
    references: [admin_users.id],
    relationName: "i18n_locale_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [i18n_locale.updated_by_id],
    references: [admin_users.id],
    relationName: "i18n_locale_updated_by_id_admin_users_id",
  }),
}));

export const up_permissionsRelations = relations(
  up_permissions,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [up_permissions.created_by_id],
      references: [admin_users.id],
      relationName: "up_permissions_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [up_permissions.updated_by_id],
      references: [admin_users.id],
      relationName: "up_permissions_updated_by_id_admin_users_id",
    }),
    up_permissions_role_links: many(up_permissions_role_links),
  })
);

export const up_rolesRelations = relations(up_roles, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [up_roles.created_by_id],
    references: [admin_users.id],
    relationName: "up_roles_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [up_roles.updated_by_id],
    references: [admin_users.id],
    relationName: "up_roles_updated_by_id_admin_users_id",
  }),
  up_permissions_role_links: many(up_permissions_role_links),
  up_users_role_links: many(up_users_role_links),
}));

export const up_usersRelations = relations(up_users, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [up_users.created_by_id],
    references: [admin_users.id],
    relationName: "up_users_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [up_users.updated_by_id],
    references: [admin_users.id],
    relationName: "up_users_updated_by_id_admin_users_id",
  }),
  up_users_role_links: many(up_users_role_links),
}));

export const answersRelations = relations(answers, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [answers.created_by_id],
    references: [admin_users.id],
    relationName: "answers_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [answers.updated_by_id],
    references: [admin_users.id],
    relationName: "answers_updated_by_id_admin_users_id",
  }),
  answers_people_id_links: many(answers_people_id_links),
  answers_question_id_links: many(answers_question_id_links),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [events.created_by_id],
    references: [admin_users.id],
    relationName: "events_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [events.updated_by_id],
    references: [admin_users.id],
    relationName: "events_updated_by_id_admin_users_id",
  }),
  tickets_event_id_links: many(tickets_event_id_links),
}));

export const event_galleriesRelations = relations(
  event_galleries,
  ({ one }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [event_galleries.created_by_id],
      references: [admin_users.id],
      relationName: "event_galleries_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [event_galleries.updated_by_id],
      references: [admin_users.id],
      relationName: "event_galleries_updated_by_id_admin_users_id",
    }),
  })
);

export const execsRelations = relations(execs, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [execs.created_by_id],
    references: [admin_users.id],
    relationName: "execs_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [execs.updated_by_id],
    references: [admin_users.id],
    relationName: "execs_updated_by_id_admin_users_id",
  }),
}));

export const introductionsRelations = relations(introductions, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [introductions.created_by_id],
    references: [admin_users.id],
    relationName: "introductions_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [introductions.updated_by_id],
    references: [admin_users.id],
    relationName: "introductions_updated_by_id_admin_users_id",
  }),
}));

export const partnersRelations = relations(partners, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [partners.created_by_id],
    references: [admin_users.id],
    relationName: "partners_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [partners.updated_by_id],
    references: [admin_users.id],
    relationName: "partners_updated_by_id_admin_users_id",
  }),
}));

export const peoplesRelations = relations(peoples, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [peoples.created_by_id],
    references: [admin_users.id],
    relationName: "peoples_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [peoples.updated_by_id],
    references: [admin_users.id],
    relationName: "peoples_updated_by_id_admin_users_id",
  }),
  answers_people_id_links: many(answers_people_id_links),
  user_tickets_people_id_links: many(user_tickets_people_id_links),
}));

export const previous_teamsRelations = relations(previous_teams, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [previous_teams.created_by_id],
    references: [admin_users.id],
    relationName: "previous_teams_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [previous_teams.updated_by_id],
    references: [admin_users.id],
    relationName: "previous_teams_updated_by_id_admin_users_id",
  }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [questions.created_by_id],
    references: [admin_users.id],
    relationName: "questions_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [questions.updated_by_id],
    references: [admin_users.id],
    relationName: "questions_updated_by_id_admin_users_id",
  }),
  answers_question_id_links: many(answers_question_id_links),
  questions_ticket_id_links: many(questions_ticket_id_links),
}));

export const socialsRelations = relations(socials, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [socials.created_by_id],
    references: [admin_users.id],
    relationName: "socials_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [socials.updated_by_id],
    references: [admin_users.id],
    relationName: "socials_updated_by_id_admin_users_id",
  }),
}));

export const some_photosRelations = relations(some_photos, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [some_photos.created_by_id],
    references: [admin_users.id],
    relationName: "some_photos_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [some_photos.updated_by_id],
    references: [admin_users.id],
    relationName: "some_photos_updated_by_id_admin_users_id",
  }),
}));

export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [tickets.created_by_id],
    references: [admin_users.id],
    relationName: "tickets_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [tickets.updated_by_id],
    references: [admin_users.id],
    relationName: "tickets_updated_by_id_admin_users_id",
  }),
  questions_ticket_id_links: many(questions_ticket_id_links),
  tickets_event_id_links: many(tickets_event_id_links),
  user_tickets_ticket_id_links: many(user_tickets_ticket_id_links),
}));

export const user_ticketsRelations = relations(
  user_tickets,
  ({ one, many }) => ({
    admin_user_created_by_id: one(admin_users, {
      fields: [user_tickets.created_by_id],
      references: [admin_users.id],
      relationName: "user_tickets_created_by_id_admin_users_id",
    }),
    admin_user_updated_by_id: one(admin_users, {
      fields: [user_tickets.updated_by_id],
      references: [admin_users.id],
      relationName: "user_tickets_updated_by_id_admin_users_id",
    }),
    user_tickets_people_id_links: many(user_tickets_people_id_links),
    user_tickets_ticket_id_links: many(user_tickets_ticket_id_links),
  })
);

export const valuesRelations = relations(values, ({ one }) => ({
  admin_user_created_by_id: one(admin_users, {
    fields: [values.created_by_id],
    references: [admin_users.id],
    relationName: "values_created_by_id_admin_users_id",
  }),
  admin_user_updated_by_id: one(admin_users, {
    fields: [values.updated_by_id],
    references: [admin_users.id],
    relationName: "values_updated_by_id_admin_users_id",
  }),
}));

export const admin_permissions_role_linksRelations = relations(
  admin_permissions_role_links,
  ({ one }) => ({
    admin_permission: one(admin_permissions, {
      fields: [admin_permissions_role_links.permission_id],
      references: [admin_permissions.id],
    }),
    admin_role: one(admin_roles, {
      fields: [admin_permissions_role_links.role_id],
      references: [admin_roles.id],
    }),
  })
);

export const admin_users_roles_linksRelations = relations(
  admin_users_roles_links,
  ({ one }) => ({
    admin_user: one(admin_users, {
      fields: [admin_users_roles_links.user_id],
      references: [admin_users.id],
    }),
    admin_role: one(admin_roles, {
      fields: [admin_users_roles_links.role_id],
      references: [admin_roles.id],
    }),
  })
);

export const strapi_api_token_permissions_token_linksRelations = relations(
  strapi_api_token_permissions_token_links,
  ({ one }) => ({
    strapi_api_token_permission: one(strapi_api_token_permissions, {
      fields: [
        strapi_api_token_permissions_token_links.api_token_permission_id,
      ],
      references: [strapi_api_token_permissions.id],
    }),
    strapi_api_token: one(strapi_api_tokens, {
      fields: [strapi_api_token_permissions_token_links.api_token_id],
      references: [strapi_api_tokens.id],
    }),
  })
);

export const strapi_transfer_token_permissions_token_linksRelations = relations(
  strapi_transfer_token_permissions_token_links,
  ({ one }) => ({
    strapi_transfer_token_permission: one(strapi_transfer_token_permissions, {
      fields: [
        strapi_transfer_token_permissions_token_links.transfer_token_permission_id,
      ],
      references: [strapi_transfer_token_permissions.id],
    }),
    strapi_transfer_token: one(strapi_transfer_tokens, {
      fields: [strapi_transfer_token_permissions_token_links.transfer_token_id],
      references: [strapi_transfer_tokens.id],
    }),
  })
);

export const files_related_morphsRelations = relations(
  files_related_morphs,
  ({ one }) => ({
    file: one(files, {
      fields: [files_related_morphs.file_id],
      references: [files.id],
    }),
  })
);

export const files_folder_linksRelations = relations(
  files_folder_links,
  ({ one }) => ({
    file: one(files, {
      fields: [files_folder_links.file_id],
      references: [files.id],
    }),
    upload_folder: one(upload_folders, {
      fields: [files_folder_links.folder_id],
      references: [upload_folders.id],
    }),
  })
);

export const upload_folders_parent_linksRelations = relations(
  upload_folders_parent_links,
  ({ one }) => ({
    upload_folder_folder_id: one(upload_folders, {
      fields: [upload_folders_parent_links.folder_id],
      references: [upload_folders.id],
      relationName: "upload_folders_parent_links_folder_id_upload_folders_id",
    }),
    upload_folder_inv_folder_id: one(upload_folders, {
      fields: [upload_folders_parent_links.inv_folder_id],
      references: [upload_folders.id],
      relationName:
        "upload_folders_parent_links_inv_folder_id_upload_folders_id",
    }),
  })
);

export const strapi_release_actions_release_linksRelations = relations(
  strapi_release_actions_release_links,
  ({ one }) => ({
    strapi_release_action: one(strapi_release_actions, {
      fields: [strapi_release_actions_release_links.release_action_id],
      references: [strapi_release_actions.id],
    }),
    strapi_release: one(strapi_releases, {
      fields: [strapi_release_actions_release_links.release_id],
      references: [strapi_releases.id],
    }),
  })
);

export const up_permissions_role_linksRelations = relations(
  up_permissions_role_links,
  ({ one }) => ({
    up_permission: one(up_permissions, {
      fields: [up_permissions_role_links.permission_id],
      references: [up_permissions.id],
    }),
    up_role: one(up_roles, {
      fields: [up_permissions_role_links.role_id],
      references: [up_roles.id],
    }),
  })
);

export const up_users_role_linksRelations = relations(
  up_users_role_links,
  ({ one }) => ({
    up_user: one(up_users, {
      fields: [up_users_role_links.user_id],
      references: [up_users.id],
    }),
    up_role: one(up_roles, {
      fields: [up_users_role_links.role_id],
      references: [up_roles.id],
    }),
  })
);

export const answers_people_id_linksRelations = relations(
  answers_people_id_links,
  ({ one }) => ({
    answer: one(answers, {
      fields: [answers_people_id_links.answer_id],
      references: [answers.id],
    }),
    people: one(peoples, {
      fields: [answers_people_id_links.people_id],
      references: [peoples.id],
    }),
  })
);

export const answers_question_id_linksRelations = relations(
  answers_question_id_links,
  ({ one }) => ({
    answer: one(answers, {
      fields: [answers_question_id_links.answer_id],
      references: [answers.id],
    }),
    question: one(questions, {
      fields: [answers_question_id_links.question_id],
      references: [questions.id],
    }),
  })
);

export const questions_ticket_id_linksRelations = relations(
  questions_ticket_id_links,
  ({ one }) => ({
    question: one(questions, {
      fields: [questions_ticket_id_links.question_id],
      references: [questions.id],
    }),
    ticket: one(tickets, {
      fields: [questions_ticket_id_links.ticket_id],
      references: [tickets.id],
    }),
  })
);

export const tickets_event_id_linksRelations = relations(
  tickets_event_id_links,
  ({ one }) => ({
    ticket: one(tickets, {
      fields: [tickets_event_id_links.ticket_id],
      references: [tickets.id],
    }),
    event: one(events, {
      fields: [tickets_event_id_links.event_id],
      references: [events.id],
    }),
  })
);

export const user_tickets_people_id_linksRelations = relations(
  user_tickets_people_id_links,
  ({ one }) => ({
    user_ticket: one(user_tickets, {
      fields: [user_tickets_people_id_links.user_ticket_id],
      references: [user_tickets.id],
    }),
    people: one(peoples, {
      fields: [user_tickets_people_id_links.people_id],
      references: [peoples.id],
    }),
  })
);

export const user_tickets_ticket_id_linksRelations = relations(
  user_tickets_ticket_id_links,
  ({ one }) => ({
    user_ticket: one(user_tickets, {
      fields: [user_tickets_ticket_id_links.user_ticket_id],
      references: [user_tickets.id],
    }),
    ticket: one(tickets, {
      fields: [user_tickets_ticket_id_links.ticket_id],
      references: [tickets.id],
    }),
  })
);
