/**
* @class ComboBox. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.ComboBox( {
*		multiple:false,
*		renderTo: '#id1',
*		options:[ 
*			{ value:'1', txt:'One' },
*			{ value:'2', txt:'Two' },
*			{ value:'3', txt:'Three', select:true },
*			{ value:'4', txt:'Four' }
*		]		
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property multiple Allow selecting multiple items.<br/>Default false
* @property options Array of options map to be set of the select box
*/
Rosie.UI.ComboBox = Rosie.UI.Component.extend( {
	multiple: false,
	
	options:[],
	
	tpl: '<select id=\"{{id}}\" {{#if multiple}}multiple=\"multiple\"{{/if}}>{{#each options}}<option{{#if value}} value=\"{{value}}\"{{/if}}{{#if select}} selected{{/if}}>{{txt}}</option>{{/each}}</select>',
	
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
	* @name Rosie.UI.ComboBox#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/
	
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