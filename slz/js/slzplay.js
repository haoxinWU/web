//剩余次数
var leftNumber;
var issendding=0;//数据是否已经传输完毕
// 障碍物的参数
window.hinders=[
{name:"z1",width:129,height:30},
{name:"z2",width:150,height:105},
{name:"z3",width:67,height:31},
{name:"z4",width:136,height:169},
{name:"z5",width:121,height:48},
{name:"z6",width:180,height:45},
{name:"z7",width:45,height:23},
{name:"z8",width:90,height:45},
{name:"z9",width:99,height:60},
];
//获取页面的实际高度和宽度
var pageSize={
    pageWidth:(window.innerWidth > 0) ? window.innerWidth : screen.width,
    pageHeight: (window.innerHeight > 0) ? window.innerHeight : screen.height
}
//设置固定区块的参数（米数，开始的斑马线）
var blocks=[
    {name:"beginLine",width:pageSize.pageWidth,height:50,left:0,initTop:pageSize.pageHeight - 4*72,appear:0,use:0},
    {name:"miter0",width:60,height:36,left:0,initTop:pageSize.pageHeight - 4*90,appear:0,use:0},
    {name:"miter100",width:62,height:34,left:0,initTop:-120,appear:0,use:0},
    {name:"miter200",width:64,height:36,left:0,initTop:-120,appear:0,use:0},
    {name:"miter300",width:66,height:36,left:0,initTop:-120,appear:0,use:0},
    {name:"miter400",width:66,height:36,left:0,initTop:-120,appear:0,use:0},
    {name:"miter500",width:66,height:36,left:0,initTop:-120,appear:0,use:0}
];
var realSpeed=2;
//设置画布宽高
function setCanvasSize()
{
    var canvas=$("#stage");
    canvas.attr("width",pageSize.pageWidth);
    canvas.attr("height",pageSize.pageHeight);
}
$(function(){
    setCanvasSize();
})
// 龙舟对象
function Ship(ctx){
	gameMonitor.im.loadImage(['images/player.png']);
	this.width = 40;
	this.height = 138;
	this.left = gameMonitor.w/2 - this.width/2;
	this.top = gameMonitor.h - 2*this.height;
	this.player = gameMonitor.im.createImage('images/player.png');

	this.paint = function(){
		ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
	}

	this.setPosition = function(event){
		if(gameMonitor.isMobile()){
			var tarL = event.changedTouches[0].clientX;
			var tarT = event.changedTouches[0].clientY;
		}
		else{
			var tarL = event.offsetX;
			var tarT = event.offsetY;
		}
		this.left = tarL - this.width/2 - 16;
		this.top = tarT - this.height/2;
		if(this.left<0){
			this.left = 0;
		}
		if(this.left>pageSize.pageWidth-this.width){
			this.left = pageSize.pageWidth-this.width;
		}
		 if(this.top<0){
			 this.top = 0;
		 }
		if(this.top>gameMonitor.h - this.height){
			this.top = gameMonitor.h - this.height;
		}
		this.paint();
	}

	this.controll = function(){
		var _this = this;
		var stage = $('#gamepanel');
			move = false;
		stage.on(gameMonitor.eventType.start, function(event){
			_this.setPosition(event);
			move = true;
		}).on(gameMonitor.eventType.end, function(){
			move = false;
		}).on(gameMonitor.eventType.move, function(event){
			event.preventDefault();
			if(move){
				_this.setPosition(event);	
			}
			
		});
	}
	// 碰撞判断
	this.impact = function(zList){
		for(var i=zList.length-1; i>=0; i--){
			var f = zList[i];
			if(f){
				var lw1=f.left-this.left>this.width;
				var lw2=this.left-f.left>f.width;
				var lh1=f.top-this.top>this.height;
				var lh2=this.top-f.top>f.height;
				if(!(lw1||lw2||lh1||lh2)){
					//撞到障碍物了
						gameMonitor.stop();
						$('#gameOverLowPanel').show();
                        issendding=1;
                        sendResult(gameMonitor.clockMinute,Math.floor(gameMonitor.totalDistance/16));
				}
			}
			
		}
	}
}

//设置除了障碍物的其他块
function setBlock(type,ctx)
{
    gameMonitor.im.loadImage(['images/'+blocks[type]["name"]+'.png']);
    this.width = blocks[type]["width"];
    this.height = blocks[type]["height"];
    this.left = blocks[type]["left"];
    this.initTop = blocks[type]["initTop"];
    this.top=this.inittop;
    this.loop=0;
    this.player = gameMonitor.im.createImage('images/'+blocks[type]["name"]+'.png');

    this.paint = function(){
        ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
    }
    this.move=function(){
        this.top = ++this.loop * realSpeed+this.initTop;
        // console.log(this.top);
        if(this.top>gameMonitor.h){
            blocks[type]["appear"] = 0;
        }
        else{
            this.paint(ctx);
        }
    }
}

// 设置障碍物和背景一起流动
function Hinder(type, left, id){
	this.speedUpTime = 300;
	this.id = id;
	this.type = type;
	this.width = hinders[type]["width"];
	this.height = hinders[type]["height"];
	this.left = left;
	this.top = -200;
	//this.speed = 0.04 * Math.pow(1.2, Math.floor(gameMonitor.time/this.speedUpTime));
	this.loop = -100;

	var p = this.type == 0 ? 'images/'+hinders[type]["name"]+'.png' : 'images/'+hinders[type]["name"]+'.png';
	this.pic = gameMonitor.im.createImage(p);
}
Hinder.prototype.paint = function(ctx){
	ctx.drawImage(this.pic, this.left, this.top, this.width, this.height);
}
Hinder.prototype.move = function(ctx){
	this.top = ++this.loop * realSpeed;
   // console.log(this.top);
	if(this.top>gameMonitor.h){
	 	gameMonitor.zList[this.id] = null;
	}
	else{
		this.paint(ctx);
	}
}


function ImageMonitor(){
	var imgArray = [];
	return {
		createImage : function(src){
			return typeof imgArray[src] != 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src])
		},
		loadImage : function(arr, callback){
			for(var i=0,l=arr.length; i<l; i++){
				var img = arr[i];
				imgArray[img] = new Image();
				imgArray[img].onload = function(){
					if(i==l-1 && typeof callback=='function'){
						callback();
					}
				}
				imgArray[img].src = img
			}
		}
	}
}

var gameMonitor = {
	w : pageSize.pageWidth,
	h : pageSize.pageHeight,
	bgWidth : pageSize.pageWidth,
	// bgHeight : 1126,
	bgHeight:pageSize.pageHeight,
	time : 0,
	timmer : null,
    clockSecond:0,
    clockMinute:0,
	bgloop : 0,
    totalDistance:0,
	channelLeft:pageSize.pageWidth/2-40,
	channelRight:pageSize.pageWidth/2+40,//初始的通道值
    channelDirection:1,
	genorateSpeed:40,
	im : new ImageMonitor(),
	zList : [],
    bList:[],
	bgDistance : 0,//背景位置
	eventType : {
		start : 'touchstart',
		move : 'touchmove',
		end : 'touchend'
	},
	init : function(){
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');
		//绘制背景
		var bg = new Image();
		_this.bg = bg;
		bg.onload = function(){
          	ctx.drawImage(bg, 0, 0, _this.bgWidth, _this.bgHeight);          	
		}
		bg.src = 'images/BG.png';
		_this.initListener(ctx);
        //绑定初始开始游戏按钮
        $("#guidePanel").on("click",function(){
            this.style.display="none";
            if(leftNumber==0)
            {
                $("#gameOverNonePanel").css("display","block");return false;
            }
            $("#begin3").show();
            setTimeout(function(){
                $("#begin3").hide();
                $("#begin2").show();
                setTimeout(function(){
                    $("#begin2").hide();
                    $("#begin1").show();
                    setTimeout(function(){
                        $("#begin1").hide();
                        $("#begingo").show();
                        setTimeout(function(){
                            $("#begingo").hide();
                            _this.play(ctx)
                        },1000);
                    },1000);
                },1000);
            },1000);
            leftNumber--;
            $("#hasNum").html(leftNumber);
        });
        //绑定再次游戏按钮
        $("#playAgainBtn").on("click",function(){
            if(issendding==1)
            {
                alert("网络太卡，请稍等或关闭重试");
                return false;
            }
            $("#gameOverLowPanel").css("display","none");
            if(leftNumber==0)
            {
                $("#gameOverNonePanel").css("display","block");return false;
            }
            $("#begin3").show();
            setTimeout(function(){
                $("#begin3").hide();
                $("#begin2").show();
                setTimeout(function(){
                    $("#begin2").hide();
                    $("#begin1").show();
                    setTimeout(function(){
                        $("#begin1").hide();
                        $("#begingo").show();
                        setTimeout(function(){
                            $("#begingo").hide();
                            _this.playAgain();
                        },1000);
                    },1000);
                },1000);
            },1000);
            leftNumber--;
            $("#hasNum").html(leftNumber);
        });
	},
	initListener : function(){
		$(document).on(gameMonitor.eventType.move, function(event){
			event.preventDefault();
		});

	},
    play:function(ctx){
        var _this=this;
        _this.ship = new Ship(ctx);
        _this.ship.paint();
        _this.ship.controll();
        _this.bList[0]=new setBlock(0,ctx);
        blocks[0]["appear"]=1;
        _this.bList[0].paint();
        _this.bList[1]=new setBlock(1,ctx);
        blocks[1]["appear"]=1;
        gameMonitor.run(ctx);
    },
    playAgain:function()
    {
        var _this=this;
        var canvas = document.getElementById('stage');
        var ctx = canvas.getContext('2d');
        _this.reset();
        _this.ship = new Ship(ctx);
        _this.ship.controll();
        _this.bList[0]=new setBlock(0,ctx);
        blocks[0]["appear"]=1;
        _this.bList[0].paint();
        _this.bList[1]=new setBlock(1,ctx);
        blocks[1]["appear"]=1;
        _this.run(ctx);
    },
	rollBg : function(ctx){
		if(this.bgDistance>=this.bgHeight){
			this.bgloop = 0;
		}
		this.bgDistance = ++this.bgloop * realSpeed;
        this.totalDistance+=realSpeed;
        console.log(this.totalDistance);
        var realmiter=Math.floor(this.totalDistance/16);
        $("#hasmeter").html(realmiter+"m");
		ctx.drawImage(this.bg, 0, this.bgDistance-this.bgHeight, this.bgWidth, this.bgHeight);
		ctx.drawImage(this.bg, 0, this.bgDistance, this.bgWidth, this.bgHeight);
	},
	run : function(ctx){
		var _this = gameMonitor;
		ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
        //判断时间加速
        if(_this.time%3==0)
        {
            realSpeed+=0.005;
            _this.genorateSpeed-=0.015;
        }
		_this.rollBg(ctx);
        //判断其他的固定块的情况
        for(var j=_this.bList.length-1;j>=0;j--)
        {
            if(blocks[j]["appear"]==1)
            {
                _this.bList[j].paint();
                _this.bList[j].move();
            }
        }
		//绘制龙舟
		_this.ship.paint();
		_this.ship.impact(_this.zList);


		//产生障碍
		_this.genorateHinder();

		//绘制障碍
		for(i=_this.zList.length-1; i>=0; i--){
			var f = _this.zList[i];
			if(f){
				f.paint(ctx);
				f.move(ctx);
			}
			
		}
		_this.timmer = setTimeout(function(){
			gameMonitor.run(ctx);
		}, Math.round(1000/60));
		_this.time++;
        if(_this.time%60)
        {
            _this.clockSecond++;
            if(_this.clockSecond==60)
            {
                _this.clockMinute++;
                _this.clockSecond=0;
            }
            var minute, second;
            if(_this.clockMinute<10)
            {
                 minute="0"+_this.clockMinute;
            }
            else
            {
                 minute=_this.clockMinute;
            }
            if(_this.clockSecond<10)
            {
                 second="0"+_this.clockSecond;
            }
            else{
                 second=_this.clockSecond;
            }
            $("#time").html(minute+":"+second);
        }
        //判断已经到达第几百米
        //console.log(this.totalDistance);
        if(this.totalDistance+blocks[1]["initTop"]+120>1600&&blocks[2]["use"]==0)
        {
            this.bList[2]=new setBlock(2,ctx);
            blocks[2]["appear"]=1;
            blocks[2]["use"]=1;
        }
        if(this.totalDistance+blocks[1]["initTop"]*2+120>3200&&blocks[3]["use"]==0)
        {
            this.bList[3]=new setBlock(3,ctx);
            blocks[3]["appear"]=1;
            blocks[3]["use"]=1;
        }
        if(this.totalDistance+blocks[1]["initTop"]*2+120>4800&&blocks[4]["use"]==0)
        {
            this.bList[4]=new setBlock(4,ctx);
            blocks[4]["appear"]=1;
            blocks[4]["use"]=1;
        }
        if(this.totalDistance+blocks[1]["initTop"]*2+120>6400&&blocks[5]["use"]==0)
        {
            this.bList[5]=new setBlock(5,ctx);
            blocks[5]["appear"]=1;
            blocks[5]["use"]=1;
        }
        if(this.totalDistance+blocks[1]["initTop"]*2+120>8000&&blocks[6]["use"]==0)
        {
            this.bList[6]=new setBlock(6,ctx);
            blocks[6]["appear"]=1;
            blocks[6]["use"]=1;
        }
        if(this.totalDistance>8000)
        {
            $("#hasmeter").html("500m");
            gameMonitor.stop();
            $('#gameOverGoodPanel').show();
            issendding=1;
            sendResult(gameMonitor.clockMinute,Math.floor(gameMonitor.totalDistance/16));
        }
	},
	stop : function(){
		var _this = this
		$('#stage').off(gameMonitor.eventType.start + ' ' +gameMonitor.eventType.move);
		setTimeout(function(){
			clearTimeout(_this.timmer);
		}, 0);
		
	},
	genorateHinder : function(){
		var genRate = this.genorateSpeed; //产生障碍的频率
		var random = Math.random();
		if(random*genRate>genRate-1){
			var left = Math.random()*(this.w - 50);
            var lrrandom=Math.random();
            var lrrl=5*lrrandom;
            var leftBorder=pageSize.pageWidth-80;
           // console.log(lrrl);
			if(this.channelLeft>=0&&this.channelLeft<=leftBorder)
			{
				if(this.channelDirection==1)
				{
					this.channelLeft+=lrrl;
					this.channelRight+=lrrl;
				}
				else
				{
					this.channelLeft-=lrrl;
					this.channelRight-=lrrl;
				}
			}
			else
			{
				if(this.channelLeft>leftBorder)
				{
                    this.channelDirection=0;
					this.channelLeft-=lrrl;
					this.channelRight-=lrrl;
				}
				else
				{
                    this.channelDirection=1;
					this.channelLeft+=lrrl;
					this.channelRight+=lrrl;
				}
			}
			for(var i=this.zList.length-1; i>=0; i--){
			var f = this.zList[i];
			if(f)
			{
				var lcw1=this.channelLeft-f.left>f.width;
			var lcw2=f.left>this.channelRight;
			var lch1=f.top<-f.height;
			if(!(lcw1||lcw2)&&lch1){
				this.zList[f.id] = null;
			}
			}
		}
		var type = Math.floor(left)%9;
		var zw1=left>this.channelRight;
		var zw2=this.channelLeft-left>hinders[type]["width"];
		if(zw1||zw2)
		{
			var id = this.zList.length;
			var f = new Hinder(type, left, id);
			this.zList.push(f);
		}
		}
	},
	reset : function(){
		this.zList = [];
		this.bgloop = 0;
		this.timmer = null;
		this.time = 0;
        this.clockSecond=0;
        this.clockMinute=0;
        this.totalDistance=0;
        this.genorateSpeed=40;
        realSpeed=2;
        for(var j=blocks.length-1;j>=0;j--)
        {
            blocks[j]["appear"]=0;
            blocks[j]["use"]=0;
        }
	},
	isMobile : function(){
		var sUserAgent= navigator.userAgent.toLowerCase(),
		bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp= sUserAgent.match(/midp/i) == "midp",
		bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid= sUserAgent.match(/android/i) == "android",
		bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
		bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
     }
}
if(!gameMonitor.isMobile()){
	gameMonitor.eventType.start = 'mousedown';
	gameMonitor.eventType.move = 'mousemove';
	gameMonitor.eventType.end = 'mouseup';
}

gameMonitor.init();