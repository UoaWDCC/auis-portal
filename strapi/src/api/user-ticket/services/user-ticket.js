'use strict';

/**
 * user-ticket service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-ticket.user-ticket');
