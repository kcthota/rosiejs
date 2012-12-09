/**
* @class NavItem. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.NavItem({
*		title:'Home', 
*		id:'home', 
*		href: '#', 
*		events: {
*			'click': 'onclick'
*		},
*		onclick: function() {
*			return false;
*			console.log('clicked');
*		}
*	})
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property menu Dropdown menu object to be displayed
* @property header True to set the item as nav header.<br/>Default:false. menu attribute would be ignored
* @property title title text to be displayed for this navitem
* @property isDivider Set true to get a menu divider.<br/>Default false
*/
Rosie.UI.NavItem = Rosie.UI.Component.extend( {
	menu: null,
	
	header: false,
	
	isDivider:false,
	
	title:'',
	
	tpl: "{{#if isDivider}}<li class=\"divider\"></li>{{else}}{{#if header}}<li id=\"{{id}}\" class=\"nav-header\">{{title}}</li>{{else}}<li id=\"{{id}}\"{{#if menu}} class=\"dropdown\"{{/if}}><a{{#if menu}} class=\"dropdown-toggle\" data-toggle=\"dropdown\"{{/if}} href=\"{{#if href}}{{href}}{{else}}#{{/if}}\">{{title}}{{#if menu}} <b class=\"caret\"></b>{{/if}}</a></li>{{/if}}{{/if}}",
	
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
		
		me.$el.attr(me.attributes);
		me.addClass(me.cls);							
		
		if(me.menu) {
			me.menu.$el.appendTo(me.el);
		}
		
		return me;
	}
	
});