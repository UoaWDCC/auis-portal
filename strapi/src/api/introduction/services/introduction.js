'use strict';

/**
 * introduction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::introduction.introduction');
