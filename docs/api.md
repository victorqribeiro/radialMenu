## Classes

<dl>
<dt><a href="#RadialMenu">RadialMenu</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#NO_SHADOW">NO_SHADOW</a> : <code><a href="#ShadowStyle">ShadowStyle</a></code></dt>
<dd></dd>
<dt><a href="#TWOPI">TWOPI</a> : <code>number</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setContextShadowStyle">setContextShadowStyle(context, shadowStyle)</a></dt>
<dd><p>Set styles in the canvas rendering context.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RadialMenuOptions">RadialMenuOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#RadialMenuButton">RadialMenuButton</a> : <code>Object</code></dt>
<dd><p>The options to draw menu button.</p>
</dd>
<dt><a href="#ShadowStyle">ShadowStyle</a> : <code>Object</code></dt>
<dd><p>The style to render a shadow in the canvas</p>
</dd>
<dt><a href="#GradientObject">GradientObject</a> : <code>Object</code></dt>
<dd><p>The gradient object color.</p>
</dd>
</dl>

<a name="RadialMenu"></a>

## RadialMenu
**Kind**: global class  

* [RadialMenu](#RadialMenu)
    * [new RadialMenu(options)](#new_RadialMenu_new)
    * [.getButton(xPixel, yPixel)](#RadialMenu+getButton) ⇒ <code>any</code>

<a name="new_RadialMenu_new"></a>

### new RadialMenu(options)

| Param | Type | Description |
| --- | --- | --- |
| options | [<code>RadialMenuOptions</code>](#RadialMenuOptions) | The radial menu options. |

<a name="RadialMenu+getButton"></a>

### radialMenu.getButton(xPixel, yPixel) ⇒ <code>any</code>
Get the button concerne by the event

**Kind**: instance method of [<code>RadialMenu</code>](#RadialMenu)  
**Returns**: <code>any</code> - The button concerne by the event or undefined if no button.  

| Param | Type | Description |
| --- | --- | --- |
| xPixel | <code>number</code> | The x coordinate of the pixel mouse event. |
| yPixel | <code>number</code> | The y coordinate of the pixel mouse event. |

<a name="NO_SHADOW"></a>

## NO\_SHADOW : [<code>ShadowStyle</code>](#ShadowStyle)
**Kind**: global constant  
<a name="TWOPI"></a>

## TWOPI : <code>number</code>
**Kind**: global constant  
<a name="setContextShadowStyle"></a>

## setContextShadowStyle(context, shadowStyle)
Set styles in the canvas rendering context.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>CanvasRenderingContext2D</code> | The canvas context. |
| shadowStyle | [<code>ShadowStyle</code>](#ShadowStyle) | The shadow style to set in the context. |

<a name="RadialMenuOptions"></a>

## RadialMenuOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [fontFamily] | <code>string</code> | <code>&quot;FontAwesome&quot;</code> | Name of the font to be used. On this example 'FontAwesome' is being used for the free icons. But you can use your own font. |
| [fontSize] | <code>number</code> | <code>14</code> | Size of the icons (text) used on the buttons. |
| [innerCircle] | <code>number</code> | <code>50</code> | Inner circle of the radial menu. Use 0 (zero) if you don't want a hole in the menu. |
| [outerCircle] | <code>number</code> | <code>100</code> | Outer circle of the radial menu. The outer circle and the inner circle will defined how thick is the menu. |
| [rotation] | <code>number</code> | <code>PI/2</code> | This value rotate the whole "circle" of the menu, if you want to better "align" the button's divison. *This value is in radians and always rotate the menu clock wise*. |
| [shadowBlur] | <code>number</code> | <code>10</code> | How blurred is the shadow. |
| [shadowColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>rgba(0,0,0,0.2)</code> | Shadow color. |
| [shadowOffsetX] | <code>number</code> | <code>3</code> | Horizontal displacement of the shadow. |
| [shadowOffsetY] | <code>number</code> | <code>3</code> | Vertical displacement of the shadow. |
| [backgroundColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#EEE</code> | The background color of the button. |
| [hoverBackgroundColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) |  | The hover background color of the button. |
| [borderColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#FFF</code> | The border color of the button. |
| [textColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#000</code> | Color of the text inside the button. |
| [hoverTextColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) |  | Color of the text inside the button when hover. |
| [textBorderColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>transparent</code> | Color of the contour of the text inside the button. |
| [textShadowColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>transparent</code> | Color of the shadow of the text. |
| [textShadowBlur] | <code>number</code> | <code>0</code> | How blurred is the shadow of the text. |
| [textShadowOffsetX] | <code>number</code> | <code>0</code> | Horizontal displacement of the shadow of the text. |
| [textShadowOffsetY] | <code>number</code> | <code>0</code> | Vertical displacement of the shadow of the text. |
| [buttonGap] | <code>number</code> | <code>0</code> | Gap between buttons. *This value is in radians*. |
| [buttons] | [<code>Array.&lt;RadialMenuButton&gt;</code>](#RadialMenuButton) |  | The menu button list. |
| [hoverAction] | <code>function</code> |  | Callback when hover state changes. When menu is hovered, true argument is set when fucntion call, false otherwise. |
| [posX] | <code>number</code> | <code>0</code> | Horizontal position of the menu. This value is used only when the menu is fixed on the page. |
| [posY] | <code>number</code> | <code>0</code> | Vertical position of the menu. This value is used only when the menu is fixed on the page. |
| [isFixed] | <code>boolean</code> | <code>false</code> | This value determine if the menu will be fixed on the page. This is usefull in case you're making a web app that needs a menu that is always visible. |
| [zIndex] | <code>number</code> | <code>9999</code> | This value determine the order the menu will be displayed on the page. Higher values means that it is in front of elements with lower values. |

<a name="RadialMenuButton"></a>

## RadialMenuButton : <code>Object</code>
The options to draw menu button.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [backgroundColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#EEE</code> | The background color of the button. |
| [borderColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#FFF</code> | The border color of the button. |
| [textColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>#000</code> | Color of the text inside the button. |
| [textBorderColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>transparent</code> | Color of the contour of the text inside the button. |
| [textShadowColor] | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | <code>transparent</code> | Color of the shadow of the text. |
| [textShadowBlur] | <code>number</code> | <code>0</code> | How blurred is the shadow of the text. |
| [textShadowOffsetX] | <code>number</code> | <code>0</code> | Horizontal displacement of the shadow of the text. |
| [textShadowOffsetY] | <code>number</code> | <code>0</code> | Vertical displacement of the shadow of the text. |
| [buttonGap] | <code>number</code> | <code>0</code> | Gap between buttons. *This value is in radians*. |
| action | <code>function</code> |  | is a function that will be called when the button is clicked. |
| text | <code>string</code> |  | is the icon that will be displayed. [see the font-visualizer.html for the unicode of each icon *'\uf000'*](https://victorribeiro.com/radialMenu/font-visualizer.html). |

<a name="ShadowStyle"></a>

## ShadowStyle : <code>Object</code>
The style to render a shadow in the canvas

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| color | <code>DOMString</code> \| [<code>GradientObject</code>](#GradientObject) | The shadow color. |
| blur | <code>number</code> | The shadow blur. |
| offsetX | <code>number</code> | The shadow X offset. |
| offsetY | <code>number</code> | The shadow Y offset. |

<a name="GradientObject"></a>

## GradientObject : <code>Object</code>
The gradient object color.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| gradient | <code>string</code> | The gradient type : radial - *from inside to outside*   linear1 - *top to bottom*   linear2 - *left to right*   linear3 - *top left to bottom right*   linear4 - *bottom left to top right* |
| colors | <code>Array.&lt;DOMColor&gt;</code> | An array which contains initial et final gradient color. |

