/**
* @class Label. Extends {@link Rosie.UI.Component}
* @example
* <b>Label</b>
* new Rosie.UI.Label( {
*		renderTo: '#id1',
*		text:'lorem ipsum'
*	});
*
* @example
* <b>Headings</b>
* new Rosie.UI.Label( {
*		tagName: 'h2',
*		renderTo: '#id1',
*		text:'lorem ipsum'
*	});
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property text Text to be set to the field
* @property items Array of objects/labels to be rendered inside the container
*/
Rosie.UI.Label = Rosie.UI.Component.extend( {
	
	tagName: 'p',	
	
	text:'',
	/**
	* @name Rosie.UI.Label#rendered
	* @event 
	* @description Triggers after the component is rendered.
	*/
	render: function() {
		var me = this,		
		el = me.make(me.tagName, me.attr, me.text);
		
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
});