'use strict';

/**
 * exec service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::exec.exec');
