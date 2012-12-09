/*!
Copyright 2012 Krishna Chaitanya Thota (kcthota@gmail.com)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/**
* @namespace Global namespace Rosie
*
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
*
*/
var Rosie= Rosie || {};

/**
* @property Global prefix for generated ids. 
* @default kc_
*/
Rosie.prefix = "kc_";

/**
* @namespace Namespace to hold UI components
*
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
*
*/
Rosie.UI = Rosie.UI || {};/**
* @class Base UI Component class. All UI components would be extending this class.
*
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property attributes Attributes to be set to element dom
* @property cls CSS classes to be set for the component
*/
Rosie.UI.Component = Backbone.View.extend( {
	attributes: {},
	
	cls:null,
	
	initialize: function(options) {
		var me = this;			
		_.extend(me,options);		
		if(!me.id)
			me.id = _.uniqueId(Rosie.prefix);
		this.render();
	},
	getDOM: function() {
		return this.$el.html();
	},
	addClass: function(cls, el) {
		if(cls) {
			var obj=this.$el;
			if(el) {
				obj=el;
			}
			obj.addClass(cls);
		}
	}
	
});/**
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
	
	

});/**
* @class ButtonGroup. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.ButtonGroup({		
*		buttons:[new Rosie.UI.Button({text:'Button1',
*			attributes: {
*				value:'1'
*			},
*			events: {
*				'click': 'onclick'
*			},
*			onclick: function() {
*				console.log('clicked');
*			}}), 
*			new Rosie.UI.Button({text:'Button2',
*			attributes: {
*				value:'2'
*			},
*			events: {
*				'click': 'onclick'
*			},
*			onclick: function() {
*				console.log('clicked');
*			}
*		})],
*		renderTo:'#id1'
*	});
*	@example
*	<b>Button with dropdown menu</b>	
*	var menu = new Rosie.UI.Menu( {
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
*			text:'Item2'
*		}),
*		
*		]
*	});
*	
*	button = new Rosie.UI.ButtonGroup({		
*		buttons:[new Rosie.UI.Button({
*			text:'Button1',
*			toggleButton: true,		
*			toggleControlType:'dropdown'
*		})],
*		menu:menu,
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property toggleStyle Set toggle style.<br/>Default: null<br/>Supported values: null, 'radio', 'checkbox'
* @property buttons Array of button objects to be rendered to the group
* @property menu Dropdown menu object to be displayed
* @property verticalAlign Align the buttons vertically.<br/>Default false
*/
Rosie.UI.ButtonGroup = Rosie.UI.Component.extend( {
	
	toggleStyle:null,
	
	buttons:[],
	
	menu: null,
	
	verticalAlign: false,
	
	tpl:'<div class="btn-group{{#if verticalAlign}} btn-group-vertical{{/if}}" id=\"{{id}}\"{{#if toggleStyle}} data-toggle="buttons-{{toggleStyle}}"{{/if}}></div>',
	
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
	* @name Rosie.UI.ButtonGroup#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/
	
	render: function() {
		var me=this, 
		btnDom=this._resolveTpl();	
		
		me.el=btnDom;
		me.setElement(me.el);
		
		me.$el.attr(me.attributes);
		
		me.addClass(me.cls);
		
		_.each(me.buttons, function(button) {
				button.$el.appendTo(me.el);				
		});
		
		if(me.menu) {
			me.menu.$el.appendTo(me.el);
		}
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			
			me.$el.trigger('rendered');
		}
		return me;
	},
	
	/**
	* @name Rosie.UI.ButtonGroup#getSelected
	* @function 
	* @description Gets selected (Active) buttons from the buttongroup. 
	*/	
	getSelected: function() {
		var me=this;
		return $( "#" + me.id + " > button.active" );
	}
});/**
* @class Image. Extends {@link Rosie.UI.Component}
* @example
* new Rosie.UI.Image( {
*		attributes: {
*			'src':"test.png",
*			'class':"img-rounded" //img-polaroid, img-circle
*		},
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
*/

Rosie.UI.Image = Rosie.UI.Component.extend( {
	tagName: 'img',
	render: function() {
		var me = this,
		el = me.make(me.tagName, me.attributes);
		
		me.el=el;		
		me.setElement(me.el);
		/**
		* @name Rosie.UI.Image#rendered
		* @event 
		* @description Triggers after the component is rendered.
		*/
	
		if(me.renderTo) {
			$(me.renderTo).append(me.el);		
			me.$el.trigger('rendered');
		}
		
		return me;
	}
});/**
* @class IconSprite. Extends {@link Rosie.UI.Component}
* @example
* new Rosie.UI.IconSprite( {
*		attributes: {
*			'class':"icon-tag" //Refer http://twitter.github.com/bootstrap/base-css.html#icons for all icon classes
*		},
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
*/

Rosie.UI.IconSprite = Rosie.UI.Component.extend( {
	
	tagName: 'i',

	/**
	* @name Rosie.UI.IconSprite#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/	
	render: function() {
		var me = this,
		el = me.make(me.tagName, me.attributes);
		
		me.el=el;		
		me.setElement(me.el);
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);	
			me.$el.trigger('rendered');
		}
		
		return me;
	}
});/**
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
		
		me.$el.attr(me.attributes);		


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

});/**
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
	* @name Rosie.UI.Radio#getInputField
	* @function 
	* @description Returns the actual input field object 
	*/
	getInputField: function() {
	
		return this.$el.children('input#'+me.id+"-input");
	}

});/**
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

});/**
* @class TextArea. Extends {@link Rosie.UI.Component}
* @example
* new Rosie.UI.TextArea( {
*		attributes: {
*			'rows':'3',
*			'style':'resize:none'
*		},
*		renderTo:'#id1'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property text Text to be set to the field
*/
Rosie.UI.TextArea = Rosie.UI.Component.extend( {
	
	tagName: 'textarea',
	
	text: '',
	
	/**
	* @name Rosie.UI.TextArea#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/
	render: function() {
		var me = this,		
		el = me.make(me.tagName, me.attributes, me.text);
		
		me.el=el;		
		me.setElement(me.el);		
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);		
			me.$el.trigger('rendered');
		}
		
		return me;
	},
	
	/**
	* @name Rosie.UI.TextArea#getText
	* @function 
	* @description Returns field value
	*/
	getText: function() {
		return this.$el.val();
	},
	
	/**
	* @name Rosie.UI.TextArea#setText
	* @function 
	* @param {String} value
	* @description Sets text to the textarea
	*/
	setText: function(val) {
		if(val) {
			this.$el.val(val);
		}
	}
});/**
* @class TextAddon. Extends {@link Rosie.UI.Component}
* @example
*	new Rosie.UI.TextAddon( {
*			text: '@'
*			});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property text Text to be set to the field
*/
Rosie.UI.TextAddon = Rosie.UI.Component.extend( {
	
	tagName: 'span',
	
	text: '',
		
	render: function() {
		var me = this,		
		el = me.make(me.tagName, {'class':'add-on'}, me.text);		
		
		me.el=el;		
		me.setElement(me.el);
		
		//this would never be rendered as a standalone component. Should always be rendered via a input field.
		
		return me;
	}
});/**
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
		
		me.$el.attr(me.attributes);
		me.addClass(me.cls);		
		
		me.$el.children('a#'+me.id+"-item").attr(me.linkAttributes);				
		me.addClass(me.linkCls, me.$el.children('a#'+me.id+"-item"));
		if(me.menu) {
			me.menu.$el.insertAfter(me.$el.children('a#'+me.id+"-item"));				
		}	
		
		return me;
	}
	
});/**
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
		
		me.$el.attr(me.attributes);			
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
	
});/**
* @class Container. Extends {@link Rosie.UI.Component}
* @example
* <b>Search Widget</b>
* new Rosie.UI.Container( {
*		renderTo: '#id1',
*		cls: 'form-search',
*		items: [
*			new Rosie.UI.Input( {	
*				cls:'search-query',
*				append: [
*					new Rosie.UI.Button( {
*					text: 'Search'
*					})
*				]
*			})
*		]
*	});
*
*	new Rosie.UI.Container( {
*		renderTo: '#id1',
*		cls: 'form-actions',
*		items: [
*			new Rosie.UI.Button( {
*				type: 'submit',
*				text:'Save Changes',
*				btnStyle:'primary'
*			}),
*			new Rosie.UI.Container( {
*				tagName:'span',
*				text:' '
*			}),
*			new Rosie.UI.Button( {	
*				text:'Cancel'
*			})
*		]
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property text Text to be set to the field
* @property items Array of objects to be rendered inside the container
*/
Rosie.UI.Container = Rosie.UI.Component.extend( {
	
	tagName: 'div',
	
	items: [],
	
	text:'',
	/**
	* @name Rosie.UI.Container#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/
	render: function() {
		var me = this,		
		el = me.make(me.tagName, me.attributes, me.text);
		
		me.el=el;		
		me.setElement(me.el);	
		
		me.addClass(me.cls);		
		
		_.each(me.items, function(item) {		
			item.$el.appendTo(me.el)
		});
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);		
			me.$el.trigger('rendered');
		}
		
		return me;
	}
});/**
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
		
		me.$el.attr(me.attributes);			
		me.addClass(me.cls);
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	}
});/**
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
	
});/**
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
		
		me.$el.attr(me.attributes);
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