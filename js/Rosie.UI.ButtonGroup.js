/**
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
		
		me.$el.attr(me.attr);
		
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
});