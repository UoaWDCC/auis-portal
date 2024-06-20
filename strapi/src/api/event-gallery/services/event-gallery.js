'use strict';

/**
 * event-gallery service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::event-gallery.event-gallery');
