export default () => ({ // eslint-disable-line

  // link file UUID
  id: '733a2208-c9f2-11e7-ab18-7a9fb7d6163e',

  // canonical URL of the published page
  // https://ig.ft.com/sites/future-of-britain get filled in by the ./configure script
  url: 'https://ig.ft.com/future-of-europe/',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  // publishedDate: new Date(),

  headline: 'A plan for Europe',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'We asked students to share their ideas for the future of Europe. Here are some of the most compelling.',

  // topic: {
  //   name: 'Starter Kit',
  //   url: '/foo',
  // },

  // relatedArticle: {
  //   text: 'Read more »',
  //   url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  // },

  mainImage: {
    title: 'Students\' ideas for the future of Europe',
    description: '',
    url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A5f70a2ae-cba2-11e7-ab18-7a9fb7d6163e?source=ig',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  // byline: [
  //   { name: 'Author One', url: '/foo/bar' },
  //   { name: 'Author Two' },
  // ],

  // Appears in the HTML <title>
  title: 'Student ideas for the Future of Europe',

  // meta data
  description: 'We ask students at six universities across Europe to imagine its future. Here are the finalists.',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A5f70a2ae-cba2-11e7-ab18-7a9fb7d6163e?source=ig&width=1200&fit=cover&format=auto&quality=high',
  socialHeadline: 'Browse our collection of student ideas for the Future of Europe',
  socialSummary: 'We asked students to share their ideas for the future of Europe. Here are some of the most compelling.',

  // TWITTER
  twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A5f70a2ae-cba2-11e7-ab18-7a9fb7d6163e?source=ig&width=1024&fit=cover&format=auto&quality=high',
  twitterCreator: '@FT',
  tweetText: 'We asked students to share their ideas for the future of Europe. Here are some of the most compelling.',
  twitterHeadline: 'Browse our collection of student ideas for the Future of Europe',

  // FACEBOOK
  facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A5f70a2ae-cba2-11e7-ab18-7a9fb7d6163e?source=ig&width=1200&fit=cover&format=auto&quality=high',
  facebookHeadline: 'Browse our collection of student ideas for the Future of Europe',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
