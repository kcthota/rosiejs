/**
* @class BreadCrumbs. Extends {@link Rosie.UI.Component}
* @example
*   new Rosie.UI.BreadCrumbs( {
*		pages:[ {title:'Home', href:'#'},{title:'Page1', href:'#'},{title:'Page2'}],
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property pages Array of pages to be added to the breadcrumb.<br/>Last object in the array would be shown as active in the breadcrumb<br/>Example page object: {title:'Home', href:'home.jsp'}
*/
Rosie.UI.BreadCrumbs = Rosie.UI.Component.extend( {
	
	pages: [],

	tpl: "<ul id=\"{{id}}\" class=\"breadcrumb\">{{#list pages}}{{/list}}</ul>",
	
	/**
	* @function 
	* @private
	* @description Method to return resolved template
	*/
	_resolveTpl: function() {
		var me=this;
		Handlebars.registerHelper('list', function(items, options) {
			var out = '';

			for(var i=0; i<items.length; i++) {				
				if(i==items.length-1) {
					out = out + "<li class=\"active\">" + items[i].title + "</li>";	
				} else {
					out = out + "<li><a href=\""+items[i].href+"\">"+items[i].title+"</a><span class=\"divider\">/</span></li>";
				}
			}

			return out;
		});

		return (Handlebars.compile(me.tpl))(me);
	},
	
	
	/**
	* render function
	*/
	render: function() {	
		var me = this, 
		btnDom=this._resolveTpl();	

		me.el=btnDom;		
		me.setElement(me.el);
		
		me.$el.attr(me.attr);
		me.addClass(me.cls);									
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	}
	
});