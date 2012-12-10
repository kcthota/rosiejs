/**
* @class Menu. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.Menu( {
*		menuitems:[
*		new Rosie.UI.MenuItem( {
*			text:'Item1',
*			events: {
*				'click': 'onclick'
*			},
*			onclick: function() {
*				console.log('clicked');
*			}
*		}),
*		new Rosie.UI.MenuItem( {
*			isDivider:true
*		}),
*		new Rosie.UI.MenuItem( {
*			text:'Item2',
*			events: {
*				'click': 'onclick'
*			},
*			onclick: function() {
*				console.log('clicked');
*			}
*		}) 
*		]
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property menuitems Array of menu item objects to be shown
*/
Rosie.UI.Menu = Rosie.UI.Component.extend( {
	
	type:'menu',
	
	menuitems:[],
	
	tpl: "<ul class=\"dropdown-menu\"></ul>",
	
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
		
		_.each(me.menuitems, function(menuitem) {
				menuitem.$el.appendTo(me.el);				
		});		
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			
			me.$el.trigger('rendered');
		}
		return me;
	}
	
});