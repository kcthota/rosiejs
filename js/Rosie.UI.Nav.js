/**
* @class Nav. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.Nav( {
*		items:[ 
*			new Rosie.UI.NavItem({title:'Rosie', header:true }), 
*			new Rosie.UI.NavItem({title:'Profile'}), 
*			new Rosie.UI.NavItem({title:'Log out', menu: menu }) 
*		],		
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property type Nav type.<br/>Default tabs.<br/>Supported values tabs, pills, list
* @property items Array of NavItems to be added to this Nav.
* @property stacked True to stack the NavItems. <br/>Default false
*/
Rosie.UI.Nav = Rosie.UI.Component.extend( {
	
	type: 'tabs',
	
	items: null,
	
	stacked:false, 
	
	tpl: "<ul id=\"{{id}}\" class=\"nav nav-{{type}} {{#if stacked}}nav-stacked{{/if}}\"></ul>",
	
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
		
		_.each(me.items, function(navitem) {		
				navitem.$el.appendTo(me.el);				
		});		
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	}
	
});