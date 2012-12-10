/**
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