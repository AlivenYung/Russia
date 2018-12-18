var time = 0;
var timer;
$(function(){
	var width = 500;
	var height = 750;
	var rows = 15;
	var cols = 10;
	var everyW = width/cols;
	var everyH = height/rows;
	var everyTime = ($('.level').html() == '難')?(250):(1000);
	var colors = ['purple','skyblue','orange','blue','yellow','yellowgreen','red'];
	var kit = {};
	var cube = {};
	kit.realX = 0;
	kit.realY = 0;
	
	kit.doToReal = function(x,y){
		kit.realX = x*everyW;
		kit.realY = y*everyH;
	}
	
	kit.show = function(x,y,i,is_next){
		this.doToReal(x,y);
		if(i == 0){
			if(is_next == 0){
				$('.curr').remove();
			}
			else {$('.next').remove();}
		}
		if(is_next == 0){
			$('#wrapper').append("<div class='curr' style='left:"+kit.realX+"px;top:"+kit.realY+"px;width:"+everyW+"px;height:"+everyW+"px;background:"+colors[cube.type]+";'></div>");
		}else{
			$('#next-group').append("<div class='next' style='left:"+kit.realX+"px;top:"+kit.realY+"px;width:"+everyW+"px;height:"+everyW+"px;background:"+colors[cube.nextType]+";'></div>");
		}
	}
	
	cube.nowCenter = [];
	cube.nowDot = [];
	cube.rotate = 0;
	cube.type = Math.round(Math.random()*6);
	cube.nextType = Math.round(Math.random()*6);
	
	cube.getNowDot = function(){
		var x = this.nowCenter[0];
		var y = this.nowCenter[1];
		var t = this.rotate % 4;
		this.nowDot = this.getDot(x,y,cube.type,t);
	}
	cube.show = function(x,y){
		this.nowCenter = [x,y];
		this.getNowDot();
		for(var i = 0; i < 4; i++)
			kit.show(this.nowDot[i][0],this.nowDot[i][1],i,0);
	}
	cube.nextShow = function(x,y){
		var nextDot = cube.getDot(x,y,cube.nextType,0);
		for(var i = 0; i < 4; i++)
			kit.show(nextDot[i][0],nextDot[i][1],i,1);
	}
	cube.getDot = function(x,y,type,t) {
		var nowDot;
		
		switch(type){
			case 0:
				if(t == 0) nowDot = [[x-1,y],[x,y],[x,y-1],[x+1,y]];
				if(t == 1) nowDot = [[x,y-1],[x,y],[x+1,y],[x,y+1]];
				if(t == 2) nowDot = [[x-1,y],[x,y],[x+1,y],[x,y+1]];
				if(t == 3) nowDot = [[x,y-1],[x-1,y],[x,y],[x,y+1]];
			break;
			case 1:
				if(t == 0) nowDot = [[x-1,y],[x,y],[x+1,y],[x+2,y]];
				if(t == 1) nowDot = [[x,y-1],[x,y],[x,y+1],[x,y+2]];
				if(t == 2) nowDot = [[x-2,y],[x-1,y],[x,y],[x+1,y]];
				if(t == 3) nowDot = [[x,y-2],[x,y-1],[x,y],[x,y+1]];
			break;
			case 2:
				if(t == 0) nowDot = [[x-1,y-1],[x-1,y],[x,y],[x+1,y]];
				if(t == 1) nowDot = [[x+1,y-1],[x,y-1],[x,y],[x,y+1]];
				if(t == 2) nowDot = [[x-1,y],[x,y],[x+1,y],[x+1,y+1]];
				if(t == 3) nowDot = [[x,y-1],[x,y],[x,y+1],[x-1,y+1]];
			break;
			case 3:
				if(t == 0) nowDot = [[x-1,y],[x,y],[x+1,y],[x+1,y-1]];
				if(t == 1) nowDot = [[x,y-1],[x,y],[x,y+1],[x+1,y+1]];
				if(t == 2) nowDot = [[x-1,y+1],[x-1,y],[x,y],[x+1,y]];
				if(t == 3) nowDot = [[x-1,y-1],[x,y-1],[x,y],[x,y+1]];
			break;
			case 4:
				nowDot = [[x,y],[x+1,y],[x,y-1],[x+1,y-1]];
			break;
			case 5:
				if(t == 0 || t == 2) nowDot = [[x-1,y],[x,y],[x,y-1],[x+1,y-1]];
				if(t == 1 || t == 3) nowDot = [[x,y-1],[x,y],[x+1,y],[x+1,y+1]];
				
			break;
			case 6:
				if(t == 0 || t == 2) nowDot = [[x-1,y-1],[x,y-1],[x,y],[x+1,y]];
				if(t == 1 || t == 3) nowDot = [[x+1,y-1],[x+1,y],[x,y],[x,y+1]];
			break;
		}
		return nowDot;
	}
	
	cube.moveDown = function(){
		var x = this.nowCenter[0];
		var y = this.nowCenter[1]+1; 
		cube.show(x,y);
	}
	cube.moveLeft = function(){
		var x = this.nowCenter[0]-1;
		var y = this.nowCenter[1]; 
		cube.show(x,y);
	}
	cube.moveRight = function(){
		var x = this.nowCenter[0]+1;
		var y = this.nowCenter[1]; 
		cube.show(x,y);
	}
	cube.change = function(){
		this.rotate++;
		var x = cube.nowCenter[0];
		var y = cube.nowCenter[1];
		cube.show(x,y);
	}

	
	var tmc = {};
	tmc.dot = [[]];
	tmc.dotColor = [[]];
	tmc.lose = 0;
	tmc.score = 0;
	
	tmc.init = function() {
		for(var i = 0; i < cols; i++){
			tmc.dot[i] = new Array();
			tmc.dotColor[i] = new Array();
			for(var j = -2; j < rows; j++){
				tmc.dot[i][j] = 0;
			}	
		}
	}
	
	tmc.paint = function() {
		$('.already').remove();
		for(var i = 0; i < cols; i++){
			for(var j = 0; j < rows; j++){
				if(tmc.dot[i][j] == 1){
					kit.doToReal(i,j);
					$('#wrapper').append("<div class='already' style='left:"+kit.realX+"px;top:"+kit.realY+"px;width:"+everyW+"px;height:"+everyW+"px;background:"+tmc.dotColor[i][j]+";'></div>");
				}
			}
		}
	}
	
	tmc.checkDown = function() {
		for(var i = 0; i < 4; i++){
			var x = cube.nowDot[i][0];
			var y = cube.nowDot[i][1]+1;
			if(tmc.dot[x][y] != 0) return 0;
		}	
		return 1;
	}
	tmc.checkLeft = function() {
		for(var i = 0; i < 4; i++){
			var x = cube.nowDot[i][0]-1;
			var y = cube.nowDot[i][1];
			if(x < 0 || tmc.dot[x][y] != 0) return 0;
		}	
		return 1;
	}

	tmc.checkRight = function() {
		for(var i = 0; i < 4; i++){
			var x = cube.nowDot[i][0]+1;
			var y = cube.nowDot[i][1];
			if(x > cols-1 || tmc.dot[x][y] != 0) return 0;
		}	
		return 1;
	}
	
	tmc.checkChange = function() {
		var x = cube.nowCenter[0];
		var y = cube.nowCenter[1];
		var t = (cube.rotate + 1)%4;
		var nextDot = cube.getDot(x,y,cube.type,t);
		
		for(var i = 0; i < 4; i++){
			var x = nextDot[i][0];
			var y = nextDot[i][1];
			if(x > cols-1 || x < 0 || tmc.dot[x][y] != 0) return 0;
		}	
		return 1;
	}
	
	tmc.delScore = function() {
		var from = rows - 1;
		for(from; from > 0; from--){
			var flag = true;
			for(var i = 0; i < cols; i++){
				if(tmc.dot[i][from] == 0){
					flag = false;
					break;
				}
			}
			if(flag == true){
				for(var i = 0; i < cols; i++){
					tmc.dot[i].splice(from,1);
					tmc.dot[i].splice(0,0,0);
					tmc.dotColor[i].splice(from,1);
					tmc.dotColor[i].splice(0,0,0);				
				}
				this.score++;
				$('.score').html(this.score);
				from++;
			}
		}
	}
	tmc.moveNext = function(){
		if(tmc.checkDown()) cube.moveDown();
		else{
			for(var i = 0; i < 4; i++){
				var x = cube.nowDot[i][0];
				var y = cube.nowDot[i][1];
				tmc.dot[x][y] = 1;
				tmc.dotColor[x][y] = colors[cube.type];
				if(y == -1){//gameover
					tmc.pause();
					tmc.lose = 1;
					$('#gameover').show();
					$('#score').val($('.score').html());
					$('#time').val($('.time').html());
					return;
				}
			}
			tmc.delScore();
			cube.type = cube.nextType;
			cube.nextType = Math.round(Math.random()*6);
			cube.show(4,-1);
			cube.nextShow(1,2);
			cube.rotate = 0;
			tmc.paint();
		}
	}
	tmc.pause = function() {
		clearInterval(h);
		clearInterval(timer);
	}
	tmc.run = function() {
		if(tmc.lose == 0){
			h = setInterval(tmc.moveNext,everyTime);
			timeRun();
		}
	}
	
	//事件
	$(window).keydown(function(e){
		if(tmc.lose == 0 && $("#spBtn").html() == '暫停遊戲'){
			switch(e.keyCode){
				case 37:
					if(tmc.checkLeft()) cube.moveLeft();
				break;
				case 38:
					if(tmc.checkChange()) cube.change();
				break;
				case 39:
					if(tmc.checkRight()) cube.moveRight();
				break;
				case 40:
					if(tmc.checkDown()) cube.moveDown();
				break;
			}
		}
	})
	
	$("#spBtn").click(function(){
		if($(this).html() == '暫停遊戲'){
			tmc.pause();
			$(this).html('繼續遊戲');
		}else{
			tmc.run();
			$(this).html('暫停遊戲');
		}
		$('#pause-view').toggle();
	})
	
	$('#quitBtn').click(function(){
		tmc.pause();
		if(confirm('是否要放棄遊戲')){
			location.replace('index.php');
		}else{
			if($("#spBtn").html() == '暫停遊戲')
				tmc.run();	
		}
	})
	
	$(window).blur(function(){
		if($("#spBtn").html() == '暫停遊戲')
			tmc.pause();
	})
	$(window).focus(function(){
		if($("#spBtn").html() == '暫停遊戲')
			tmc.run();
	})
	
	//end
	
	//run
	cube.show(4,-1);
	cube.nextShow(1,2);
	tmc.init();
	tmc.run();
})
function timeRun(){
	timer = setInterval(function(){
		time++;
		ht = Math.floor(time/60);
		$('.time').html(((ht < 10)?('0'+ht):(ht))+":"+((time%60 < 10)?('0'+time%60):(time%60)));
	},1000);
}