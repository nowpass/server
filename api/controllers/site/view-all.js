/**
 * ElementController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: 'View all Sites for this user',

    exits: {
        success: {
            description: 'Get the sites.'
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

        let allowedOrderBy = ['id ASC', 'id DESC', 'createdAt ASC', 'createdAt DESC',
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
                {url: {'contains': filterSearch}},
                {tags: {'contains': filterSearch}},
            );
        }

        let total = await Site.count({
            where: where
        });

        let sites = await Site.find({
            where: where,
            skip: offset,
            limit: limit,
            sort: orderBy
        });

        sails.log.info('Query for Site by ' + this.req.me.id + '.');

        return exits.success({
            sites: sites,
            total: total
        });
    },

};

