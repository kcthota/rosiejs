/**
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
		el = me.make(me.tagName, me.attr, me.text);
		
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
});