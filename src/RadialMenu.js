class RadialMenu {

	constructor({fontFamily, fontSize, innerCircle, outerCircle,
							rotation, shadowBlur, shadowColor, shadowOffsetX, 
							shadowOffsetY, backgroundColor, borderColor, textColor,
							textBorderColor, textShadowColor, textShadowBlur,
							textShadowOffsetX, textShadowOffsetY, buttons,
							posX, posY, isFixed, zIndex} = {}){
							
		this.TWOPI = 2*Math.PI;
		
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
			
		this.rotation = Math.abs(rotation%this.TWOPI) || 0;
		
		this.shadowColor = shadowColor || 'rgba(0,0,0,0.5)';
		
		this.shadowBlur = !isNaN(shadowBlur) ? shadowBlur : 10;
		
		this.shadowOffsetX = !isNaN(shadowOffsetX) ? shadowOffsetX : 3;
		
		this.shadowOffsetY = !isNaN(shadowOffsetY) ? shadowOffsetY : 3;
		
		this.backgroundColor = backgroundColor || "#EEE";
		
		this.borderColor = borderColor || "#FFF";
		
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

		this.step = this.TWOPI / this.buttons.length;
		
		this.w = (this.outerCircle * 2) + (this.shadowBlur * 2) + (this.shadowOffsetX * 2);
		
		this.h = (this.outerCircle * 2) + (this.shadowBlur * 2) + (this.shadowOffsetY * 2);

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

		if( this.shadowColor instanceof Object )
		
			this.shadowColor = this.createGradient(this.shadowColor);

		if( this.textColor instanceof Object )
		
			this.textColor = this.createGradient(this.textColor);

		if( this.textBorderColor instanceof Object )
		
			this.textBorderColor = this.createGradient(this.textBorderColor);

		if( this.textShadowColor instanceof Object )
		
			this.textShadowColor = this.createGradient(this.textShadowColor);
		
		for(let i = 0; i < this.buttons.length; i++){
		
			this.buttons[i]["ini"] = (i * this.step + this.rotation) % this.TWOPI ;
			
			this.buttons[i]["fin"] = (this.buttons[i]["ini"] + this.step) % this.TWOPI;
			
			if( this.buttons[i]["ini"] > this.buttons[i]["fin"])
			
				this.rest = i;
				
			const a = (this.buttons[i]["ini"] + this.step/2) ;
			
			this.buttons[i]["centerX"] = Math.cos(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2)-this.fontSize/2;
			
			this.buttons[i]["centerY"] = Math.sin(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2)+this.fontSize/4;
			
		}
		
	}
	
	draw(){
	
		this.c.imageSmoothingEnabled = true;
		
		this.c.imageSmoothingQuality = "high";
	
		this.c.clearRect(0, 0, this.w, this.h);
		
		this.c.shadowColor = this.shadowColor;
		
		this.c.shadowBlur = this.shadowBlur;
		
		this.c.shadowOffsetX = this.shadowOffsetX;
		
		this.c.shadowOffsetY = this.shadowOffsetY;
		
		this.c.beginPath();
		
		this.c.arc(this.w2, this.h2, this.outerCircle, 0, this.TWOPI);
		
		this.c.arc(this.w2, this.h2, this.innerCircle, this.TWOPI, 0, true);
		
		this.c.fillStyle = this.shadowColor;
		
		this.c.fill();
		
		for(let i = 0; i < this.buttons.length; i++){
		
			const button = this.buttons[i];
			
			this.c.shadowBlur = 0;
			
			this.c.shadowColor = 'transparent';
			
			this.c.fillStyle = "backgroundColor" in button ? button["backgroundColor"] : this.backgroundColor;
			
			this.c.strokeStyle = "borderColor" in button ? button["borderColor"] : this.borderColor;
			
			this.c.beginPath();
			
			this.c.arc(this.w2,this.h2, this.outerCircle, button["ini"], button["fin"]);
			
			this.c.arc(this.w2,this.h2, this.innerCircle, button["fin"], button["ini"], true);
			
			this.c.closePath();
			
			this.c.fill();
			
			this.c.stroke();
			
			this.c.fillStyle = "textColor" in button ? button["textColor"] : this.textColor;
			
			this.c.strokeStyle = "textBorderColor" in button ? button["textBorderColor"] : this.textBorderColor;
			
			this.c.shadowColor = "textShadowColor" in button ? button["textShadowColor"] : this.textShadowColor;
			
			this.c.shadowBlur = "textShadowBlur" in button ? button["textShadowBlur"] : this.textShadowBlur;
			
			this.c.shadowOffsetX = "textShadowOffsetX" in button ? button["textShadowOffsetX"] : this.textShadowOffsetX;
			
			this.c.shadowOffsetY = "textShadowOffsetY" in button ? button["textShadowOffsetY"] : this.textShadowOffsetY;
			
			this.c.save();
			
			this.c.translate(this.w2, this.h2);
			
			this.c.fillText(button["text"], button["centerX"], button["centerY"]);
			
			this.c.strokeText(button["text"], button["centerX"], button["centerY"]);
			
			this.c.restore();
			
		}
		
	}
	
	addEvent(){
	
		this.canvas.addEventListener('click', e => {

			const rect = this.canvas.getBoundingClientRect();
			
			const _x = this.w/rect.width;
			
			const _y = this.h/rect.height;
			
			const posX = ( rect.left + this.w2 ) * _x;
			
			const posY = ( rect.top + this.h2 ) * _y;

			const d = this.distance(e.clientX, e.clientY, posX, posY);
			
			let a = Math.atan2(e.clientY-posY, e.clientX-posX);
			
			a = a > 0 ? a : this.TWOPI+a;
			
			if( d > this.innerCircle && d < this.outerCircle ){
			
				for(let i = 0; i < this.buttons.length; i++){
					
					if( a >= this.buttons[i]["ini"] && a <= this.buttons[i]["fin"] ){
					
						this.buttons[i].action();
						
						return
						
					}

				}
				
				this.buttons[this.rest].action();
				
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
	
}
