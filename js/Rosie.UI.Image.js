/**
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
});