/**
 * Note.js
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

        group: {
            type: 'string',
            defaultsTo: '',
            description: 'Optional grouping.'
        },

        title: {
            type: 'string',
            defaultsTo: '',
            description: 'Title of the Note',
            maxLength: 500
        },

        url: {
            type: 'string',
            description: 'URL (if any) where the note was taken.',
            maxLength: 2000,
            columnType: 'varchar(2000)'
        },

        content: {
            type: 'string',
            description: 'Encrypted text',
            maxLength: 65500,
            columnType: 'text'
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
