/**
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
});