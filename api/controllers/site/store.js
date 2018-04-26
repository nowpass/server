/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'Store',

    inputs: {
        url: {
            type: 'string',
            defaultsTo: '',
            description: 'URL to store'
        },

        tags: {
            type: 'string',
            description: 'Tags for the URL.',
            defaultsTo: '',
            maxLength: 2000
        },

        status: {
            type: 'number',
            defaultsTo: 1,
            description: 'Status of the Site'
        }
    },

    exits: {
        success: {
            description: 'Site saved.'
        },
    },

    fn: async function (inputs, exits) {
        let id = this.req.param('id', 0);
        let element = null;

        if (!id)
        {
            element = await Site.create(Object.assign({
                user_id: this.req.me.id,
                url: inputs.url,
                tags: inputs.content,
                status: inputs.status
            })).fetch();

            sails.log.info('New Site ' + inputs.url + ' for user ' + this.req.me.id + ' has been added');
        } else {
            element = await Site.update({
                id: id,
                user_id: this.req.me.id
            }, {
                // Should be checked before
                url: inputs.url,
                tags: inputs.content,
                status: inputs.status
            }).fetch();
        }

        return exits.success({
            element: element
        });
    }
};

