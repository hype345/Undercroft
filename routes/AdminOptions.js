const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const { Group } = require('../Models/group.js');


/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [Group],
  rootPath: '/admin',
  branding: {
    companyName: 'The Undercroft',
  },
  dashboard: {
    handler: async () => {

    },
    component: AdminBro.bundle('../Dashboard/instructions.jsx')
  }
};

module.exports = options;