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

        // Filter Single Elements
        let filterKind = this.req.param('kind', '');
        let filterTitle = this.req.param('title', '');
        let filterUrl = this.req.param('url', '');
        let filterComment = this.req.param('comment', '');

        // Group / Category
        let filterGroup = this.req.param('group', '');

        // Passwords only
        let passwordsOnly = this.req.param('pw_only', '');

        // Ordering (Defaults to newest items first (performance))
        let orderBy = this.req.param('order_by', 'id DESC');

        let allowedOrderBy = ['id ASC', 'id DESC', 'createdAt ASC', 'createdAt DESC', 'title ASC', 'title DESC',
            'url ASC', 'url DESC', 'username ASC', 'username DESC', 'modifiedAt ASC', 'modified DESC'];

        // Check if it's a valid ordering
        if (allowedOrderBy.indexOf(orderBy) === -1) {
            sails.log.warn('Error unknown order by ' + orderBy);
            orderBy = 'id DESC';
        }

        // TODO Check values
        if (limit > 1000) {
            limit = 1000;
        }

        let where = module.exports.filter(
            this.req.me.id,
            filterKind,
            filterTitle,
            filterUrl,
            filterComment,
            filterSearch,
            filterGroup,
            passwordsOnly
        );

        console.log(where);

        let total = await Element.count({
            where: where
        });

        let elements = await Element.find({
            where: where,
            skip: offset,
            limit: limit,
            sort: orderBy
        });

        sails.log.info('Query for Elements by ' + this.req.me.id + '.');

        return exits.success({
            elements: elements,
            total: total
        });
    },

    /**
     * Filter for Element (TODO refactor too many filters now)
     *
     * @param userId
     * @param filterKind
     * @param filterTitle
     * @param filterUrl
     * @param filterComment
     * @returns {{user_id: *}}
     */
    filter: function (userId, filterKind, filterTitle, filterUrl, filterComment, filterSearch, filterGroup, passwordsOnly) {
        let where = {
            user_id: userId,
        };

        if (filterKind) {
            where.kind = filterKind;
        }

        if (passwordsOnly) {
            where.password = {'!=' : ''}
        }

        // Group is an AND
        if (filterGroup) {
            where.group = filterGroup;
        }

        // When there is a global filter active skip others
        if (filterSearch) {
            where.or = [];

            where.or.push(
                {title: {'contains': filterSearch}},
                {url: {'contains': filterSearch}},
                {username: {'contains': filterSearch}},
                {comment: {'contains': filterSearch}},
                {group: {'contains': filterSearch}},
            );

            return where;
        }

        if (!filterTitle && !filterUrl && !filterComment) {
            return where;
        }

        where.or = [];

        if (filterTitle) {
            where.or.push({
                title: {
                    'contains': filterTitle
                }
            });
        }

        if (filterUrl) {
            where.push({
                title: {
                    'contains': filterUrl
                }
            });
        }


        if (filterComment !== '') {
            where.or.push({
                comment: {
                    'contains': filterComment
                }
            });
        }

        return where;
    }
};

