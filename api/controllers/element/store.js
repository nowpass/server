/**
 * ElementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'Store',

    inputs: {
        kind: {
            type: 'string',
            isIn: ['website', 'mail', 'router', 'identity', 'server'],
            defaultsTo: 'website',
            description: 'Which kind of account / password element do we store?'
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
            defaultsTo: '',
            maxLength: 2000
        },

        username: {
            type: 'string',
            description: 'Username for the login (if any).',
            defaultsTo: '',
        },

        password: {
            type: 'string',
            description: 'Encoded password for the login',
            defaultsTo: '',
        },

        form_data: {
            type: 'string',
            description: 'Serialized form data where the password was used (Optional)',
            defaultsTo: ''
        },

        comment: {
            type: 'string',
            description: 'Comment for this Item.',
            maxLength: 2000
        },

        status: {
            type: 'number',
            defaultsTo: 1,
            description: 'Status of the Element'
        }

    },

    exits: {
        success: {
            description: 'Element saved.'
        },
    },

    fn: async function (inputs, exits) {
        let title = inputs.title;

        if (title === undefined) {
            throw "titleIsRequired"
        }

        let newElement = await Element.create(Object.assign({
                user_id: this.req.me.id,
                kind: inputs.kind,
                title: inputs.title,
                url: inputs.url,
                username: inputs.username,
                password: inputs.password,
                form_data: inputs.form_data,
                comment: inputs.comment,
                status: inputs.status
            })).fetch();

        sails.log.info('New Element ' + title + ' for user ' + this.req.me.id + ' has been added');

        return exits.success({
            element: newElement
        });
    }
};

