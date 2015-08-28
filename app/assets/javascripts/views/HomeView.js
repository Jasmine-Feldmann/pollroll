var HomeView = Backbone.View.extend({

  initialize: function() {
    this.$el = $('#container'),
    this.template = JST["templates/home/homeTemplate"]
  },

  render: function() {
    this.$el.html(this.template);
  }

});
