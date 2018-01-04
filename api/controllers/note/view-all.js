/**
 * ElementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'View all Note for this user',

    exits: {
        success: {
            description: 'Get the notes.'
        },
    },

    /**
     * TODO refactor
     * @param inputs
     * @param exits
     * @returns {Promise<*|{description}|{description, outputVariableName, outputType}|{description, outputType}|{description, outputVariableName, outputExample}|{description, outputExample}>}
     */
    fn: async function (inputs, exits) {
        let offset = this.req.param('offset', 0);
        let limit = this.req.param('limit', 1000);

        // Searches all Columns (kind, title, url, comment, username etc.)
        let filterSearch = this.req.param('search', '');

        // Ordering (Defaults to newest items first (performance))
        let orderBy = this.req.param('order_by', 'id DESC');

        let allowedOrderBy = ['id ASC', 'id DESC', 'createdAt ASC', 'createdAt DESC', 'title ASC', 'title DESC',
            'url ASC', 'url DESC', 'modifiedAt ASC', 'modified DESC'];

        // Check if it's a valid ordering
        if (allowedOrderBy.indexOf(orderBy) === -1) {
            sails.log.warn('Error unknown order by ' + orderBy);
            orderBy = 'id DESC';
        }

        // TODO Check values
        if (limit > 1000) {
            limit = 1000;
        }

        // Build where
        let where = {
            user_id: this.req.me.id,
        };

        if (filterSearch) {
            where.or = [];

            where.or.push(
                {title: {'contains': filterSearch}},
                {url: {'contains': filterSearch}},
                {group: {'contains': filterSearch}},
            );
        }

        console.log(where);

        let total = await Note.count({
            where: where
        });

        let notes = await Note.find({
            where: where,
            skip: offset,
            limit: limit,
            sort: orderBy
        });

        sails.log.info('Query for Notes by ' + this.req.me.id + '.');

        return exits.success({
            notes: notes,
            total: total
        });
    },

};

