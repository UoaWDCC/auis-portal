'use strict';

/**
 * some-photo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::some-photo.some-photo');
