/**
 * ElementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'View all Elements for this user',

    exits: {
        success: {
            description: 'Get the elements.'
        },
    },


    fn: async function (inputs, exits) {
        let id = this.req.param('id', 0);

        if (id === undefined || id === 0) {
            throw "undefinedId";
        }

        let element = await Element.find({
            where: { user_id: this.req.me.id, id: id }
        });

        sails.log.info('Query for Element' + id + ' by ' + this.req.me.id + '.');

        return exits.success({
            element: element
        });
    }
};

