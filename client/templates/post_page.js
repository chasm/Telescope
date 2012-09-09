Template.post_page.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();

    var post_id = Session.get('selected_post_id');
    var $comment = $('#comment');
    Meteor.call('comment', post_id, null, $comment.val());
    $comment.val('');
  }
};

Template.post_page.show_comment_form = function(){
  return Meteor.user() !== null;
};

Template.post_page.post = function(){
  var post = Posts.findOne(Session.get('selected_post_id'));
  return post;
};

Template.post_page.has_comments = function(){
  var post = Posts.findOne(Session.get('selected_post_id'));
  if(post){
    return Comments.find({post: post._id, parent: null}).count() > 0;
  }
};

Template.post_page.child_comments = function(){
  var post = Posts.findOne(Session.get('selected_post_id'));
  return Comments.find({post: post._id, parent: null});
};

Template.post_page.body_formatted = function(){
  var converter = new Markdown.Converter();
  var html_body=converter.makeHtml(this.body);
  return html_body.autoLink();
}