/**
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
});