/**
 * Element.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

        // (id, kind, user_id, title, url, username, password, form_data, comment, created, modified, status)

        user_id: {
            type: 'number',
            description: 'User ID',
            protect: true,
            required: true,
            example: 42
        },

        kind: {
            type: 'string',
            isIn: ['website', 'mail', 'router', 'identity', 'server'],
            defaultsTo: 'website',
            description: 'Which kind of account / password element do we store?'
        },

        group: {
            type: 'string',
            defaultsTo: '',
            description: 'Optional grouping.'
        },

        title: {
            type: 'string',
            defaultsTo: 'Untitled',
            description: 'Title of the Element',
            maxLength: 500
        },

        url: {
            type: 'string',
            description: 'URL (if any) where the login belongs to.',
            maxLength: 2000
        },

        username: {
            type: 'string',
            description: 'Username for the login (if any).'
        },

        password: {
            type: 'string',
            description: 'Encoded password for the login'
        },

        form_data: {
            type: 'string',
            description: 'Serialized form data where the password was used (Optional)',
            defaultsTo: ''
        },

        comment: {
            type: 'string',
            description: 'Comment for this Item.'
        },

        status: {
            type: 'number',
            defaultsTo: 1,
            description: 'Status of the Element'
        }


        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};

