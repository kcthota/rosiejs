/**
* @class CheckBox. Extends {@link Rosie.UI.Component}
* @example
*   new Rosie.UI.CheckBox( {
*		name:'checkbox1',
*		value:'1',
*		label: 'Name',
*		inputAttributes: {
*			'attribute1':'value1',
*			'attribute2':'value2'
*		},		
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property inputAttributes Map of attributes to be set to the input field
* @property label CheckBox field label.
* @property checked Field checked state. <br/>set true to check field by default
* @property inline Render the checkboxes to same line. <br/>Default false
* @property inputCls CSS classes to be set to the input field
*/
Rosie.UI.CheckBox = Rosie.UI.Component.extend( {
	label: '',
	
	inputAttributes: {},
	
	checked: false,
	
	inline:false,
	
	inputCls: null,
	
	tpl: "<label id=\"{{id}}\" class=\"checkbox {{#if inline}}inline{{/if}}\"><input type=\"checkbox\" name=\"{{name}}\" id=\"{{id}}-input\" value=\"{{value}}\"{{#if checked}} checked=\"checked\"{{/if}}>{{#if label}}{{label}}{{/if}}</label>",
	
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
	* @name Rosie.UI.CheckBox#rendered
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
		
		me.$el.attr(me.attributes);	
		me.addClass(me.cls);		
		
		me.$el.children('input#'+me.id+"-input").attr(me.inputAttributes);	
		me.addClass(me.inputCls, me.$el.children('input#'+me.id+"-input"));	 	

		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	},
	
	/**
	* @name Rosie.UI.CheckBox#getInputField
	* @function 
	* @description Returns the actual input field object 
	*/
	getInputField: function() {
	
		return this.$el.children('input#'+me.id+"-input");
	}

});