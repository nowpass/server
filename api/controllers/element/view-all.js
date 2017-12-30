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
        let offset = this.req.param('offset', 0);
        let limit  = this.req.param('limit', 1000);

        // Filter
        let filterKind = this.req.param('kind', '');
        let filterTitle = this.req.param('title', '');
        let filterUrl = this.req.param('url', '');
        let filterComment = this.req.param('comment', '');

        // TODO Check values
        if (limit > 1000) {
            limit = 1000;
        }

        let where = module.exports.filter(this.req.me.id, filterKind, filterTitle, filterUrl, filterComment);

        console.log(where);

        let elements = await Element.find({
            where: where,
            skip: offset,
            limit: limit
        });

        sails.log.info('Query for Elements by ' + this.req.me.id + '.');

        return exits.success({
            elements: elements
        });
    },

    /**
     * Filter for Element
     *
     * @param userId
     * @param filterKind
     * @param filterTitle
     * @param filterUrl
     * @param filterComment
     * @returns {{user_id: *}}
     */
    filter: function (userId, filterKind, filterTitle, filterUrl, filterComment) {
        let where = {
            user_id: userId,
        };

        if (filterKind !== '') {
            where.kind = filterKind;
        }

        if (filterTitle === '' && filterUrl === '' && filterComment === '') {
            return where;
        }

        where.or = [];

        if (filterTitle !== '') {
            where.or.push({title : {
                'contains': filterTitle
            }});
        }

        if (filterUrl !== '') {
            where.or.push({url : {
                'contains': filterUrl
            }});
        }

        if (filterComment !== '') {
            where.or.push({comment : {
                'contains': filterComment
            }});
        }

        return where;
    }
};

