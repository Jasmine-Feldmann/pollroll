var TopicsCollection = Backbone.Collection.extend({

  initialize: function(models) {
    this.model = Topic,
    this.url = "/topics"
  }

})
