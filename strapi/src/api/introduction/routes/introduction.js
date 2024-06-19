'use strict';

/**
 * introduction router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::introduction.introduction');
