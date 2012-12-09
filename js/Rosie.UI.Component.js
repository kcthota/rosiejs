/**
* @class Base UI Component class. All UI components would be extending this class.
*
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property attributes Attributes to be set to element dom
* @property cls CSS classes to be set for the component
*/
Rosie.UI.Component = Backbone.View.extend( {
	attributes: {},
	
	cls:null,
	
	initialize: function(options) {
		var me = this;			
		_.extend(me,options);		
		if(!me.id)
			me.id = _.uniqueId(Rosie.prefix);
		this.render();
	},
	getDOM: function() {
		return this.$el.html();
	},
	addClass: function(cls, el) {
		if(cls) {
			var obj=this.$el;
			if(el) {
				obj=el;
			}
			obj.addClass(cls);
		}
	}
	
});