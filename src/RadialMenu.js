/**
 * @typedef {Object} ShadowStyle The style to render a shadow in the canvas
 * @property {DOMString} color The shadow color.
 * @property {number} blur The shadow blur.
 * @property {number} offsetX The shadow X offset.
 * @property {number} offsetY The shadow Y offset.
 */

/** @type {ShadowStyle} */
const NO_SHADOW = { color: 'transparent', blur: 0 };

/** @type {number} */
const TWOPI = 2 * Math.PI;

class RadialMenu {

	constructor({fontFamily, fontSize, innerCircle, outerCircle,
							rotation, shadowBlur, shadowColor, shadowOffsetX, 
							shadowOffsetY, backgroundColor, borderColor, textColor,
							textBorderColor, textShadowColor, textShadowBlur,
							textShadowOffsetX, textShadowOffsetY, buttonGap, buttons,
							posX, posY, isFixed, zIndex} = {}){
		
		this.scale = window.devicePixelRatio;
		
		this.fontFamily = fontFamily || 'FontAwesome';
		
		this.fontSize = fontSize || 14;
		
		if( isNaN(this.fontSize) )
		
			throw "Font size must be a number";
			
		this.innerCircle = !isNaN(innerCircle) ? innerCircle : 50;
		
		this.outerCircle = !isNaN(outerCircle) ? outerCircle : 100;
		
		if( this.innerCircle > this.outerCircle )
		
			throw "Inner circle can't be larger than outer circle";
			
		if( this.innerCircle < 0 )
		
			throw "Inner circle can't be negative";
			
		this.rotation = Math.abs(rotation%TWOPI) || 0;
		
		this.shadowStyle = {

			color: shadowColor || 'rgba(0,0,0,0.5)',

			blur: !isNaN(shadowBlur) ? shadowBlur : 10,

			offsetX: !isNaN(shadowOffsetX) ? shadowOffsetX : 3,

			offsetY: !isNaN(shadowOffsetY) ? shadowOffsetY : 3

		}
		
		this.backgroundColor = backgroundColor || "#EEE";
		
		this.borderColor = borderColor || "#FFF";
		
		this.buttonGap = buttonGap || 0;

		this.textColor = textColor || "#000";
		
		this.textBorderColor = textBorderColor || "transparent";
		
		this.textShadowColor = textShadowColor || "transparent";
		
		this.textShadowBlur = !isNaN(textShadowBlur) ? textShadowBlur : 10;
		
		this.textShadowOffsetX = !isNaN(textShadowOffsetX) ? textShadowOffsetX : 3;
		
		this.textShadowOffsetY = !isNaN(textShadowOffsetY) ? textShadowOffsetY : 3;
		
		this.buttons = buttons || [
		
			{'text': '\uF000', 'action': () => { alert(1) } },
			
			{'text': '\uF001', 'action': () => { alert(2) } },
			
			{'text': '\uF002', 'action': () => { alert(3) } },

		];
		
		this.checkButtons();
		
		this.posX = posX || 0;
		
		this.posY = posY || 0;
		
		this.isFixed = isFixed || false;
		
		this.zIndex = zIndex || 9999;
		
		this.canvas = document.createElement('canvas');
		
		document.body.appendChild( this.canvas );
		
		this.init();
		
		this.draw();
		
		this.addEvent();
		
	}
	
	init(){

		this.step = TWOPI / this.buttons.length;
		
		this.w = (this.outerCircle * 2) + (this.shadowStyle.blur * 2) + (this.shadowStyle.offsetX * 2);
		
		this.h = (this.outerCircle * 2) + (this.shadowStyle.blur * 2) + (this.shadowStyle.offsetY * 2);

		this.canvas.style.display = "none";
		
		this.canvas.style.position = "fixed";
		
		this.canvas.style.width = this.w + "px";
		
		this.canvas.style.height = this.h + "px";
		
		this.canvas.width = this.w * this.scale;
		
		this.canvas.height = this.h * this.scale;
		
		this.c = this.canvas.getContext('2d');
		
		this.c.scale(this.scale, this.scale);
		
		this.c.font = this.fontSize+"px "+this.fontFamily;
		
		this.canvas.style.zIndex = this.zIndex;
		
		this.w2 = this.w >> 1;
		
		this.h2 = this.h >> 1;
		
		if( this.backgroundColor instanceof Object )
		
			this.backgroundColor = this.createGradient(this.backgroundColor);

		if( this.borderColor instanceof Object )
		
			this.borderColor = this.createGradient(this.borderColor);

		if( this.shadowStyle.color instanceof Object )
		
			this.shadowStyle.color = this.createGradient(this.shadowStyle.color);

		if( this.textColor instanceof Object )
		
			this.textColor = this.createGradient(this.textColor);

		if( this.textBorderColor instanceof Object )
		
			this.textBorderColor = this.createGradient(this.textBorderColor);

		if( this.textShadowColor instanceof Object )
		
			this.textShadowColor = this.createGradient(this.textShadowColor);
		
		const margin = this.buttonGap;

		const innerMargin = margin * Math.PI * this.innerCircle / this.outerCircle;
		
		for(let i = 0; i < this.buttons.length; i++){
		
			this.buttons[i]["ini"] = (i * this.step + this.rotation + margin) % TWOPI ;
			
			this.buttons[i]["fin"] = (this.buttons[i]["ini"] + this.step - 2 * margin) % TWOPI;

			this.buttons[i]["ini_inner"] = (i * this.step + this.rotation + innerMargin) % TWOPI ;
			
			this.buttons[i]["fin_inner"] = (this.buttons[i]["ini_inner"] + this.step - 2 * innerMargin) % TWOPI;
			
			if( this.buttons[i]["ini"] > this.buttons[i]["fin"])
			
				this.rest = i;
				
			const a = (this.buttons[i]["ini"] + (this.step)/2 - margin) ;
			
			this.buttons[i]["centerX"] = Math.cos(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2)-this.fontSize/2;
			
			this.buttons[i]["centerY"] = Math.sin(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2)+this.fontSize/4;
			
		}
		
	}
	
	draw(){
	
		const ctx = this.c;

		ctx.imageSmoothingEnabled = true;
		
		ctx.imageSmoothingQuality = "high";
	
		ctx.clearRect(0, 0, this.w, this.h);

		if(!this.buttonGap) {

			setContextShadowStyle(ctx, this.shadowStyle);

			ctx.fillStyle = this.shadowStyle.color;

			ctx.beginPath();
			
			ctx.arc(this.w2, this.h2, this.outerCircle, 0, TWOPI);
			
			ctx.arc(this.w2, this.h2, this.innerCircle, TWOPI, 0, true);
			
			ctx.fill();

		}

		for(let i = 0; i < this.buttons.length; i++){
		
			const button = this.buttons[i];
			
			if(this.buttonGap) {

				setContextShadowStyle(ctx, this.shadowStyle);
				
			} else {
				
				setContextShadowStyle(ctx, NO_SHADOW);

			}

			ctx.fillStyle = "backgroundColor" in button ? button["backgroundColor"] : this.backgroundColor;

			ctx.strokeStyle = "borderColor" in button ? button["borderColor"] : this.borderColor;
			
			ctx.beginPath();
			
			ctx.arc(this.w2,this.h2, this.outerCircle, button["ini"], button["fin"]);
			
			ctx.arc(this.w2,this.h2, this.innerCircle, button["fin_inner"], button["ini_inner"], true);
			
			ctx.closePath();

			ctx.fill();
			
			if(this.buttonGap) {

				setContextShadowStyle(ctx, NO_SHADOW);

			}

			ctx.stroke();
			
			setContextShadowStyle(ctx, {

				color: "textShadowColor" in button ? button["textShadowColor"] : this.textShadowColor,
				
				blur: "textShadowBlur" in button ? button["textShadowBlur"] : this.textShadowBlur,
				
				offsetX: "textShadowOffsetX" in button ? button["textShadowOffsetX"] : this.textShadowOffsetX,
				
				offsetY: "textShadowOffsetY" in button ? button["textShadowOffsetY"] : this.textShadowOffsetY

			});

			ctx.fillStyle = "textColor" in button ? button["textColor"] : this.textColor;

			ctx.strokeStyle = "textBorderColor" in button ? button["textBorderColor"] : this.textBorderColor;

			ctx.save();
			
			ctx.translate(this.w2, this.h2);
			
			ctx.fillText(button["text"], button["centerX"], button["centerY"]);
			
			ctx.strokeText(button["text"], button["centerX"], button["centerY"]);
			
			ctx.restore();
			
		}
		
	}
	
	addEvent(){
	
		this.canvas.addEventListener('click', e => {

			let clickedButton = this.getButton(e.clientX, e.clientY);

			if(clickedButton) {
				clickedButton.action();
			}

		});
		
		if( this.isFixed ){
		
			this.setPos(this.posX, this.posY);
			
			this.show();
			
			return;
			
		}
		
		document.addEventListener("click", e => {
		
			this.hide();
			
		});

		document.oncontextmenu = e => {
		
			e.preventDefault();
			
			this.setPos(e.clientX - this.w2, e.clientY - this.h2);
			
			this.show();
			
		};
	
		const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		
		/* possible fix for iPhone where it doesn't translate long press into a context menu */
		if( iOS ){
			
			document.addEventListener("touchstart", (e)=>{
			
				this.timer = setTimeout(()=>{
					
					this.setPos(e.touches[0].clientX - this.w2, e.touches[0].clientY - this.h2);
			
					this.show();
					
				}, 500); 
				
			});
			
			document.addEventListener("touchend", ()=>{
			
				if( this.timer )
				
					clearTimeout( this.timer );
			
			});
			
		}
		
	}
	
	distance(x1, y1, x2, y2){
	
		return Math.sqrt( ((x2-x1)**2) + ((y2-y1)**2) );
		
	}
	
	hide(){
	
		this.canvas.style.display = "none";
		
	}
	
	show(){
	
		this.draw();
		
		this.canvas.style.display = "block";
		
	}
	
	setPos(x, y){
	
		if( isNaN(x) || isNaN(y) )
		
			throw "X and Y must be numbers";
			
		this.canvas.style.left = x+"px";
		
		this.canvas.style.top = y+"px";
		
	}
	
	createGradient(obj){
	
		if( !("gradient" in obj) )
			throw "Invalid gradient object";
	
		let gradient;
	
		switch( obj["gradient"] ){
			
			case "radial" :
		
					gradient = this.c.createRadialGradient(this.w2, this.h2, this.innerCircle, this.w2, this.h2, this.outerCircle);
				
				break;
		
			case "linear1" :
		
					gradient = this.c.createLinearGradient(0, 0, 0, this.canvas.height);
					
				break;
		
			case "linear2" :
		
					gradient = this.c.createLinearGradient(0, 0, this.canvas.width, 0);
					
				break;
		
			case "linear3" :
		
					gradient = this.c.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
					
				break;
		
			case "linear4" :
		
					gradient = this.c.createLinearGradient(0, this.canvas.height, this.canvas.width, 0);
				
				break;
		
			default :
		
				throw "Invalid gradient value";
			
		}
	
		for(const key in obj['colors']){
			
			if( isNaN(key) || key < 0 || key > 1 )
			
				throw "Invalid color position"
			
			gradient.addColorStop(key, obj['colors'][key]);
				
		}
			
		return gradient;
	
	}
	
	checkButtons(){
	
		if( !(this.buttons instanceof Array) )
		
			throw "Buttons must be an Array of button objects";
			
		for(let i = 0; i < this.buttons.length; i++){
		
			const button = this.buttons[i];
			
			if( !("text" in button) || !("action" in button) )
			
				throw "Button must have a text and an action value";
				
		}
		
	}
	
	addButtons(buttons){
	
		this.buttons = buttons;
		
		this.checkButtons();
		
		this.init();
		
	}

	/**
	 * Get the button concerne by the event
	 * @param {number} xPixel The x coordinate of the pixel mouse event.
	 * @param {number} yPixel The y coordinate of the pixel mouse event.
	 * @return {any} The button concerne by the event or undefined if no button.
	 */
	getButton(xPixel, yPixel) {

		const rect = this.canvas.getBoundingClientRect();
				
		const _x = this.w/rect.width;
		
		const _y = this.h/rect.height;
		
		const posX = ( rect.left + this.w2 ) * _x;
		
		const posY = ( rect.top + this.h2 ) * _y;
		
		const d = this.distance(xPixel, yPixel, posX, posY);
		
		let theButton;

		if( d > this.innerCircle && d < this.outerCircle ){
			
			let a = Math.atan2(yPixel-posY, xPixel-posX);
			
			a = a > 0 ? a : TWOPI+a;

			for(let i = 0; i < this.buttons.length; i++){
				
				if( a >= this.buttons[i]["ini"] && a <= this.buttons[i]["fin"] ){
					
					theButton = this.buttons[i];
					
					break;
					
				}
				
			}

			if( !theButton && this.rest ) {

				if(a < this.buttons[this.rest]["ini"]) {

					a += TWOPI;

				}

				if(a >= this.buttons[this.rest]["ini"] && a <= this.buttons[this.rest]["fin"] + TWOPI) {
					
					theButton = this.buttons[this.rest];

				}

			}
			
		}
	
		return theButton;

	}
	
}

/**
 * Set styles in the canvas rendering context.
 * @param {CanvasRenderingContext2D} context The canvas context.
 * @param {ShadowStyle} shadowStyle The shadow style to set in the context.
 */
function setContextShadowStyle(context, shadowStyle) {
	context.shadowColor = shadowStyle.color;
	context.shadowBlur = shadowStyle.blur;
	context.shadowOffsetX = shadowStyle.offsetX;
	context.shadowOffsetY = shadowStyle.offsetY;
}