/**
* @class Radio. Extends {@link Rosie.UI.Component}
* @example
*   new Rosie.UI.Radio( {
*		name:'radio1',
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
* @property label Radio field label
* @property checked Field checked state. <br/>set true to check field by default
* @property inline Render the radios to same line. <br/>Default false
* @property inputCls CSS classes to be set to the input field
*/
Rosie.UI.Radio = Rosie.UI.Component.extend( {
	label: '',
	
	inputAttributes: {},
	
	checked: false,
	
	inline:false,
	
	tpl: "<label id=\"{{id}}\" class=\"radio {{#if inline}}inline{{/if}}\"><input type=\"radio\" name=\"{{name}}\" id=\"{{id}}-input\" value=\"{{value}}\"{{#if checked}} checked=\"checked\"{{/if}}>{{#if label}}{{label}}{{/if}}</label>",
	
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
	* @name Rosie.UI.Radio#rendered
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
		
		me.$el.children('input#'+me.id+"-input").attr(me.inputAttributes);		
		me.addClass(me.inputCls, me.$el.children('input#'+me.id+"-input"));	 			

		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	},
	
	/**
	* @name Rosie.UI.Radio#getInputField
	* @function 
	* @description Returns the actual input field object 
	*/
	getInputField: function() {
	
		return this.$el.children('input#'+me.id+"-input");
	}

});