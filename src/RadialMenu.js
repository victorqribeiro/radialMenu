class RadialMenu {

	constructor(fontFamily, fontSize, innerCircle, outerCircle,
							rotation, shadowBlur, shadowColor, shadowOffsetX, 
							shadowOffsetY, buttons, posX, posY, isFixed){
		this.fontFamily = fontFamily || 'FontAwesome';
		this.fontSize = fontSize || 14;
		this.innerCircle = innerCircle || 50;
		this.outerCircle = outerCircle || 100;
		this.rotation = rotation || Math.PI/2;
		this.shadowBlur = shadowBlur || 10;
		this.shadowColor = shadowColor || 'rgba(0,0,0,0.2)';
		this.shadowOffsetX = shadowOffsetX || 3;
		this.shadowOffsetY = shadowOffsetY || 3;
		this.buttons = buttons || [
			{'text': '\uF000', 'backgroundColor': '#EEE', 'borderColor': '#FFF', 'textColor': '#000', 'textBorderColor': 'transparent', 'action': () => { alert(1) } },
			{'text': '\uF001', 'backgroundColor': '#EEE', 'borderColor': '#FFF', 'textColor': '#000', 'textBorderColor': 'transparent', 'action': () => { alert(2) } },
			{'text': '\uF002', 'backgroundColor': '#EEE', 'borderColor': '#FFF', 'textColor': '#000', 'textBorderColor': 'transparent', 'action': () => { alert(3) } },
			{'text': '\uF003', 'backgroundColor': '#EEE', 'borderColor': '#FFF', 'textColor': '#000', 'textBorderColor': 'transparent', 'action': () => { alert(4) } }
		];
		this.posX = posX || 0;
		this.posY = posY || 0;
		this.isFixed = isFixed || false;
		this.TWOPI = 2*Math.PI;
		this.step = this.TWOPI / this.buttons.length;
		this.canvas = document.createElement('canvas');
		this.canvas.width = (this.outerCircle * 2) + (this.shadowBlur * 2) + (this.shadowOffsetX * 2);
		this.canvas.height = (this.outerCircle * 2) + (this.shadowBlur * 2) + (this.shadowOffsetY * 2);
		this.c = this.canvas.getContext('2d');
		this.c.font = this.fontSize+"px "+this.fontFamily;
		this.canvas.style.display = "none";
		this.canvas.style.position = "fixed";
		this.canvas.style.zIndex = 9999;
		this.w2 = this.canvas.width >> 1;
		this.h2 = this.canvas.height >> 1;
		this.init();
		this.draw();
		this.addEvent();
	}
	
	init(){
		//var junction_font = new FontFace('Junction Regular', 'url(fonts/junction-regular.woff)');
		document.body.appendChild( this.canvas );
		for(let i = 0; i < this.buttons.length; i++){
			this.buttons[i]["ini"] = (i * this.step + (this.rotation%this.TWOPI)) % this.TWOPI ;
			this.buttons[i]["fin"] = (this.buttons[i]["ini"] + this.step) % this.TWOPI;
			if( this.buttons[i]["ini"] > this.buttons[i]["fin"])
				this.rest = i;
			const a = (this.buttons[i]["ini"] + this.step/2) ;
			this.buttons[i]["centerX"] = Math.cos(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2)-this.fontSize/2;
			this.buttons[i]["centerY"] = Math.sin(a)*(this.innerCircle+(this.outerCircle-this.innerCircle)/2);
		}	
	}
	
	draw(){
		this.c.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.c.shadowColor = this.shadowColor;
		this.c.shadowBlur = this.shadowBlur;
		this.c.shadowOffsetX = this.shadowOffsetX;
		this.c.shadowOffsetY = this.shadowOffsetY;
		this.c.beginPath();
		this.c.arc(this.w2, this.h2, this.outerCircle, 0, this.TWOPI);
		this.c.arc(this.w2, this.h2, this.innerCircle, this.TWOPI, 0, true);
		this.c.fill();
		for(let i = 0; i < this.buttons.length; i++){
			this.shadowBlur = 0;
			this.c.shadowColor = 'transparent';
			this.c.fillStyle = this.buttons[i]["backgroundColor"];
			this.c.strokeStyle = this.buttons[i]["borderColor"];
			this.c.beginPath();
			this.c.arc(this.w2,this.h2, this.outerCircle, this.buttons[i]["ini"], this.buttons[i]["fin"]);
			this.c.arc(this.w2,this.h2, this.innerCircle, this.buttons[i]["fin"], this.buttons[i]["ini"], true);
			this.c.closePath();
			this.c.fill();
			this.c.stroke();
			this.c.save();
			this.c.fillStyle = this.buttons[i]["textColor"];
			this.c.strokeStyle = this.buttons[i]["textBorderColor"];
			this.c.shadowBlur = 0;
			this.c.shadowOffsetX = 0;
			this.c.shadowOffsetY = 0;
			this.c.translate(this.w2,this.h2);
			this.c.fillText(this.buttons[i].text, this.buttons[i]["centerX"], this.buttons[i]["centerY"]);
			this.c.restore();
		}
	}
	
	addEvent(){
	
		this.canvas.addEventListener('click', e => {

			const rect = this.canvas.getBoundingClientRect();

			const d = this.distance(e.clientX,e.clientY,rect.left+this.w2,rect.top+this.h2);
			let a = Math.atan2(e.clientY-(rect.top+this.h2), e.clientX-(rect.left+this.w2));
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
			this.draw();
			this.canvas.style.display = "block";
			this.canvas.style.left = this.posX+"px";
			this.canvas.style.top = this.posY+"px";
			return;
		}
		
		document.body.addEventListener("click", e => {
			this.canvas.style.display = "none";
		});

		document.oncontextmenu = e => {
			e.preventDefault();
			this.draw();
			this.canvas.style.display = "block";
			this.canvas.style.left = e.clientX - this.w2+"px";
			this.canvas.style.top = e.clientY - this.h2+"px";
		};
	}
	
	distance(x1, y1, x2, y2){
		return Math.sqrt( ((x2-x1)**2) + ((y2-y1)**2) );
	}
	
}
