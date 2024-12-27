import { relations } from "drizzle-orm/relations";
import {
  oauthClients,
  oauthSessions,
  adminUsers,
  adminPermissions,
  adminRoles,
  strapiApiTokens,
  strapiApiTokenPermissions,
  strapiTransferTokens,
  strapiTransferTokenPermissions,
  files,
  uploadFolders,
  strapiReleases,
  strapiReleaseActions,
  i18NLocale,
  upPermissions,
  upRoles,
  upUsers,
  answers,
  events,
  eventGalleries,
  execs,
  introductions,
  partners,
  peoples,
  previousTeams,
  purchasableMemberships,
  questions,
  somePhotos,
  tickets,
  userTickets,
  values,
  adminPermissionsRoleLinks,
  adminUsersRolesLinks,
  strapiApiTokenPermissionsTokenLinks,
  strapiTransferTokenPermissionsTokenLinks,
  filesRelatedMorphs,
  filesFolderLinks,
  uploadFoldersParentLinks,
  strapiReleaseActionsReleaseLinks,
  upPermissionsRoleLinks,
  upUsersRoleLinks,
  answersPeopleTicketLinks,
  answersQuestionIdLinks,
  questionsTicketIdLinks,
  ticketsEventIdLinks,
  userTicketsPeopleIdLinks,
  userTicketsTicketIdLinks,
  apps,
  roles,
  totpUsers,
  tenants,
  userLastActive,
  sessionAccessTokenSigningKeys,
  emailverificationVerifiedEmails,
  rolePermissions,
  userMetadata,
  tenantConfigs,
  tenantFirstFactors,
  tenantRequiredSecondaryFactors,
  allAuthRecipeUsers,
  emailpasswordUserToTenant,
  userRoles,
  appIdToUserId,
  useridMapping,
  oauthM2MTokens,
  keyValue,
  emailpasswordUsers,
  emailpasswordPswdResetTokens,
  thirdpartyUserToTenant,
  jwtSigningKeys,
  passwordlessUsers,
  passwordlessUserToTenant,
  dashboardUsers,
  dashboardUserSessions,
  emailverificationTokens,
  thirdpartyUsers,
  passwordlessDevices,
  passwordlessCodes,
  totpUsedCodes,
  oauthLogoutChallenges,
  totpUserDevices,
  sessionInfo,
  tenantThirdpartyProviders,
  tenantThirdpartyProviderClients,
} from "./schema";

export const oauthSessionsRelations = relations(oauthSessions, ({ one }) => ({
  oauthClient: one(oauthClients, {
    fields: [oauthSessions.appId],
    references: [oauthClients.appId],
  }),
}));

export const oauthClientsRelations = relations(
  oauthClients,
  ({ one, many }) => ({
    oauthSessions: many(oauthSessions),
    oauthM2MTokens: many(oauthM2MTokens),
    app: one(apps, {
      fields: [oauthClients.appId],
      references: [apps.appId],
    }),
    oauthLogoutChallenges: many(oauthLogoutChallenges),
  })
);

export const adminUsersRelations = relations(adminUsers, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [adminUsers.createdById],
    references: [adminUsers.id],
    relationName: "adminUsers_createdById_adminUsers_id",
  }),
  adminUsers_createdById: many(adminUsers, {
    relationName: "adminUsers_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [adminUsers.updatedById],
    references: [adminUsers.id],
    relationName: "adminUsers_updatedById_adminUsers_id",
  }),
  adminUsers_updatedById: many(adminUsers, {
    relationName: "adminUsers_updatedById_adminUsers_id",
  }),
  adminPermissions_createdById: many(adminPermissions, {
    relationName: "adminPermissions_createdById_adminUsers_id",
  }),
  adminPermissions_updatedById: many(adminPermissions, {
    relationName: "adminPermissions_updatedById_adminUsers_id",
  }),
  adminRoles_createdById: many(adminRoles, {
    relationName: "adminRoles_createdById_adminUsers_id",
  }),
  adminRoles_updatedById: many(adminRoles, {
    relationName: "adminRoles_updatedById_adminUsers_id",
  }),
  strapiApiTokens_createdById: many(strapiApiTokens, {
    relationName: "strapiApiTokens_createdById_adminUsers_id",
  }),
  strapiApiTokens_updatedById: many(strapiApiTokens, {
    relationName: "strapiApiTokens_updatedById_adminUsers_id",
  }),
  strapiApiTokenPermissions_createdById: many(strapiApiTokenPermissions, {
    relationName: "strapiApiTokenPermissions_createdById_adminUsers_id",
  }),
  strapiApiTokenPermissions_updatedById: many(strapiApiTokenPermissions, {
    relationName: "strapiApiTokenPermissions_updatedById_adminUsers_id",
  }),
  strapiTransferTokens_createdById: many(strapiTransferTokens, {
    relationName: "strapiTransferTokens_createdById_adminUsers_id",
  }),
  strapiTransferTokens_updatedById: many(strapiTransferTokens, {
    relationName: "strapiTransferTokens_updatedById_adminUsers_id",
  }),
  strapiTransferTokenPermissions_createdById: many(
    strapiTransferTokenPermissions,
    {
      relationName: "strapiTransferTokenPermissions_createdById_adminUsers_id",
    }
  ),
  strapiTransferTokenPermissions_updatedById: many(
    strapiTransferTokenPermissions,
    {
      relationName: "strapiTransferTokenPermissions_updatedById_adminUsers_id",
    }
  ),
  files_createdById: many(files, {
    relationName: "files_createdById_adminUsers_id",
  }),
  files_updatedById: many(files, {
    relationName: "files_updatedById_adminUsers_id",
  }),
  uploadFolders_createdById: many(uploadFolders, {
    relationName: "uploadFolders_createdById_adminUsers_id",
  }),
  uploadFolders_updatedById: many(uploadFolders, {
    relationName: "uploadFolders_updatedById_adminUsers_id",
  }),
  strapiReleases_createdById: many(strapiReleases, {
    relationName: "strapiReleases_createdById_adminUsers_id",
  }),
  strapiReleases_updatedById: many(strapiReleases, {
    relationName: "strapiReleases_updatedById_adminUsers_id",
  }),
  strapiReleaseActions_createdById: many(strapiReleaseActions, {
    relationName: "strapiReleaseActions_createdById_adminUsers_id",
  }),
  strapiReleaseActions_updatedById: many(strapiReleaseActions, {
    relationName: "strapiReleaseActions_updatedById_adminUsers_id",
  }),
  i18NLocales_createdById: many(i18NLocale, {
    relationName: "i18NLocale_createdById_adminUsers_id",
  }),
  i18NLocales_updatedById: many(i18NLocale, {
    relationName: "i18NLocale_updatedById_adminUsers_id",
  }),
  upPermissions_createdById: many(upPermissions, {
    relationName: "upPermissions_createdById_adminUsers_id",
  }),
  upPermissions_updatedById: many(upPermissions, {
    relationName: "upPermissions_updatedById_adminUsers_id",
  }),
  upRoles_createdById: many(upRoles, {
    relationName: "upRoles_createdById_adminUsers_id",
  }),
  upRoles_updatedById: many(upRoles, {
    relationName: "upRoles_updatedById_adminUsers_id",
  }),
  upUsers_createdById: many(upUsers, {
    relationName: "upUsers_createdById_adminUsers_id",
  }),
  upUsers_updatedById: many(upUsers, {
    relationName: "upUsers_updatedById_adminUsers_id",
  }),
  answers_createdById: many(answers, {
    relationName: "answers_createdById_adminUsers_id",
  }),
  answers_updatedById: many(answers, {
    relationName: "answers_updatedById_adminUsers_id",
  }),
  events_createdById: many(events, {
    relationName: "events_createdById_adminUsers_id",
  }),
  events_updatedById: many(events, {
    relationName: "events_updatedById_adminUsers_id",
  }),
  eventGalleries_createdById: many(eventGalleries, {
    relationName: "eventGalleries_createdById_adminUsers_id",
  }),
  eventGalleries_updatedById: many(eventGalleries, {
    relationName: "eventGalleries_updatedById_adminUsers_id",
  }),
  execs_createdById: many(execs, {
    relationName: "execs_createdById_adminUsers_id",
  }),
  execs_updatedById: many(execs, {
    relationName: "execs_updatedById_adminUsers_id",
  }),
  introductions_createdById: many(introductions, {
    relationName: "introductions_createdById_adminUsers_id",
  }),
  introductions_updatedById: many(introductions, {
    relationName: "introductions_updatedById_adminUsers_id",
  }),
  partners_createdById: many(partners, {
    relationName: "partners_createdById_adminUsers_id",
  }),
  partners_updatedById: many(partners, {
    relationName: "partners_updatedById_adminUsers_id",
  }),
  peoples_createdById: many(peoples, {
    relationName: "peoples_createdById_adminUsers_id",
  }),
  peoples_updatedById: many(peoples, {
    relationName: "peoples_updatedById_adminUsers_id",
  }),
  previousTeams_createdById: many(previousTeams, {
    relationName: "previousTeams_createdById_adminUsers_id",
  }),
  previousTeams_updatedById: many(previousTeams, {
    relationName: "previousTeams_updatedById_adminUsers_id",
  }),
  purchasableMemberships_createdById: many(purchasableMemberships, {
    relationName: "purchasableMemberships_createdById_adminUsers_id",
  }),
  purchasableMemberships_updatedById: many(purchasableMemberships, {
    relationName: "purchasableMemberships_updatedById_adminUsers_id",
  }),
  questions_createdById: many(questions, {
    relationName: "questions_createdById_adminUsers_id",
  }),
  questions_updatedById: many(questions, {
    relationName: "questions_updatedById_adminUsers_id",
  }),
  somePhotos_createdById: many(somePhotos, {
    relationName: "somePhotos_createdById_adminUsers_id",
  }),
  somePhotos_updatedById: many(somePhotos, {
    relationName: "somePhotos_updatedById_adminUsers_id",
  }),
  tickets_createdById: many(tickets, {
    relationName: "tickets_createdById_adminUsers_id",
  }),
  tickets_updatedById: many(tickets, {
    relationName: "tickets_updatedById_adminUsers_id",
  }),
  userTickets_createdById: many(userTickets, {
    relationName: "userTickets_createdById_adminUsers_id",
  }),
  userTickets_updatedById: many(userTickets, {
    relationName: "userTickets_updatedById_adminUsers_id",
  }),
  values_createdById: many(values, {
    relationName: "values_createdById_adminUsers_id",
  }),
  values_updatedById: many(values, {
    relationName: "values_updatedById_adminUsers_id",
  }),
  adminUsersRolesLinks: many(adminUsersRolesLinks),
}));

export const adminPermissionsRelations = relations(
  adminPermissions,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [adminPermissions.createdById],
      references: [adminUsers.id],
      relationName: "adminPermissions_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [adminPermissions.updatedById],
      references: [adminUsers.id],
      relationName: "adminPermissions_updatedById_adminUsers_id",
    }),
    adminPermissionsRoleLinks: many(adminPermissionsRoleLinks),
  })
);

export const adminRolesRelations = relations(adminRoles, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [adminRoles.createdById],
    references: [adminUsers.id],
    relationName: "adminRoles_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [adminRoles.updatedById],
    references: [adminUsers.id],
    relationName: "adminRoles_updatedById_adminUsers_id",
  }),
  adminPermissionsRoleLinks: many(adminPermissionsRoleLinks),
  adminUsersRolesLinks: many(adminUsersRolesLinks),
}));

export const strapiApiTokensRelations = relations(
  strapiApiTokens,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiApiTokens.createdById],
      references: [adminUsers.id],
      relationName: "strapiApiTokens_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiApiTokens.updatedById],
      references: [adminUsers.id],
      relationName: "strapiApiTokens_updatedById_adminUsers_id",
    }),
    strapiApiTokenPermissionsTokenLinks: many(
      strapiApiTokenPermissionsTokenLinks
    ),
  })
);

export const strapiApiTokenPermissionsRelations = relations(
  strapiApiTokenPermissions,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiApiTokenPermissions.createdById],
      references: [adminUsers.id],
      relationName: "strapiApiTokenPermissions_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiApiTokenPermissions.updatedById],
      references: [adminUsers.id],
      relationName: "strapiApiTokenPermissions_updatedById_adminUsers_id",
    }),
    strapiApiTokenPermissionsTokenLinks: many(
      strapiApiTokenPermissionsTokenLinks
    ),
  })
);

export const strapiTransferTokensRelations = relations(
  strapiTransferTokens,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiTransferTokens.createdById],
      references: [adminUsers.id],
      relationName: "strapiTransferTokens_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiTransferTokens.updatedById],
      references: [adminUsers.id],
      relationName: "strapiTransferTokens_updatedById_adminUsers_id",
    }),
    strapiTransferTokenPermissionsTokenLinks: many(
      strapiTransferTokenPermissionsTokenLinks
    ),
  })
);

export const strapiTransferTokenPermissionsRelations = relations(
  strapiTransferTokenPermissions,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiTransferTokenPermissions.createdById],
      references: [adminUsers.id],
      relationName: "strapiTransferTokenPermissions_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiTransferTokenPermissions.updatedById],
      references: [adminUsers.id],
      relationName: "strapiTransferTokenPermissions_updatedById_adminUsers_id",
    }),
    strapiTransferTokenPermissionsTokenLinks: many(
      strapiTransferTokenPermissionsTokenLinks
    ),
  })
);

export const filesRelations = relations(files, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [files.createdById],
    references: [adminUsers.id],
    relationName: "files_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [files.updatedById],
    references: [adminUsers.id],
    relationName: "files_updatedById_adminUsers_id",
  }),
  filesRelatedMorphs: many(filesRelatedMorphs),
  filesFolderLinks: many(filesFolderLinks),
}));

export const uploadFoldersRelations = relations(
  uploadFolders,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [uploadFolders.createdById],
      references: [adminUsers.id],
      relationName: "uploadFolders_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [uploadFolders.updatedById],
      references: [adminUsers.id],
      relationName: "uploadFolders_updatedById_adminUsers_id",
    }),
    filesFolderLinks: many(filesFolderLinks),
    uploadFoldersParentLinks_folderId: many(uploadFoldersParentLinks, {
      relationName: "uploadFoldersParentLinks_folderId_uploadFolders_id",
    }),
    uploadFoldersParentLinks_invFolderId: many(uploadFoldersParentLinks, {
      relationName: "uploadFoldersParentLinks_invFolderId_uploadFolders_id",
    }),
  })
);

export const strapiReleasesRelations = relations(
  strapiReleases,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiReleases.createdById],
      references: [adminUsers.id],
      relationName: "strapiReleases_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiReleases.updatedById],
      references: [adminUsers.id],
      relationName: "strapiReleases_updatedById_adminUsers_id",
    }),
    strapiReleaseActionsReleaseLinks: many(strapiReleaseActionsReleaseLinks),
  })
);

export const strapiReleaseActionsRelations = relations(
  strapiReleaseActions,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [strapiReleaseActions.createdById],
      references: [adminUsers.id],
      relationName: "strapiReleaseActions_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [strapiReleaseActions.updatedById],
      references: [adminUsers.id],
      relationName: "strapiReleaseActions_updatedById_adminUsers_id",
    }),
    strapiReleaseActionsReleaseLinks: many(strapiReleaseActionsReleaseLinks),
  })
);

export const i18NLocaleRelations = relations(i18NLocale, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [i18NLocale.createdById],
    references: [adminUsers.id],
    relationName: "i18NLocale_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [i18NLocale.updatedById],
    references: [adminUsers.id],
    relationName: "i18NLocale_updatedById_adminUsers_id",
  }),
}));

export const upPermissionsRelations = relations(
  upPermissions,
  ({ one, many }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [upPermissions.createdById],
      references: [adminUsers.id],
      relationName: "upPermissions_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [upPermissions.updatedById],
      references: [adminUsers.id],
      relationName: "upPermissions_updatedById_adminUsers_id",
    }),
    upPermissionsRoleLinks: many(upPermissionsRoleLinks),
  })
);

export const upRolesRelations = relations(upRoles, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [upRoles.createdById],
    references: [adminUsers.id],
    relationName: "upRoles_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [upRoles.updatedById],
    references: [adminUsers.id],
    relationName: "upRoles_updatedById_adminUsers_id",
  }),
  upPermissionsRoleLinks: many(upPermissionsRoleLinks),
  upUsersRoleLinks: many(upUsersRoleLinks),
}));

export const upUsersRelations = relations(upUsers, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [upUsers.createdById],
    references: [adminUsers.id],
    relationName: "upUsers_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [upUsers.updatedById],
    references: [adminUsers.id],
    relationName: "upUsers_updatedById_adminUsers_id",
  }),
  upUsersRoleLinks: many(upUsersRoleLinks),
}));

export const answersRelations = relations(answers, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [answers.createdById],
    references: [adminUsers.id],
    relationName: "answers_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [answers.updatedById],
    references: [adminUsers.id],
    relationName: "answers_updatedById_adminUsers_id",
  }),
  answersPeopleTicketLinks: many(answersPeopleTicketLinks),
  answersQuestionIdLinks: many(answersQuestionIdLinks),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [events.createdById],
    references: [adminUsers.id],
    relationName: "events_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [events.updatedById],
    references: [adminUsers.id],
    relationName: "events_updatedById_adminUsers_id",
  }),
  ticketsEventIdLinks: many(ticketsEventIdLinks),
}));

export const eventGalleriesRelations = relations(eventGalleries, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [eventGalleries.createdById],
    references: [adminUsers.id],
    relationName: "eventGalleries_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [eventGalleries.updatedById],
    references: [adminUsers.id],
    relationName: "eventGalleries_updatedById_adminUsers_id",
  }),
}));

export const execsRelations = relations(execs, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [execs.createdById],
    references: [adminUsers.id],
    relationName: "execs_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [execs.updatedById],
    references: [adminUsers.id],
    relationName: "execs_updatedById_adminUsers_id",
  }),
}));

export const introductionsRelations = relations(introductions, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [introductions.createdById],
    references: [adminUsers.id],
    relationName: "introductions_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [introductions.updatedById],
    references: [adminUsers.id],
    relationName: "introductions_updatedById_adminUsers_id",
  }),
}));

export const partnersRelations = relations(partners, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [partners.createdById],
    references: [adminUsers.id],
    relationName: "partners_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [partners.updatedById],
    references: [adminUsers.id],
    relationName: "partners_updatedById_adminUsers_id",
  }),
}));

export const peoplesRelations = relations(peoples, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [peoples.createdById],
    references: [adminUsers.id],
    relationName: "peoples_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [peoples.updatedById],
    references: [adminUsers.id],
    relationName: "peoples_updatedById_adminUsers_id",
  }),
  userTicketsPeopleIdLinks: many(userTicketsPeopleIdLinks),
}));

export const previousTeamsRelations = relations(previousTeams, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [previousTeams.createdById],
    references: [adminUsers.id],
    relationName: "previousTeams_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [previousTeams.updatedById],
    references: [adminUsers.id],
    relationName: "previousTeams_updatedById_adminUsers_id",
  }),
}));

export const purchasableMembershipsRelations = relations(
  purchasableMemberships,
  ({ one }) => ({
    adminUser_createdById: one(adminUsers, {
      fields: [purchasableMemberships.createdById],
      references: [adminUsers.id],
      relationName: "purchasableMemberships_createdById_adminUsers_id",
    }),
    adminUser_updatedById: one(adminUsers, {
      fields: [purchasableMemberships.updatedById],
      references: [adminUsers.id],
      relationName: "purchasableMemberships_updatedById_adminUsers_id",
    }),
  })
);

export const questionsRelations = relations(questions, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [questions.createdById],
    references: [adminUsers.id],
    relationName: "questions_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [questions.updatedById],
    references: [adminUsers.id],
    relationName: "questions_updatedById_adminUsers_id",
  }),
  answersQuestionIdLinks: many(answersQuestionIdLinks),
  questionsTicketIdLinks: many(questionsTicketIdLinks),
}));

export const somePhotosRelations = relations(somePhotos, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [somePhotos.createdById],
    references: [adminUsers.id],
    relationName: "somePhotos_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [somePhotos.updatedById],
    references: [adminUsers.id],
    relationName: "somePhotos_updatedById_adminUsers_id",
  }),
}));

export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [tickets.createdById],
    references: [adminUsers.id],
    relationName: "tickets_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [tickets.updatedById],
    references: [adminUsers.id],
    relationName: "tickets_updatedById_adminUsers_id",
  }),
  questionsTicketIdLinks: many(questionsTicketIdLinks),
  ticketsEventIdLinks: many(ticketsEventIdLinks),
  userTicketsTicketIdLinks: many(userTicketsTicketIdLinks),
}));

export const userTicketsRelations = relations(userTickets, ({ one, many }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [userTickets.createdById],
    references: [adminUsers.id],
    relationName: "userTickets_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [userTickets.updatedById],
    references: [adminUsers.id],
    relationName: "userTickets_updatedById_adminUsers_id",
  }),
  answersPeopleTicketLinks: many(answersPeopleTicketLinks),
  userTicketsPeopleIdLinks: many(userTicketsPeopleIdLinks),
  userTicketsTicketIdLinks: many(userTicketsTicketIdLinks),
}));

export const valuesRelations = relations(values, ({ one }) => ({
  adminUser_createdById: one(adminUsers, {
    fields: [values.createdById],
    references: [adminUsers.id],
    relationName: "values_createdById_adminUsers_id",
  }),
  adminUser_updatedById: one(adminUsers, {
    fields: [values.updatedById],
    references: [adminUsers.id],
    relationName: "values_updatedById_adminUsers_id",
  }),
}));

export const adminPermissionsRoleLinksRelations = relations(
  adminPermissionsRoleLinks,
  ({ one }) => ({
    adminPermission: one(adminPermissions, {
      fields: [adminPermissionsRoleLinks.permissionId],
      references: [adminPermissions.id],
    }),
    adminRole: one(adminRoles, {
      fields: [adminPermissionsRoleLinks.roleId],
      references: [adminRoles.id],
    }),
  })
);

export const adminUsersRolesLinksRelations = relations(
  adminUsersRolesLinks,
  ({ one }) => ({
    adminUser: one(adminUsers, {
      fields: [adminUsersRolesLinks.userId],
      references: [adminUsers.id],
    }),
    adminRole: one(adminRoles, {
      fields: [adminUsersRolesLinks.roleId],
      references: [adminRoles.id],
    }),
  })
);

export const strapiApiTokenPermissionsTokenLinksRelations = relations(
  strapiApiTokenPermissionsTokenLinks,
  ({ one }) => ({
    strapiApiTokenPermission: one(strapiApiTokenPermissions, {
      fields: [strapiApiTokenPermissionsTokenLinks.apiTokenPermissionId],
      references: [strapiApiTokenPermissions.id],
    }),
    strapiApiToken: one(strapiApiTokens, {
      fields: [strapiApiTokenPermissionsTokenLinks.apiTokenId],
      references: [strapiApiTokens.id],
    }),
  })
);

export const strapiTransferTokenPermissionsTokenLinksRelations = relations(
  strapiTransferTokenPermissionsTokenLinks,
  ({ one }) => ({
    strapiTransferTokenPermission: one(strapiTransferTokenPermissions, {
      fields: [
        strapiTransferTokenPermissionsTokenLinks.transferTokenPermissionId,
      ],
      references: [strapiTransferTokenPermissions.id],
    }),
    strapiTransferToken: one(strapiTransferTokens, {
      fields: [strapiTransferTokenPermissionsTokenLinks.transferTokenId],
      references: [strapiTransferTokens.id],
    }),
  })
);

export const filesRelatedMorphsRelations = relations(
  filesRelatedMorphs,
  ({ one }) => ({
    file: one(files, {
      fields: [filesRelatedMorphs.fileId],
      references: [files.id],
    }),
  })
);

export const filesFolderLinksRelations = relations(
  filesFolderLinks,
  ({ one }) => ({
    file: one(files, {
      fields: [filesFolderLinks.fileId],
      references: [files.id],
    }),
    uploadFolder: one(uploadFolders, {
      fields: [filesFolderLinks.folderId],
      references: [uploadFolders.id],
    }),
  })
);

export const uploadFoldersParentLinksRelations = relations(
  uploadFoldersParentLinks,
  ({ one }) => ({
    uploadFolder_folderId: one(uploadFolders, {
      fields: [uploadFoldersParentLinks.folderId],
      references: [uploadFolders.id],
      relationName: "uploadFoldersParentLinks_folderId_uploadFolders_id",
    }),
    uploadFolder_invFolderId: one(uploadFolders, {
      fields: [uploadFoldersParentLinks.invFolderId],
      references: [uploadFolders.id],
      relationName: "uploadFoldersParentLinks_invFolderId_uploadFolders_id",
    }),
  })
);

export const strapiReleaseActionsReleaseLinksRelations = relations(
  strapiReleaseActionsReleaseLinks,
  ({ one }) => ({
    strapiReleaseAction: one(strapiReleaseActions, {
      fields: [strapiReleaseActionsReleaseLinks.releaseActionId],
      references: [strapiReleaseActions.id],
    }),
    strapiRelease: one(strapiReleases, {
      fields: [strapiReleaseActionsReleaseLinks.releaseId],
      references: [strapiReleases.id],
    }),
  })
);

export const upPermissionsRoleLinksRelations = relations(
  upPermissionsRoleLinks,
  ({ one }) => ({
    upPermission: one(upPermissions, {
      fields: [upPermissionsRoleLinks.permissionId],
      references: [upPermissions.id],
    }),
    upRole: one(upRoles, {
      fields: [upPermissionsRoleLinks.roleId],
      references: [upRoles.id],
    }),
  })
);

export const upUsersRoleLinksRelations = relations(
  upUsersRoleLinks,
  ({ one }) => ({
    upUser: one(upUsers, {
      fields: [upUsersRoleLinks.userId],
      references: [upUsers.id],
    }),
    upRole: one(upRoles, {
      fields: [upUsersRoleLinks.roleId],
      references: [upRoles.id],
    }),
  })
);

export const answersPeopleTicketLinksRelations = relations(
  answersPeopleTicketLinks,
  ({ one }) => ({
    answer: one(answers, {
      fields: [answersPeopleTicketLinks.answerId],
      references: [answers.id],
    }),
    userTicket: one(userTickets, {
      fields: [answersPeopleTicketLinks.userTicketId],
      references: [userTickets.id],
    }),
  })
);

export const answersQuestionIdLinksRelations = relations(
  answersQuestionIdLinks,
  ({ one }) => ({
    answer: one(answers, {
      fields: [answersQuestionIdLinks.answerId],
      references: [answers.id],
    }),
    question: one(questions, {
      fields: [answersQuestionIdLinks.questionId],
      references: [questions.id],
    }),
  })
);

export const questionsTicketIdLinksRelations = relations(
  questionsTicketIdLinks,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsTicketIdLinks.questionId],
      references: [questions.id],
    }),
    ticket: one(tickets, {
      fields: [questionsTicketIdLinks.ticketId],
      references: [tickets.id],
    }),
  })
);

export const ticketsEventIdLinksRelations = relations(
  ticketsEventIdLinks,
  ({ one }) => ({
    ticket: one(tickets, {
      fields: [ticketsEventIdLinks.ticketId],
      references: [tickets.id],
    }),
    event: one(events, {
      fields: [ticketsEventIdLinks.eventId],
      references: [events.id],
    }),
  })
);

export const userTicketsPeopleIdLinksRelations = relations(
  userTicketsPeopleIdLinks,
  ({ one }) => ({
    userTicket: one(userTickets, {
      fields: [userTicketsPeopleIdLinks.userTicketId],
      references: [userTickets.id],
    }),
    people: one(peoples, {
      fields: [userTicketsPeopleIdLinks.peopleId],
      references: [peoples.id],
    }),
  })
);

export const userTicketsTicketIdLinksRelations = relations(
  userTicketsTicketIdLinks,
  ({ one }) => ({
    userTicket: one(userTickets, {
      fields: [userTicketsTicketIdLinks.userTicketId],
      references: [userTickets.id],
    }),
    ticket: one(tickets, {
      fields: [userTicketsTicketIdLinks.ticketId],
      references: [tickets.id],
    }),
  })
);

export const rolesRelations = relations(roles, ({ one, many }) => ({
  app: one(apps, {
    fields: [roles.appId],
    references: [apps.appId],
  }),
  rolePermissions: many(rolePermissions),
}));

export const appsRelations = relations(apps, ({ many }) => ({
  roles: many(roles),
  totpUsers: many(totpUsers),
  tenants: many(tenants),
  userLastActives: many(userLastActive),
  sessionAccessTokenSigningKeys: many(sessionAccessTokenSigningKeys),
  emailverificationVerifiedEmails: many(emailverificationVerifiedEmails),
  userMetadata: many(userMetadata),
  appIdToUserIds: many(appIdToUserId),
  jwtSigningKeys: many(jwtSigningKeys),
  dashboardUsers: many(dashboardUsers),
  oauthClients: many(oauthClients),
}));

export const totpUsersRelations = relations(totpUsers, ({ one, many }) => ({
  app: one(apps, {
    fields: [totpUsers.appId],
    references: [apps.appId],
  }),
  totpUsedCodes: many(totpUsedCodes),
  totpUserDevices: many(totpUserDevices),
}));

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
  app: one(apps, {
    fields: [tenants.appId],
    references: [apps.appId],
  }),
  userRoles: many(userRoles),
  keyValues: many(keyValue),
  emailverificationTokens: many(emailverificationTokens),
  passwordlessDevices: many(passwordlessDevices),
  totpUsedCodes: many(totpUsedCodes),
  allAuthRecipeUsers: many(allAuthRecipeUsers),
  sessionInfos: many(sessionInfo),
}));

export const userLastActiveRelations = relations(userLastActive, ({ one }) => ({
  app: one(apps, {
    fields: [userLastActive.appId],
    references: [apps.appId],
  }),
}));

export const sessionAccessTokenSigningKeysRelations = relations(
  sessionAccessTokenSigningKeys,
  ({ one }) => ({
    app: one(apps, {
      fields: [sessionAccessTokenSigningKeys.appId],
      references: [apps.appId],
    }),
  })
);

export const emailverificationVerifiedEmailsRelations = relations(
  emailverificationVerifiedEmails,
  ({ one }) => ({
    app: one(apps, {
      fields: [emailverificationVerifiedEmails.appId],
      references: [apps.appId],
    }),
  })
);

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.appId],
      references: [roles.appId],
    }),
  })
);

export const userMetadataRelations = relations(userMetadata, ({ one }) => ({
  app: one(apps, {
    fields: [userMetadata.appId],
    references: [apps.appId],
  }),
}));

export const tenantFirstFactorsRelations = relations(
  tenantFirstFactors,
  ({ one }) => ({
    tenantConfig: one(tenantConfigs, {
      fields: [tenantFirstFactors.connectionUriDomain],
      references: [tenantConfigs.connectionUriDomain],
    }),
  })
);

export const tenantConfigsRelations = relations(tenantConfigs, ({ many }) => ({
  tenantFirstFactors: many(tenantFirstFactors),
  tenantRequiredSecondaryFactors: many(tenantRequiredSecondaryFactors),
  tenantThirdpartyProviders: many(tenantThirdpartyProviders),
}));

export const tenantRequiredSecondaryFactorsRelations = relations(
  tenantRequiredSecondaryFactors,
  ({ one }) => ({
    tenantConfig: one(tenantConfigs, {
      fields: [tenantRequiredSecondaryFactors.connectionUriDomain],
      references: [tenantConfigs.connectionUriDomain],
    }),
  })
);

export const emailpasswordUserToTenantRelations = relations(
  emailpasswordUserToTenant,
  ({ one }) => ({
    allAuthRecipeUser: one(allAuthRecipeUsers, {
      fields: [emailpasswordUserToTenant.appId],
      references: [allAuthRecipeUsers.appId],
    }),
  })
);

export const allAuthRecipeUsersRelations = relations(
  allAuthRecipeUsers,
  ({ one, many }) => ({
    emailpasswordUserToTenants: many(emailpasswordUserToTenant),
    thirdpartyUserToTenants: many(thirdpartyUserToTenant),
    passwordlessUserToTenants: many(passwordlessUserToTenant),
    tenant: one(tenants, {
      fields: [allAuthRecipeUsers.appId],
      references: [tenants.appId],
    }),
    appIdToUserId_appId: one(appIdToUserId, {
      fields: [allAuthRecipeUsers.appId],
      references: [appIdToUserId.appId],
      relationName: "allAuthRecipeUsers_appId_appIdToUserId_appId",
    }),
  })
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  tenant: one(tenants, {
    fields: [userRoles.appId],
    references: [tenants.appId],
  }),
}));

export const useridMappingRelations = relations(useridMapping, ({ one }) => ({
  appIdToUserId: one(appIdToUserId, {
    fields: [useridMapping.appId],
    references: [appIdToUserId.appId],
  }),
}));

export const appIdToUserIdRelations = relations(
  appIdToUserId,
  ({ one, many }) => ({
    useridMappings: many(useridMapping),
    appIdToUserId: one(appIdToUserId, {
      fields: [appIdToUserId.appId],
      references: [appIdToUserId.appId],
      relationName: "appIdToUserId_appId_appIdToUserId_appId",
    }),
    appIdToUserIds: many(appIdToUserId, {
      relationName: "appIdToUserId_appId_appIdToUserId_appId",
    }),
    app: one(apps, {
      fields: [appIdToUserId.appId],
      references: [apps.appId],
    }),
    emailpasswordUsers: many(emailpasswordUsers),
    emailpasswordPswdResetTokens: many(emailpasswordPswdResetTokens),
    passwordlessUsers: many(passwordlessUsers),
    thirdpartyUsers: many(thirdpartyUsers),
    allAuthRecipeUsers_appId: many(allAuthRecipeUsers, {
      relationName: "allAuthRecipeUsers_appId_appIdToUserId_appId",
    }),
  })
);

export const oauthM2MTokensRelations = relations(oauthM2MTokens, ({ one }) => ({
  oauthClient: one(oauthClients, {
    fields: [oauthM2MTokens.appId],
    references: [oauthClients.appId],
  }),
}));

export const keyValueRelations = relations(keyValue, ({ one }) => ({
  tenant: one(tenants, {
    fields: [keyValue.appId],
    references: [tenants.appId],
  }),
}));

export const emailpasswordUsersRelations = relations(
  emailpasswordUsers,
  ({ one }) => ({
    appIdToUserId: one(appIdToUserId, {
      fields: [emailpasswordUsers.appId],
      references: [appIdToUserId.appId],
    }),
  })
);

export const emailpasswordPswdResetTokensRelations = relations(
  emailpasswordPswdResetTokens,
  ({ one }) => ({
    appIdToUserId: one(appIdToUserId, {
      fields: [emailpasswordPswdResetTokens.appId],
      references: [appIdToUserId.appId],
    }),
  })
);

export const thirdpartyUserToTenantRelations = relations(
  thirdpartyUserToTenant,
  ({ one }) => ({
    allAuthRecipeUser: one(allAuthRecipeUsers, {
      fields: [thirdpartyUserToTenant.appId],
      references: [allAuthRecipeUsers.appId],
    }),
  })
);

export const jwtSigningKeysRelations = relations(jwtSigningKeys, ({ one }) => ({
  app: one(apps, {
    fields: [jwtSigningKeys.appId],
    references: [apps.appId],
  }),
}));

export const passwordlessUsersRelations = relations(
  passwordlessUsers,
  ({ one }) => ({
    appIdToUserId: one(appIdToUserId, {
      fields: [passwordlessUsers.appId],
      references: [appIdToUserId.appId],
    }),
  })
);

export const passwordlessUserToTenantRelations = relations(
  passwordlessUserToTenant,
  ({ one }) => ({
    allAuthRecipeUser: one(allAuthRecipeUsers, {
      fields: [passwordlessUserToTenant.appId],
      references: [allAuthRecipeUsers.appId],
    }),
  })
);

export const dashboardUsersRelations = relations(
  dashboardUsers,
  ({ one, many }) => ({
    app: one(apps, {
      fields: [dashboardUsers.appId],
      references: [apps.appId],
    }),
    dashboardUserSessions: many(dashboardUserSessions),
  })
);

export const dashboardUserSessionsRelations = relations(
  dashboardUserSessions,
  ({ one }) => ({
    dashboardUser: one(dashboardUsers, {
      fields: [dashboardUserSessions.appId],
      references: [dashboardUsers.appId],
    }),
  })
);

export const emailverificationTokensRelations = relations(
  emailverificationTokens,
  ({ one }) => ({
    tenant: one(tenants, {
      fields: [emailverificationTokens.appId],
      references: [tenants.appId],
    }),
  })
);

export const thirdpartyUsersRelations = relations(
  thirdpartyUsers,
  ({ one }) => ({
    appIdToUserId: one(appIdToUserId, {
      fields: [thirdpartyUsers.appId],
      references: [appIdToUserId.appId],
    }),
  })
);

export const passwordlessCodesRelations = relations(
  passwordlessCodes,
  ({ one }) => ({
    passwordlessDevice: one(passwordlessDevices, {
      fields: [passwordlessCodes.appId],
      references: [passwordlessDevices.appId],
    }),
  })
);

export const passwordlessDevicesRelations = relations(
  passwordlessDevices,
  ({ one, many }) => ({
    passwordlessCodes: many(passwordlessCodes),
    tenant: one(tenants, {
      fields: [passwordlessDevices.appId],
      references: [tenants.appId],
    }),
  })
);

export const totpUsedCodesRelations = relations(totpUsedCodes, ({ one }) => ({
  totpUser: one(totpUsers, {
    fields: [totpUsedCodes.appId],
    references: [totpUsers.appId],
  }),
  tenant: one(tenants, {
    fields: [totpUsedCodes.appId],
    references: [tenants.appId],
  }),
}));

export const oauthLogoutChallengesRelations = relations(
  oauthLogoutChallenges,
  ({ one }) => ({
    oauthClient: one(oauthClients, {
      fields: [oauthLogoutChallenges.appId],
      references: [oauthClients.appId],
    }),
  })
);

export const totpUserDevicesRelations = relations(
  totpUserDevices,
  ({ one }) => ({
    totpUser: one(totpUsers, {
      fields: [totpUserDevices.appId],
      references: [totpUsers.appId],
    }),
  })
);

export const sessionInfoRelations = relations(sessionInfo, ({ one }) => ({
  tenant: one(tenants, {
    fields: [sessionInfo.appId],
    references: [tenants.appId],
  }),
}));

export const tenantThirdpartyProviderClientsRelations = relations(
  tenantThirdpartyProviderClients,
  ({ one }) => ({
    tenantThirdpartyProvider: one(tenantThirdpartyProviders, {
      fields: [tenantThirdpartyProviderClients.connectionUriDomain],
      references: [tenantThirdpartyProviders.connectionUriDomain],
    }),
  })
);

export const tenantThirdpartyProvidersRelations = relations(
  tenantThirdpartyProviders,
  ({ one, many }) => ({
    tenantThirdpartyProviderClients: many(tenantThirdpartyProviderClients),
    tenantConfig: one(tenantConfigs, {
      fields: [tenantThirdpartyProviders.connectionUriDomain],
      references: [tenantConfigs.connectionUriDomain],
    }),
  })
);
