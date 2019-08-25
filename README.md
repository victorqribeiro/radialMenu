# Radial Menu

A highly customizable radial menu.

## About

Work in progress. Writing the documentation and doing some tests.

## Documentation

To create a Radial Menu in your web appm you'll need to pass a configuration object to the constructor. By default a lot of values are already setted, but you can fiddle with every single one of them. Let's talk about each one.

**fontFamily** : String 

Name of the font to be used. On this example 'FontAwesome' is being used for the free icons. But you can use your own font.

*Default:* 'FontAwesome'


**fontSize** : Int 

Size of the icons (text) used on the buttons.

*Default:* 14


**innerCircle** : Int 

Inner circle of the radial menu. Use 0 (zero) if you don't want a hole in the menu.

*Default:* 50



**outerCircle** : Int 

Outer circle of the radial menu. The outer circle and the inner circle will defined how thick is the menu.

*Default:* 100



**rotation** : Int 

This value rotate the whole "circle" of the menu. If you want to better "align" the button's divison. *This value is in radians*.

*Default:* PI/2 (90º)



**shadowBlur** : Int 

How blurred is the shadow.

*Default:* 10



**shadowColor** : Color (rgb, rgba, hex) 

Shadow color.

*Default:* rgba(0,0,0,0.2) *black with alpha*



**shadowOffsetX** : Int
Horizontal displacement of the shadow.
*Default:* 3

**shadowOffsetY** : Int

Vertical displacement of the shadow.

*Default:* 3



### You can edit every single button individually, or you can set values for all of them at once.


**backgroundColor** : Color (rgb, rgba, hex) 

The background color of the button.

*Default:* #EEE *gray*



**borderColor** : Color (rgb, rgba, hex) 

The border color of the button.

*Default:* #FFF *white*



**textColor** : Color (rgb, rgba, hex) 

Color of the text inside the button.

*Default:* #000 *black*



**textBorderColor** : Color (rgb, rgba, hex) 

Color of the contour of the text inside the button.

*Default:* 'transparent'



**textShadowColor** : Color (rgb, rgba, hex) 

Color of the shadow of the text.

*Default:* 'transparent'



**textShadowBlur** : Int

How blurred is the shadow of the text.

*Default:* 0



**textShadowOffsetX** : Int 

Horizontal displacement of the shadow of the text.

*Default:* 0



**textShadowOffsetY** : Int

Vertical displacement of the shadow of the text.

*Default:* 0



**posX** : Int

Horizontal position of the menu. This value is used only when the menu is fixed on the page.

*Default:* 0



**posY** : Int

Vertical position of the menu. This value is used only when the menu is fixed on the page.

*Default:* 0



**isFixed** : Boolean

This value determine if the menu will be fixed on the page. This is usefull in case you're making a web app that needs a menu that is always visible.

*Default:* False



**zIndex** : Int

This value determine the order the menu will be displayed on the page. Higher values means that it is in front of elements with lower values.

*Default:* 9999



**buttons** : Array (of buttons object)

You should pass an array with button objects. A button object is a simple object with only two attributes: text and action.

**text** is the icon that will be displayed. ![see the font-visualizer.html for the unicode of each icon *'\uf000'*](font-visualizer.html)

**action** is a function that will be called when the button is clicked.


```javascript
const ok  = function(){
	alert('ok');
}

const nok = function(){
	alert('not ok');
}

const myButtons = [
	{text: '\uf00c', action: ok},
	{text: '\uf001', action: nok}
];

const radial = new RadialMenu({buttons: myButtons});
```
