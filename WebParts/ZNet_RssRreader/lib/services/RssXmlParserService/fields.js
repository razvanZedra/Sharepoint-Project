var Fields = (function () {
    function Fields() {
    }
    Fields.mapItunesField = function (f) {
        return ['itunes:' + f, f];
    };
    Fields.feed = [
        ['author', 'creator'],
        ['dc:publisher', 'publisher'],
        ['dc:creator', 'creator'],
        ['dc:source', 'source'],
        ['dc:title', 'title'],
        ['dc:type', 'type'],
        'title',
        'description',
        'author',
        'pubDate',
        'webMaster',
        'managingEditor',
        'generator',
        'link',
        'language',
        'copyright',
        'lastBuildDate',
        'docs',
        'generator',
        'ttl',
        'rating',
        'skipHours',
        'skipDays',
    ];
    Fields.item = [
        ['author', 'creator'],
        ['dc:creator', 'creator'],
        ['dc:date', 'date'],
        ['dc:language', 'language'],
        ['dc:rights', 'rights'],
        ['dc:source', 'source'],
        ['dc:title', 'title'],
        'title',
        'link',
        'pubDate',
        'author',
        'content:encoded',
        'enclosure',
        'dc:creator',
        'dc:date',
        'comments',
    ];
    Fields.podcastFeed = ([
        'author',
        'subtitle',
        'summary',
        'explicit'
    ]).map(Fields.mapItunesField);
    Fields.podcastItem = ([
        'author',
        'subtitle',
        'summary',
        'explicit',
        'duration',
        'image',
        'episode',
        'image',
        'season',
        'keywords',
    ]).map(Fields.mapItunesField);
    return Fields;
}());
export { Fields };
//# sourceMappingURL=fields.js.map