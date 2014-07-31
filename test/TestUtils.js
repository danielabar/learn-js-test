define([], function() {

  var guardianApiSuccessResponse = function() {
    return {
      'response': {
        'status': 'ok',
        'total': 2,
        'results': [{
          'webPublicationDate': '2014-07-31T12:26:50Z',
          'webTitle': 'Collaboration between charities can help them embrace risk and adapt',
          'webUrl': 'http://www.theguardian.com/voluntary-sector-network/2014/jul/31/collaboration-charities-embrace-risk',
          'fields': {
            'trailText': '<p>Any innovation carries with it the threat of failure; for charities, that could mean needy people stripped of their services. And yet they must adapt to remain effective</p>',
            'headline': 'Collaboration between charities can help them embrace risk and adapt',
            'thumbnail': 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406721764161/Virgin-London-Marathon-20-006.jpg',
            'byline': 'Harriet Swain'
          }
        }, {
          'webPublicationDate': '2014-07-31T10:45:12Z',
          'webTitle': 'Obama\'s plan to get out the vote by mocking the GOP totally works',
          'webUrl': 'http://www.theguardian.com/commentisfree/2014/jul/31/obama-get-out-the-vote-plan-works-republican-voters',
          'fields': {
            'trailText': '<strong>Ana Marie Cox:</strong> But if the goal of his second term was broad, lasting policy changes, it’s disappointing to everyone except liberal fundraisers',
            'headline': 'Collaboration between charities can help them embrace risk and adapt',
            'thumbnail': 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406756274186/b53ee655-5ded-4364-a674-b8f1f8301327-140x84.jpeg',
            'byline': 'Ana Marie Cox'
          }
        }]
      }
    };
  };

  var guardianApiErrorResponse = function() {
    return {
      'response' : {
        'status' : 'error',
        'message' : 'service not available'
      }
    };
  };

  var newsDisplayItems = function() {
    return [
      {
        publishedDate: '2014-07-31T12:26:50Z',
        title: 'Collaboration between charities can help them embrace risk and adapt',
        url: 'http://www.theguardian.com/voluntary-sector-network/2014/jul/31/collaboration-charities-embrace-risk',
        image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406721764161/Virgin-London-Marathon-20-006.jpg',
        author: 'Harriet Swain',
        content: '<p>Any innovation carries with it the threat of failure; for charities, that could mean needy people stripped of their services. And yet they must adapt to remain effective</p>'
      },
      {
        publishedDate: '2014-07-31T10:45:12Z',
        title: 'Obama\'s plan to get out the vote by mocking the GOP totally works',
        url: 'http://www.theguardian.com/commentisfree/2014/jul/31/obama-get-out-the-vote-plan-works-republican-voters',
        image: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/7/30/1406756274186/b53ee655-5ded-4364-a674-b8f1f8301327-140x84.jpeg',
        author: 'Ana Marie Cox',
        content: '<strong>Ana Marie Cox:</strong> But if the goal of his second term was broad, lasting policy changes, it’s disappointing to everyone except liberal fundraisers'
      }
    ];
  };

  return {
    guardianApiSuccessResponse: guardianApiSuccessResponse,
    guardianApiErrorResponse: guardianApiErrorResponse,
    newsDisplayItems: newsDisplayItems
  };

});