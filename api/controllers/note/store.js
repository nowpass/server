/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'Store',

    inputs: {
        group: {
            type: 'string',
            defaultsTo: '',
            description: 'Optional grouping.'
        },

        title: {
            type: 'string',
            defaultsTo: '',
            description: 'Optional title of the Note',
            maxLength: 500
        },

        url: {
            type: 'string',
            description: 'URL (if any) where the note belongs to.',
            defaultsTo: '',
            maxLength: 2000
        },

        content: {
            type: 'string',
            description: 'Encoded Note / Text',
            defaultsTo: '',
        },

        status: {
            type: 'number',
            defaultsTo: 1,
            description: 'Status of the Note'
        }

    },

    exits: {
        success: {
            description: 'Note saved.'
        },
    },

    fn: async function (inputs, exits) {
        let id = this.req.param('id', 0);
        let element = null;

        if (!id)
        {
            element = await Note.create(Object.assign({
                user_id: this.req.me.id,
                group: inputs.group,
                title: inputs.title,
                url: inputs.url,
                content: inputs.content,
                status: inputs.status
            })).fetch();

            sails.log.info('New Note ' + inputs.title + ' for user ' + this.req.me.id + ' has been added');
        } else {
            element = await Note.update({
                id: id,
                user_id: this.req.me.id
            }, {
                // Should be checked before
                group: inputs.group,
                title: inputs.title,
                url: inputs.url,
                content: inputs.content,
                status: inputs.status
            }).fetch();
        }

        return exits.success({
            element: element
        });
    }
};

