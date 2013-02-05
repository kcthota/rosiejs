/**
* @author <a href="mailto:kcthota@gmail.com">Krishna Chaitanya Thota</a>
* @property collection backbone collection
* @property columns Array of column definitions in the format as { dataAttr:'name', text:'Name' }
*/
Rosie.UI.Grid = Rosie.UI.Component.extend( {
	collection: null,
	
	columns: [],
	
	tpl: "<table id=\"{{id}}\" class=\"table\"><thead>{{#gridheaders columns}}{{/gridheaders}}</thead><tbody>{{#datarows collection}}{{/datarows}}</tbody></table>",
	
	_resolveTpl: function() {
		var me=this;
		Handlebars.registerHelper('gridheaders', function(columns, options) {
			var out = '<tr>';			
			for(var i=0; i < columns.length; i++) {		
				out =  out + "<th>" + columns[i].text +"</th>";							
			}	
			out = out + "</tr>";			
			return out;
		});
		
		Handlebars.registerHelper('datarows', function(items, options) {
			var out = '';			
			for(var i=0; i<items.length; i++) {		
				out = out + "<tr>";
				for(var j=0; j< me.columns.length; j++) {
					out =  out + "<td>" + items.at(i).get(me.columns[j].dataAttr) +"</td>";
				}		
				out = out + "</tr>";				
			}			
			return out;
		});

		return (Handlebars.compile(me.tpl))(me);
	},
	/**
	* @name Rosie.UI.Grid#rendered
	* @event 
	* @description Triggers after the grid is rendered.
	*/
	render: function() {
		var me = this, btnDom = me._resolveTpl();
		
		me.el=btnDom;		
		me.setElement(me.el);
		
		me.$el.attr(me.attr);
		me.addClass(me.cls);									
		
		if(me.renderTo) {
			$(me.renderTo).append(me.el);
			me.$el.trigger('rendered');
		}
		
		return me;
	}
});