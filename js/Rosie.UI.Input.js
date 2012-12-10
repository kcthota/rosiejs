/**
* @class Input. Extends {@link Rosie.UI.Component}
* @example
* 	new Rosie.UI.Input( {
*		type:'text',
*		placeholder:'Input your name',
*		label: 'Name',		
*		inputAttributes: {
*			'attribute1':'value1',
*			'attribute2':'value2'
*		},		
*		renderTo:'#id1'
*	});
* 
* @example 
* 	new Rosie.UI.Input( {
*		renderTo: '#id1',
*		prepend: [
*			new Rosie.UI.TextAddon( {
*			text: '@'
*			})
*		],
*		append:[
*			new Rosie.UI.Button({		
*				text:'Sign-up',
*				events: {
*					'click': 'onclick'
*				},
*				onclick: function() {
*					console.log('clicked');
*				}
*			})
*		]
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property type Input field type.<br/>Default: 'text'<br/>Supported values: text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color.
* @property placeholder Placeholder text
* @property inputAttributes Map of attributes to be set to the input field
* @property label Input field label text
* @property prepend Array of Addons to be prepended to the input field.<br/>Default null.
* @property append Array of Addons to be appended to the input field.<br/>Default null.
* @property inputCls CSS classes to be set to the input field
* @property disabled Disable the input field.<br/>Default false
*/
Rosie.UI.Input = Rosie.UI.Component.extend( {
	type: 'text',
	
	placeholder: null,
	
	inputAttributes: {},
	
	prepend: null,
	
	append: null,
	
	inputCls: null,
	
	disabled: false,
	
	tpl:"<div id=\"{{id}}\" class=\"{{#if prepend}} input-prepend{{/if}}{{#if append}} input-append{{/if}}\">{{#if label}}<label id=\"{{id}}-lbl\">{{label}}</label>{{/if}}<input type=\"{{type}}\" id=\"{{id}}-text\"{{#if placeholder}} placeholder=\"{{placeholder}}\"{{/if}} {{#if disabled}}disabled{{/if}}></div>",
	
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
	* @name Rosie.UI.Input#rendered
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
		
		var inputField=me.$el.children('input#'+me.id+"-text");
		
		inputField.attr(me.inputAttributes);	

		me.addClass(me.inputCls, inputField);
		
		
		//add any appenders and prepender controls to the field
		me._addPrependersAppenders(inputField);
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	},
	
	/**
	*@private
	*/
	_addPrependersAppenders: function( inputField ) {
		var me=this;
		if(me.prepend) {
			
			_.each(me.prepend, function(addon) {
				addon.$el.insertBefore(inputField);				
			});
		}
		
		if(me.append) {
			
			_.each(me.append, function(addon) {
				addon.$el.insertAfter(inputField);				
			});
		}
	},
	
	/**
	* @name Rosie.UI.Input#getInputField
	* @function 
	* @description Returns the actual input field object 
	*/
	getInputField: function() {
	
		return this.$el.children('input#'+me.id+"-text");
	}

});