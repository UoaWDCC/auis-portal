'use strict';

/**
 * introduction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::introduction.introduction');
