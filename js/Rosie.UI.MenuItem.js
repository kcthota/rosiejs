/**
* @class MenuItem. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.MenuItem( {
*			text:'Item1',
*			events: {
*				'click': 'onclick'
*			},
*			onclick: function() {
*				console.log('clicked');
*			}
*		})
* @example
*	new Rosie.UI.MenuItem( {
*			isDivider:true
*	})
* @example
*	new Rosie.UI.MenuItem( {
*			text:'Item2',
*			menu: new Rosie.UI.Menu( {
*				type:'submenu',
*				menuitems:[
*				new Rosie.UI.MenuItem( {
*					text:'Item1',
*					events: {
*						'click': 'onclick'
*					},
*					onclick: function() {
*						console.log('clicked');
*					}
*				}),
*				new Rosie.UI.MenuItem( {
*					text:'Item2',
*					events: {
*						'click': 'onclick'
*					},
*					onclick: function() {
*						console.log('clicked');
*					}
*				}) 
*				]
*			})
*		})
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property text Menu item text.
* @property linkAttributes Map of attributes to be set to the hyperlink
* @property menu Dropdown menu object to be displayed as submenu for this menuitem
* @property isDivider Set true to get a menu divider.<br/>Default false
* @property linkCls CSS classes to be set to the hyperlink
*/
Rosie.UI.MenuItem = Rosie.UI.Component.extend( {
	
	text: '',
	
	isDivider:false,
	
	linkAttributes:{},
	
	linkCls:null,
	
	menu: null,
	
	tpl: "{{#if isDivider}}<li class=\"divider\"></li>{{else}}<li id=\"{{id}}\"{{#if menu}} class=\"dropdown-submenu\"{{/if}}><a id=\"{{id}}-item\" href=\"#\">{{text}}</a></li>{{/if}}",
	
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
		
		me.$el.children('a#'+me.id+"-item").attr(me.linkAttributes);				
		me.addClass(me.linkCls, me.$el.children('a#'+me.id+"-item"));
		if(me.menu) {
			me.menu.$el.insertAfter(me.$el.children('a#'+me.id+"-item"));				
		}	
		
		return me;
	}
	
});