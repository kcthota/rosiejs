/**
* @class NavBar. Extends {@link Rosie.UI.Component}
* @example
*	var nav = new Rosie.UI.Nav( {
*		type:null,
*		items:[ 
*			new Rosie.UI.NavItem({title:'Rosie'}), 
*			new Rosie.UI.NavItem({title:'Profile'})
*		]
*	});
*	
*	new Rosie.UI.NavBar( {
*		title:'Test',	
*		nav: nav,
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property title Title (Brand) for navbar.<br/>Default '';Specify null for not showing any title
* @property nav Nav object to be shown in the NavBar
*/
Rosie.UI.NavBar = Rosie.UI.Component.extend( {
	
	nav: null,
	
	title:'',
	
	tpl: "<div id=\"{{id}}\" class=\"navbar\"><div class=\"navbar-inner\">{{#if title}}<a class=\"brand\" href=\"#\">{{title}}</a>{{/if}}</div></div>",
	
	/**
	* @function 
	* @private
	* @description Method to return resolved template
	*/
	_resolveTpl: function() {
		var me=this;
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
		
		if(me.nav) {
			var navbarInner=me.$el.children('.navbar-inner');
			me.nav.$el.appendTo(navbarInner);	
		}	
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	}
	
});