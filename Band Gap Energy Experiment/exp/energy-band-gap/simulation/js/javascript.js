 function main() {
     btn_main.style.display = 'none';
     btn_main2.style.display = '';
     document.getElementById('calc_volt').disabled = false;
     document.getElementById('calc_volt').style.cursor = "pointer";
     document.getElementById('calc_volt').classList.remove("disabled");

 }

 function main2() {
     btn_main2.style.display = 'none';
     btn_main.style.display = '';
 }

 function cont() {
     //alert('rtht');
     document.getElementById('pndiode').disabled = false;
     document.getElementById('pndiode').style.cursor = "pointer";
     document.getElementById('battery').disabled = false;
     document.getElementById('battery').style.cursor = "pointer";
     document.getElementById('ammeter').disabled = false;
     document.getElementById('ammeter').style.cursor = "pointer";
     document.getElementById('voltmeter').disabled = false;
     document.getElementById('voltmeter').style.cursor = "pointer";
     document.getElementById('point').disabled = false;
     document.getElementById('point').style.cursor = "pointer";
     document.getElementById('wires').disabled = false;
     document.getElementById('wires').style.cursor = "pointer";
     document.getElementById('undo').disabled = false;
     document.getElementById('undo').style.cursor = "pointer";
     document.getElementById('redo').disabled = false;
     document.getElementById('redo').style.cursor = "pointer";
     document.getElementById('reset').disabled = false;
     document.getElementById('reset').style.cursor = "pointer";

 }

 function connect_wire() {
     document.getElementById('thermometer').disabled = false;
     document.getElementById('thermometer').style.cursor = "pointer";
 }

 function cl1() {
     alert('This is wrong answer ! Try again...');
 }

 function cl2() {
     alert('You choose the correct answer ! Please proceed Further...');
     document.getElementById('container').disabled = false;
     document.getElementById('container').style.cursor = "pointer";
     document.getElementById('container').classList.remove("disabled");
 }

 function cl3() {
     alert('This is wrong answer ! Try again...');
 }

 function cl4() {
     alert('This is wrong answer ! Try again...');
 }


 var preCon = null;
 //update the x and y coordinate


 var Terminal = function() {
     this.obj = document.getElementById("terminal");
     this.obj.innerHTML = ">>";
     this.update = function(str) {
         this.value = this.obj.innerHTML;
         this.value += str + "<br>>>";
         this.obj.innerHTML = this.value;
         this.obj.scrollTo(0, this.obj.scrollHeight);
     }
     this.reset = function() {
         this.obj.innerHTML = "";
     }
 }

 var getMousePos = function(canvas, e) {
     var boundingClientRect = canvas.getBoundingClientRect();
     var tx = e.clientX - boundingClientRect.left;
     var ty = e.clientY - boundingClientRect.top;
     console.log(boundingClientRect.left);
     return {
         x: tx < 0 ? 0 : tx,
         y: ty < 0 ? 0 : ty
     };
 };

 var update = function(x, y) {
     var tempX = document.getElementById("mouseX");
     var tempY = document.getElementById("mouseY");
     tempX.innerHTML = x;
     tempY.innerHTML = y;
 };

 var pointType = {
     PASSIVE: 0x00,
     ACTIVE: 0x01,
     ACTIVE_PASSIVE: 0x02
 };

 var operationType = {
     DRAW_POINT: 0X00,
     DRAW_TWO_WAY_KEY: 0X01,
     DRAW_RESISTOR: 0X02,
     DRAW_CELL: 0X03,
     DRAW_GALVANOMETER: 0X04,
     DRAW_POTENTIOMETER: 0X05,
     DRAW_CONDENSER: 0X06,
     DRAW_TAPKEY: 0x07,

     MAKE_CONNECTION: 0X13,
     START_SIMULATION: 0X14,
     STOP_SIMULATION: 0X15,

     RESET: 0X21,
     UNDO: 0X22,
     REDO: 0X23
 };

 var level = {
     LOW: false,
     HIGH: true
 };

 var point = function(canvasId, imageId, x, y, r, type, name) {
     this.name = name;
     this.connection = [];
     this.V = "";
     this.type = type;
     this.level = level.LOW;
     this.image = imageId;
     this.point = {
         x: x,
         y: y,
         r: r
     };
     this.draw = function() {
         if (this.image == null) {
             canvas.context.beginPath();
             canvas.context.arc(this.point.x, this.point.y, 5, 0, 2 * Math.PI);
             canvas.context.lineWidth = "4";
             canvas.context.strokeStyle = "black";
             canvas.context.stroke();
             canvas.context.closePath();

             canvas.context.font = "12px Arial";
             canvas.context.fillStyle = "black";
             canvas.context.fillText(name, this.point.x - 10, this.point.y - 12);

             canvas.context.font = "12px Arial";
             canvas.context.fillText(this.V, this.point.x - 10, this.point.y + 22);
         }
     };
     this.isInside = function(x, y) {
         var d = Math.pow(x - this.point.x, 2) + Math.pow(y - this.point.y, 2)
         d = Math.sqrt(d);
         if (d <= parseFloat(this.point.r)) {
             return true;
         }
         return false;
     };
     this.update = function() {
         if (this.type == pointType.ACTIVE) {

         } else {

         }
     }
 };

 var wire = function(a, b, tilt) {
     if (a.type == pointType.ACTIVE) {
         this.a = a;
         this.b = b;
     } else if (b.type == pointType.ACTIVE) {
         this.a = b;
         this.b = a;
     } else if (a.V >= b.V) {
         this.a = a;
         this.b = b;
     } else {
         this.a = b;
         this.b = a;
     }
     this.b.V = this.a.V;
     this.current = 0;
     this.tilt = tilt;
     this.color = null;
     this.draw = function() {
         // var flag = false;
         // for (var i in conMap[p.a.name]) {
         //     flag = flag || (p.b.name == conMap[p.a.name][i]);
         // }
         // if (flag)
         //     p.color = wireColor[p.a.value];
         // else {
         //     p.color = "red";
         //     showMsg("wrong connection");
         // }
         this.color = "blue";
         canvas.context.beginPath();
         canvas.context.strokeStyle = this.color;
         //canvas.context.fill("grey");
         canvas.context.lineWidth = 3;
         canvas.context.moveTo(this.a.point.x, this.a.point.y);
         if (this.tilt) {
             canvas.context.lineTo(this.a.point.x, this.b.point.y);
             canvas.context.lineTo(this.b.point.x, this.b.point.y);
         } else {
             canvas.context.lineTo(this.b.point.x, this.b.point.y);
         }
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.arc(this.a.point.x, this.a.point.y, 3, 0, 2 * Math.PI);
         canvas.context.strokeStyle = this.color;
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.arc(this.b.point.x, this.b.point.y, 3, 0, 2 * Math.PI);
         canvas.context.strokeStyle = this.color;
         canvas.context.stroke();
         canvas.context.closePath();
     }
 };

 var twoWayKey = function(x, y) {
     this.width = 50;
     this.height = 50;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.input = new point(canvas.id, null, this.x + 40, this.y + 25, 4, pointType.PASSIVE, "TI");
     this.outputA = new point(canvas.id, null, this.x + 10, this.y + 10, 4, pointType.PASSIVE, "TA");
     this.outputB = new point(canvas.id, null, this.x + 10, this.y + 40, 4, pointType.PASSIVE, "TB");
     this.output = this.outputA;
     this.wire = null;
     this.draw = function() {


         //this.wire = new wire(this.input, this.output, false);

         //container
         var img = document.getElementById("scream");
         canvas.context.drawImage(img, 140, 250, 500, 280);

     };

     this.isInside = function(x, y) {
         return false;
     };

 };

 var TapKey = function(x, y) {
     this.width = 50;
     this.height = 50;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.input = new point(canvas.id, null, this.x + 40, this.y + 25, 4, pointType.PASSIVE, "TI");
     this.outputB = new point(canvas.id, null, this.x + 10, this.y + 10, 0, pointType.PASSIVE, "");
     this.outputA = new point(canvas.id, null, this.x + 10, this.y + 40, 4, pointType.PASSIVE, "TA");
     this.output = this.outputB;
     this.wire = null;
     this.draw = function() {


         this.wire = new wire(this.input, this.output, false);
         //this.wire.draw();

         //this.input.draw();
         //this.outputA.draw();
         //this.outputB.draw();


         // canvas.context.beginPath();
         // canvas.context.rect(this.x, this.y, this.width, this.height);
         // canvas.context.stroke();
         // canvas.context.closePath();
         var img2 = document.getElementById("therma");
         canvas.context.drawImage(img2, 578 - 60, 85, 100, 100);

         var img_thr = document.getElementById("img_therma");
         canvas.context.drawImage(img_thr, 546, 163, 20, 270);

         //canvas.context.fillStyle = "#59d22d";
         //canvas.context.fillRect(548, 166, 15, 260);
         //canvas.context.stroke();

         // canvas.context.beginPath();
         // canvas.context.lineWidth = "4";
         // canvas.context.strokeStyle = "black";
         // canvas.context.moveTo(608 , 267);
         // canvas.context.lineTo(623 , 265);
         // canvas.context.closePath();


         canvas.context.beginPath();

         canvas.context.moveTo(608 - 60, 269 + 44);
         canvas.context.lineTo(623 - 60, 265 + 44);
         canvas.context.moveTo(608 - 60, 269 + 44 + 70);
         canvas.context.lineTo(623 - 60, 265 + 44 + 70);
         canvas.context.strokeStyle = "black";
         canvas.context.font = "18px Arial";
         canvas.context.fillText("Thermometer", 580, 220);

         canvas.context.moveTo(610 - 60, 170);
         canvas.context.lineTo(620 - 60, 170);
         canvas.context.moveTo(610 - 60, 175);
         canvas.context.lineTo(615 - 60, 175);
         canvas.context.moveTo(610 - 60, 180);
         canvas.context.lineTo(615 - 60, 180);
         canvas.context.moveTo(610 - 60, 185);
         canvas.context.lineTo(615 - 60, 185);
         canvas.context.moveTo(610 - 60, 190);
         canvas.context.lineTo(615 - 60, 190);
         canvas.context.moveTo(610 - 60, 195);
         canvas.context.lineTo(620 - 60, 195);

         canvas.context.moveTo(610 - 60, 200);
         canvas.context.lineTo(615 - 60, 200);
         canvas.context.moveTo(610 - 60, 205);
         canvas.context.lineTo(615 - 60, 205);
         canvas.context.moveTo(610 - 60, 210);
         canvas.context.lineTo(615 - 60, 210);
         canvas.context.moveTo(610 - 60, 215);
         canvas.context.lineTo(615 - 60, 215);
         canvas.context.moveTo(610 - 60, 220);
         canvas.context.lineTo(620 - 60, 220);

         canvas.context.moveTo(610 - 60, 225);
         canvas.context.lineTo(615 - 60, 225);
         canvas.context.moveTo(610 - 60, 230);
         canvas.context.lineTo(615 - 60, 230);
         canvas.context.moveTo(610 - 60, 235);
         canvas.context.lineTo(615 - 60, 235);
         canvas.context.moveTo(610 - 60, 240);
         canvas.context.lineTo(615 - 60, 240);
         canvas.context.moveTo(610 - 60, 245);
         canvas.context.lineTo(620 - 60, 245);

         canvas.context.moveTo(610 - 60, 250);
         canvas.context.lineTo(615 - 60, 250);
         canvas.context.moveTo(610 - 60, 255);
         canvas.context.lineTo(615 - 60, 255);
         canvas.context.moveTo(610 - 60, 260);
         canvas.context.lineTo(615 - 60, 260);
         canvas.context.moveTo(610 - 60, 265);
         canvas.context.lineTo(615 - 60, 265);
         canvas.context.moveTo(610 - 60, 270);
         canvas.context.lineTo(620 - 60, 270);

         canvas.context.moveTo(610 - 60, 250);
         canvas.context.lineTo(615 - 60, 250);
         canvas.context.moveTo(610 - 60, 255);
         canvas.context.lineTo(615 - 60, 255);
         canvas.context.moveTo(610 - 60, 260);
         canvas.context.lineTo(615 - 60, 260);
         canvas.context.moveTo(610 - 60, 265);
         canvas.context.lineTo(615 - 60, 265);
         canvas.context.moveTo(610 - 60, 270);
         canvas.context.lineTo(620 - 60, 270);

         canvas.context.moveTo(610 - 60, 275);
         canvas.context.lineTo(615 - 60, 275);
         canvas.context.moveTo(610 - 60, 280);
         canvas.context.lineTo(615 - 60, 280);
         canvas.context.moveTo(610 - 60, 285);
         canvas.context.lineTo(615 - 60, 285);
         canvas.context.moveTo(610 - 60, 290);
         canvas.context.lineTo(615 - 60, 290);
         canvas.context.moveTo(610 - 60, 295);
         canvas.context.lineTo(620 - 60, 295);

         canvas.context.moveTo(610 - 60, 300);
         canvas.context.lineTo(615 - 60, 300);
         canvas.context.moveTo(610 - 60, 305);
         canvas.context.lineTo(615 - 60, 305);
         canvas.context.moveTo(610 - 60, 310);
         canvas.context.lineTo(615 - 60, 310);
         canvas.context.moveTo(610 - 60, 315);
         canvas.context.lineTo(615 - 60, 315);
         canvas.context.moveTo(610 - 60, 320);
         canvas.context.lineTo(620 - 60, 320);

         canvas.context.moveTo(610 - 60, 325);
         canvas.context.lineTo(615 - 60, 325);
         canvas.context.moveTo(610 - 60, 330);
         canvas.context.lineTo(615 - 60, 330);
         canvas.context.moveTo(610 - 60, 335);
         canvas.context.lineTo(615 - 60, 335);
         canvas.context.moveTo(610 - 60, 340);
         canvas.context.lineTo(615 - 60, 340);
         canvas.context.moveTo(610 - 60, 345);
         canvas.context.lineTo(620 - 60, 345);

         canvas.context.moveTo(610 - 60, 350);
         canvas.context.lineTo(615 - 60, 350);
         canvas.context.moveTo(610 - 60, 355);
         canvas.context.lineTo(615 - 60, 355);
         canvas.context.moveTo(610 - 60, 360);
         canvas.context.lineTo(615 - 60, 360);
         canvas.context.moveTo(610 - 60, 365);
         canvas.context.lineTo(615 - 60, 365);
         canvas.context.moveTo(610 - 60, 370);
         canvas.context.lineTo(620 - 60, 370);

         canvas.context.moveTo(610 - 60, 375);
         canvas.context.lineTo(615 - 60, 375);
         canvas.context.moveTo(610 - 60, 380);
         canvas.context.lineTo(615 - 60, 380);
         canvas.context.moveTo(610 - 60, 385);
         canvas.context.lineTo(615 - 60, 385);
         canvas.context.moveTo(610 - 60, 390);
         canvas.context.lineTo(615 - 60, 390);
         canvas.context.moveTo(610 - 60, 395);
         canvas.context.lineTo(620 - 60, 395);



         canvas.context.strokeStyle = "grey";
         canvas.context.lineWidth = 2;
         canvas.context.stroke();


     };

     this.isInside = function(x, y) {
         if (x > this.x && y > this.y && x < this.x + this.width && y < this.y + this.height) {
             return true;
         }
         return false;
     };

     this.click = function() {
         if (this.output == this.outputA) {
             this.output = this.outputB;
         } else
             this.output = this.outputA;
         if (this.input.V > this.output.V) {
             this.output.V = this.input.V;
         } else {
             this.input.V = this.output.V;
         }
         canvas.draw();
     };
 };

 var Cell = function(x, y) {
     this.width = 80;
     this.height = 30;
     this.V = 12;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.A = new point(canvas.id, null, this.x + 3, this.y + this.height / 2, 5, pointType.ACTIVE, "");
     this.B = new point(canvas.id, null, this.x - 3 + this.width, this.y + this.height / 2, 5, pointType.ACTIVE, "");
     this.A.V = "+ve";
     this.B.V = "-ve";
     this.draw = function() {
         // canvas.context.beginPath();
         // canvas.context.rect(this.x, this.y, this.width, this.height);
         // canvas.context.lineWidth = "1";
         // canvas.context.stroke();
         // canvas.context.closePath();

         canvas.context.lineWidth = "4";
         canvas.context.strokeStyle = "black";

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 4, this.y + this.height / 2);
         canvas.context.lineTo(this.x + 25, this.y + this.height / 2);
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 25, this.y);
         canvas.context.lineTo(this.x + 25, this.y + this.height);
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 35, this.y + 7);
         canvas.context.lineTo(this.x + 35, this.y + this.height - 7);
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 45, this.y);
         canvas.context.lineTo(this.x + 45, this.y + this.height);
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 55, this.y + 7);
         canvas.context.lineTo(this.x + 55, this.y + this.height - 7);
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 55, this.y + this.height / 2);
         canvas.context.lineTo(this.x + this.width - 4, this.y + this.height / 2);
         canvas.context.stroke();
         canvas.context.closePath();

         this.A.draw();
         this.B.draw();
     };
     this.isInside = function() {

     }
 };


 //pndiode.........

 var Resistor = function(x, y) {
     //x=74;
     //y=48;
     this.width = 20;
     this.height = 44;
     this.x = x - (this.width - 20) / 2;
     this.y = y - this.height / 2;


     this.R = "";

     this.A = new point(canvas.id, null, this.x - 40, this.y + this.height / 2, 6, pointType.PASSIVE, "-ve");
     this.B = new point(canvas.id, null, this.x + 90, this.y + this.height / 2, 6, pointType.PASSIVE, "+ve");
     // if(255<= x <= 475 && 414<= y <= 470) {
     this.draw = function() {
         canvas.context.beginPath();
         canvas.context.rect(this.x, this.y, this.width - 20, this.height);
         canvas.context.lineWidth = "5";
         canvas.context.strokeStyle = "black";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 50, this.y + this.height / 2);
         canvas.context.lineTo(this.x + 86, this.y + this.height / 2);
         canvas.context.lineWidth = 3;
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x, this.y + this.height / 2);
         canvas.context.lineTo(this.x - 36, this.y + this.height / 2);
         canvas.context.lineWidth = "3";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x, this.y + this.height / 2);
         canvas.context.lineTo(this.x + 51, this.y - this.height / 32);
         canvas.context.lineWidth = "4";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x, this.y + this.height / 2);
         canvas.context.lineTo(this.x + 51, this.y + this.height + 2);
         canvas.context.lineWidth = "4";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 50, this.y - (this.height / 32));
         canvas.context.lineTo(this.x + 50, this.y + this.height + 3);
         canvas.context.lineWidth = "4";
         canvas.context.stroke();
         canvas.context.closePath();


         this.A.draw();
         this.B.draw();

     };
     //}
     // else{
     //     alert("sdfgsgsg");
     // }
     //alert(x+ '+'  +y);
     this.isInside = function() {
         return false;
     };

     // else {
     //     alert('Please place P-N Diode inside container');
     // }

 };


 var Galvanometer = function(x, y) {
     this.width = 90;
     this.height = 30;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.value = "00";
     this.maxValue = 60;
     this.minValue = -60;
     this.A = new point(canvas.id, null, this.x - 30, this.y + this.height / 2, 6, pointType.PASSIVE, "+ve");
     this.B = new point(canvas.id, null, this.x + 22 + this.width - 3, this.y + this.height / 2, 6, pointType.PASSIVE, "-ve");
     this.A.V = "";
     this.B.V = "";
     this.draw = function() {

         canvas.context.beginPath();
         canvas.context.rect(this.x, this.y, this.width - 15, this.height);
         canvas.context.lineWidth = "3";
         canvas.context.strokeStyle = "black";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 75, this.y + this.height / 2);
         canvas.context.lineTo(this.x + 106, this.y + this.height / 2);
         canvas.context.lineWidth = 2;
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x, this.y + this.height / 2);
         canvas.context.lineTo(this.x - 26, this.y + this.height / 2);
         canvas.context.lineWidth = "2";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.font = "20px digitalFont";
         canvas.context.fillStyle = "red";
         canvas.context.fillText("Ammeter", this.x + this.width / 2 - 40, this.y + this.height / 2 + 6);

         this.A.draw();
         this.B.draw();
         //this.update();
     };
     this.isInside = function() {

     };
     // this.update = function () {
     //     let value = this.A.V - this.B.V;
     //     this.value = value;
     //     //canvas.draw();
     // }
 };

 var Potentiometer = function(x, y) {


     // this.update = function () {
     //     let value = this.A.V - this.B.V;
     //     this.value = value;
     //     //canvas.draw();
     // }
     this.width = 100;
     this.height = 30;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.A = new point(canvas.id, null, this.x + 40, this.y + 25, 1, pointType.PASSIVE, "");
     this.O = new point(canvas.id, null, this.x - 25, this.y + 15, 6, pointType.ACTIVE_PASSIVE, "+ve");
     this.B = new point(canvas.id, null, this.x + 110, this.y + 15, 6, pointType.PASSIVE, "-ve");
     this.A.V = "";
     this.O.V = "";
     this.B.V = "";



     this.draw = function() {

         canvas.context.beginPath();
         canvas.context.rect(this.x, this.y, this.width - 15, this.height);
         canvas.context.lineWidth = "3";
         canvas.context.strokeStyle = "black";
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x - 20, this.y + 15);
         canvas.context.lineTo(this.x, this.y + 15);
         canvas.context.lineWidth = 2;
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.beginPath();
         canvas.context.moveTo(this.x + 84, this.y + 15);
         canvas.context.lineTo(this.x + 107, this.y + 15);
         canvas.context.lineWidth = 2;
         canvas.context.stroke();
         canvas.context.closePath();

         canvas.context.font = "18px digitalFont";
         canvas.context.fillStyle = "red";
         canvas.context.fillText("voltmeter", this.x + this.width / 2 - 45, this.y + this.height / 2 + 6);


         //this.A.draw();
         this.O.draw();
         this.B.draw();
     };
     this.isInside = function() {

     }
 };

 var Condenser = function(x, y) {
     this.width = 30;
     this.height = 30;
     this.x = x - this.width / 2;
     this.y = y - this.height / 2;
     this.r = 25;

     this.R = 0;
     this.C = 30;
     this.V = 0;

     this.A = new point(canvas.id, null, this.x, this.y + this.height / 2, 4, pointType.ACTIVE_PASSIVE, "CA");
     this.B = new point(canvas.id, null, this.x + 28, this.y + this.height / 2, 4, pointType.ACTIVE_PASSIVE, "CB");
     this.draw = function() {
         canvas.context.beginPath();
         canvas.context.arc(this.x + this.width / 2, this.y + this.height / 2, this.r, 0, 2 * Math.PI);
         canvas.context.lineWidth = "2";
         canvas.context.strokeStyle = "black";
         canvas.context.stroke();
         canvas.context.closePath();

         this.A.draw();
         this.B.draw();
     }
     this.isInside = function() {

     }
     this.charge = function() {
         if (this.A.V > this.B.V) {
             let Vs = this.A.V - this.B.V;
             this.V = Vs * Math.pow(2.7183, -(15 / (this.R * this.C)));
         } else if (this.B.V > 0) {

         }
     }
     this.discharge = function() {

     }
 };

 var Canvas = function() {
     this.id = "myCanvas";
     this.obj = document.getElementById(this.id);
     this.width = window.innerWidth ||
         document.documentElement.clientWidth ||
         document.body.clientWidth;
     this.height = h = window.innerHeight ||
         document.documentElement.clientHeight ||
         document.body.clientHeight;
     this.obj.setAttribute("width", "775");
     this.obj.setAttribute("height", "550");
     this.context = this.obj.getContext('2d');

     // var background = new Image();
     // background.src = "images/can3.jpg";
     //
     // background.onload = function(){
     //     canvas.context.drawImage(background,0,0);
     // }


     this.element = [];
     this.connection = [];
     this.redoArray = [];
     this.action = null;
     this.currentElement = null;
     this.draw = function() {
         this.context.clearRect(0, 0, canvas.width, canvas.height);
         document.getElementsByTagName("body")[0].style.cursor = "default";
         for (let ele in this.element) {
             this.element[ele].draw();
         }
         for (var con in this.connection) {
             this.connection[con].draw();
         }
     }

     // this.twoWayKey = function () {
     //     for (let i = 0; i < buttons.length; i++) {
     //         if (operationType[buttons[i].getAttribute("vlab-action")] === operationType.DRAW_TWO_WAY_KEY) {
     //             // buttons[i].classList.remove("disabled");
     //             // buttons[i].removeAttribute("disabled");
     //             continue;
     //             //}
     //             // buttons[i].classList.add("disabled");
     //             // buttons[i].setAttribute("disabled", "true");
     //         }
     //         terminal.update("container");
     //     }


     this.reset = function() {
         this.element = [];
         //this.name=[];
         this.connection = [];
         this.draw();
         terminal.update("Reset Done..");
     }
     this.undo = function() {
         if (canvas.element.length > 0) {
             canvas.redoArray.push(canvas.element.pop());
             canvas.draw();
             terminal.update("Undo Done..");

         }
     }
     this.redo = function() {
         if (canvas.redoArray.length > 0) {
             canvas.element.push(canvas.redoArray.pop());
             canvas.draw();
             terminal.update("Redo Done..");
         }
     }
     this.start = function() {
         for (let i = 0; i < buttons.length; i++) {
             if (operationType[buttons[i].getAttribute("vlab-action")] == operationType.STOP_SIMULATION) {
                 // buttons[i].classList.remove("disabled");
                 // buttons[i].removeAttribute("disabled");
                 continue;
             }
             // buttons[i].classList.add("disabled");
             // buttons[i].setAttribute("disabled", "true");
         }
         terminal.update("Simulation Stopped")
     }

     this.stop = function() {
         for (let i = 0; i < buttons.length; i++) {
             if (operationType[buttons[i].getAttribute("vlab-action")] == operationType.STOP_SIMULATION) {
                 // buttons[i].classList.add("disabled");
                 // buttons[i].setAttribute("disabled", "true");
                 continue;
             }
             // buttons[i].classList.remove("disabled");
             // buttons[i].removeAttribute("disabled");
         }
         terminal.update("Simulation Started")
     }
 };

 window.onload = function() {
     window.terminal = new Terminal();
     window.canvas = new this.Canvas();
     window.buttons = this.document.getElementsByClassName("btn");
     canvas.stop();
     this.document.addEventListener("mousedown", function(e) {
         var tempPos = getMousePos(window.canvas.obj, e);
         update(tempPos.x, tempPos.y);
         if (typeof mouseLeftDown === "function") {
             if (e.button == 0)
                 mouseLeftDown(tempPos.x, tempPos.y);
         }
     }, false);

     this.document.addEventListener("mousemove", function(e) {
         var tempPos = getMousePos(window.canvas.obj, e);
         update(tempPos.x, tempPos.y);
         if (typeof mouseMove === "function") {
             mouseMove(tempPos.x, tempPos.y);
         }
     }, false);

     //attach Listener
     for (let i = 0; i < buttons.length; i++) {
         buttons[i].addEventListener("click", function(e) {
             var vlab_action = e.target.getAttribute("vlab-action");
             vlab_action = operationType[vlab_action];
             switch (vlab_action) {
                 case operationType.DRAW_POINT:
                     canvas.action = operationType.DRAW_POINT;
                     break;
                 case operationType.DRAW_POTENTIOMETER:
                     canvas.action = operationType.DRAW_POTENTIOMETER;
                     break;
                 case operationType.DRAW_RESISTOR:
                     canvas.action = operationType.DRAW_RESISTOR;
                     break;
                 case operationType.DRAW_TAPKEY:
                     canvas.action = operationType.DRAW_TAPKEY;
                     break;
                 case operationType.DRAW_CELL:
                     canvas.action = operationType.DRAW_CELL;
                     break;
                 case operationType.DRAW_GALVANOMETER:
                     canvas.action = operationType.DRAW_GALVANOMETER;
                     break;
                 case operationType.DRAW_TWO_WAY_KEY:
                     canvas.action = operationType.DRAW_TWO_WAY_KEY;
                     break;
                 case operationType.DRAW_CONDENSER:
                     canvas.action = operationType.DRAW_CONDENSER;
                     break;
                 case operationType.MAKE_CONNECTION:
                     canvas.action = operationType.MAKE_CONNECTION;
                     break;
                 case operationType.START_SIMULATION:
                     canvas.start();
                     break;
                 case operationType.STOP_SIMULATION:
                     canvas.stop();
                     break;
                 case operationType.RESET:
                     canvas.reset();
                     break;
                 case operationType.UNDO:
                     canvas.undo();
                     break;
                 case operationType.REDO:
                     canvas.redo();
                     break;
                 default:
                     break;
             }
         }, false);
     }

     window.onkeypress = function(e) {
         switch (e.keyCode) {
             case 25:
                 canvas.redo();
                 break;
             case 26:
                 canvas.undo();
                 break;
             default:
                 break;
         }
     }

     document.getElementsByClassName("loader")[0].style.display = "none";
 };

 function mouseLeftDown(x, y) {
     if (x > 0 && y > 0) {
         if (canvas.action == operationType.DRAW_POINT) {
             canvas.element.push(new point(canvas.id, null, x, y, 8, pointType.PASSIVE, ""));
             canvas.redoArray = [];
         } else if (canvas.action == operationType.MAKE_CONNECTION) {
             drawConnection(x, y, canvas.currentElement);
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_TWO_WAY_KEY) {
             var temp = new twoWayKey(x, y);
             canvas.element.push(temp);
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_CELL) {
             var temp = new Cell(x, y);
             canvas.element.push(temp);
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_RESISTOR) {
             //alert(x + "+" +y);
             console.log(x > 255 && x < 475);
             if (x > 255 && x < 475 && y > 414 && y < 470) {

                 //alert(x+ "+" +y);
                 canvas.element.push(new Resistor(x, y));
                 canvas.redoArray = [];
             } else {
                 //canvas.element.push();
                 alert("Please insert inside the container fluid...");
             }


         } else if (canvas.action == operationType.DRAW_GALVANOMETER) {
             var temp = new Galvanometer(x, y);
             canvas.element.push(temp);
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_POTENTIOMETER) {
             canvas.element.push(new Potentiometer(x, y));
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_TAPKEY) {
             canvas.element.push(new TapKey(x, y));
             canvas.redoArray = [];
         } else if (canvas.action == operationType.DRAW_CONDENSER) {
             canvas.element.push(new Condenser(x, y));
             canvas.redoArray = [];
         }

         if (canvas.action == operationType.START_SIMULATION) {
             if (canvas.currentElement instanceof twoWayKey) {
                 canvas.currentElement.click();
             } else if (canvas.currentElement instanceof TapKey) {
                 canvas.currentElement.click();
             }
         }
     }
     console.log(canvas.element);
     canvas.draw();
     hover(x, y);
 }

 function mouseMove(x, y) {
     hover(x, y)
 }

 function hover(x, y) {
     for (var ele in canvas.element) {
         if (canvas.element[ele] instanceof point) {
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof twoWayKey) {
             if (canvas.element[ele].input.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].input;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].outputA.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].outputA;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].outputB.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].outputB;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof Resistor) {
             if (canvas.element[ele].A.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].A;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].B.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].B;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof Cell) {
             if (canvas.element[ele].A.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].A;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].B.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].B;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof Galvanometer) {
             if (canvas.element[ele].A.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].A;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].B.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].B;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof Potentiometer) {
             if (canvas.element[ele].A.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].A;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].O.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].O;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].B.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].B;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof Condenser) {
             if (canvas.element[ele].A.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].A;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].B.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].B;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         } else if (canvas.element[ele] instanceof TapKey) {
             if (canvas.element[ele].input.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].input;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else if (canvas.element[ele].outputA.isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele].outputA;
                 poinHoverCircle(canvas.currentElement.point.x, canvas.currentElement.point.y, 3);
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
             if (canvas.element[ele].isInside(x, y)) {
                 canvas.currentElement = canvas.element[ele];
                 document.getElementsByTagName("body")[0].style.cursor = "pointer";
                 break;
             } else {
                 canvas.draw();
                 canvas.currentElement = null;
             }
         }
     }
 }

 function drawConnection(x, y, ele) {
     if (!(ele instanceof point)) {
         return;
     }
     if (preCon == null) {
         preCon = ele;
     } else if (preCon != ele) {
         var temp = new wire(preCon, ele, true);
         canvas.element.push(temp);
         preCon.connection.push(temp);
         ele.connection.push(temp);
         preCon = null;
     }
 }

 function poinHoverCircle(x, y, r) {
     canvas.context.beginPath();
     canvas.context.arc(x, y, r, 0, 2 * Math.PI);
     canvas.context.strokeStyle = "lightblue";
     canvas.context.stroke();
     canvas.context.closePath();
     document.getElementsByTagName("body")[0].style.cursor = "pointer";
 }