/**
 * ElementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'Delete',

    inputs: {
    },

    exits: {
        success: {
            description: 'Note deleted.'
        },
    },

    fn: async function (inputs, exits) {
        let id = this.req.param('id', 0);

        let result = await Note.destroy({
            id: id,
            user_id: this.req.me.id
        });

        return exits.success({
            deleted: true
        });
    }
};

