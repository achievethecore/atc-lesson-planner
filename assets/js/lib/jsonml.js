// http://www.codeproject.com/Articles/202436/JsonML-Simplified-Array-prototype-toDomNodes
/* Convert JsonML Array form into nested dom nodes */
Array.prototype.toDomNodes = function(p /* parent */, 
f /* function to call on creation of each node */)
{
	if (typeof this[0] === 'string')
	{
		// create element
		var d = document, el = d.createElement(this[0]);

		// resolve parent
		p = (typeof p === 'string') ? d.getElementById(p) : p;

		// a list of attributes to map or 'set directly'
		var am = {id:"id","class":"className",rowspan:"rowSpan",
		colspan:"colSpan",cellpadding:"cellPadding",cellspacing:
		"cellSpacing",maxlength:"maxLength",readonly:"readOnly",
		contenteditable:"contentEditable"};

		// add attributes
		if (this[1] && this[1].constructor == Object) 
		{
			var n = this[1];
			
			for (var a in this[1])
			{
				if (n.hasOwnProperty(a))
				{
					if (a === "style" && typeof el.style.cssText 
					!= "undefined") { el.style.cssText = n[a]; }
					else if (a === "style") { el.style = n[a]; }
					else if (am[a]) { el[am[a]] = n[a]; }
					else if (typeof n[a] != "string") { el[a] = n[a]; } // not a string, set directly (expando)
					else { el.setAttribute(a, n[a]); }
				}
			}
		}

		// insert element (must be inserted before function call, 
		// otherwise .parentNode does not exist)
		if (p) { p.appendChild(el); }
		
		// pass each node to a function (attributes will exist, 
		// but not innerText||children. can be used for adding events, etc.)
		if (typeof f === 'function') { f.apply(el); }
		
		for (var i=1,l=this.length;i<l;i++) 
		{
			var n = this[i], c = n.constructor;

			if (c === String) // add text node
			{
				el.appendChild(d.createTextNode(n));
			}
			else if (c === Array) // add children
			{
				n.toDomNodes(el, f);
			}
		}

		return el;
	}

	return null;
};