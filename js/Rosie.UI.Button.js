/**
* @class Button. Extends {@link Rosie.UI.Component}
* @example
*	var button=new Rosie.UI.Button({		
*		renderTo:'#id1',
*		text:'Button',
*		btnStyle:'primary',
*		events: {
*			'click': 'onclick',
*			'enabled': function() { console.log('enabled'); },
*			'disabled': function() { console.log('disabled'); }
*		},
*		onclick: function() {
*			console.log('clicked');
*		}
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property disabled Disabled<br/>Default:false
* @property block Block rendering. Span the entire width of parent element.<br/>Default: false
* @property btnStyle Button style. <br/>Default:null<br/>Supported values null, 'primary', 'info', 'success', 'warning', 'danger', 'inverse', 'link'
* @property scale Button Scale <br/>Default: null<br/>Supported values null,'mini', 'small', 'large'
* @property renderTo Element to render the component to.
* @property loadingText Data loading text
* @property toggleButton Enable toggle<br/>Default false
* @property toggleControlType Set toggle control type.<br/>Default 'button'<br/>Supported values 'button', 'dropdown'
* @property type Button type.<br/>Default 'button'
*/
Rosie.UI.Button = Rosie.UI.Component.extend( {
	
	
	disabled: false,
	
	block: false,
	
	btnStyle: null,
	
	scale: null,
	
	loadingText:null,
	
	toggleButton: false,
	
	type:'button',
	
	toggleControlType:'button',
	
	
	tpl: '<button type=\"{{type}}\" id=\"{{id}}\" class=\"btn{{#if block}} btn-block{{/if}}{{#if disabled}} disabled{{/if}}{{#if btnStyle}} btn-{{btnStyle}}{{/if}}{{#if scale}} btn-{{scale}}{{/if}}\" {{#if loadingText}}data-loading-text=\"{{loadingText}}\"{{/if}}{{#if toggleButton}} data-toggle=\"{{toggleControlType}}\"{{/if}}>{{text}}{{{ShowCaret toggleControlType}}}</button>',
	
	/**
	* init function
	*/
	initialize: function(options) {
		this.constructor.__super__.initialize.apply(this, [options]);
	},	
	
	/**
	* @function 
	* @private
	* @description Method to return resolved template
	*/
	_resolveTpl: function() {
		var me=this;
		Handlebars.registerHelper('ShowCaret', function(control) {
			if(control === 'dropdown') 
				return '<b class="caret"></b>';
			else
				return '';
		});		
		return (Handlebars.compile(me.tpl))(me);
	},
	
	/**
	* @name Rosie.UI.Button#rendered
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
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	},
	
	/**
	* @name Rosie.UI.Button#toggle
	* @function 
	* @description Toggles button push state
	*/
	toggle: function() {		
		this.$el.button('toggle');
	},
	
	/**
	* @name Rosie.UI.Button#setLoading
	* @function 
	* @description Sets loading state for button
	*/
	setLoading: function() {
		this.$el.button('loading');
	},	
	
	/**
	* @name Rosie.UI.Button#reset
	* @function 
	* @description Reset button state
	*/
	reset: function() {
		this.$el.button('reset');
	},
	
	/**
	* @name Rosie.UI.Button#setText
	* @function 
	* @param {String} value
	* @description Resets button state - swaps text to any data defined text state
	*/
	setText: function(val) {
		var me = this;
		me.text = val;
		me.$el.text(val);
	},
	
	/**
	* @name Rosie.UI.Button#disable	
	* @function 
	* @description Disables the button
	*/
	disable: function() {
		var me = this, btn=$("#"+me.id);
		if(!btn.hasClass("disabled")) {
			btn.addClass("disabled");
			me.disabled = !me.disabled;
			me.$el.trigger('disabled');
		}
	},
	
	/**
	* @name Rosie.UI.Button#disabled
	* @event 
	* @description Triggers when button is disabled
	*/
	
	/**
	* @name Rosie.UI.Button#enable
	* @function 
	* @description Enables the button
	*/
	enable: function() {
		var me = this, btn=$("#"+me.id);
		
		if(btn.hasClass("disabled")) {
			btn.toggleClass("disabled");
			me.disabled = !me.disabled;
			me.$el.trigger('enabled');
		}
	}
	
	/**
	* @name Rosie.UI.Button#enabled
	* @event 
	* @description Triggers when button is enabled
	*/
	
	

});