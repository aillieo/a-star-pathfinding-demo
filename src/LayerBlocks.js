/**
 * Created by aillieo on 16/9/3.
 */



var LayerBlocks = cc.Layer.extend({
    _basePoint:null,
    _offsetY:-120,
    _pathFinder:null,
    ctor:function () {


        this._super();

        var self= this;
        var size = cc.winSize;

        var bg = new cc.Sprite(res.HelloWorld_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        self.addChild(bg, -1);


        var allBlocks = self.initMatrix();


        self._pathFinder = new PathFinder();
        self.addChild(self._pathFinder);
        self._pathFinder.setAllBlocks(allBlocks);



        var operationListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "TOUCH",
            callback: self.handleTouch
        });
        cc.eventManager.addListener(operationListener,self);

        
        var startFindListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "START_FIND",
            callback: self.handleStartFind
        });
        cc.eventManager.addListener(startFindListener,self);

        
        var resetListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "RESET",
            callback: self.handleReset
        });
        cc.eventManager.addListener(resetListener,self);

        
        //self.scheduleUpdate();


        return true;
    },


    initMatrix:function(){


        var self = this;
        var allBlocks = [];

        var size = cc.winSize;
        var itemWidth = GlobalPara.blockWidth;



        var px = 0.5* (size.width - GlobalPara.columns * itemWidth - (GlobalPara.columns - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        var py = 0.5* (size.height - GlobalPara.rows * itemWidth - (GlobalPara.rows - 1)* GlobalPara.blockGap) + 0.5*itemWidth + self._offsetY;
        self._basePoint = cc.p(px,py);


        var matrixHeight = (itemWidth+GlobalPara.blockGap)*GlobalPara.rows;
        self._upperDisplayBound = py + matrixHeight + 0*itemWidth;

        allBlocks = new Array(GlobalPara.columns * GlobalPara.rows);

        for(var r = 0; r<GlobalPara.rows; r++) {

            for(var c = 0; c<GlobalPara.columns; c++){

                var block = new BlockElement();

                block.setTypeIndex(0);

                block.setRow(r);
                block.setCol(c);

                block.setPosition(self.getPositionByDim(r,c));

                self.addChild(block);

                allBlocks[r * GlobalPara.columns + c] = block;


            }

        }
        
        return allBlocks;



    },


    getPositionByDim:function(row,col) {

        var width = GlobalPara.blockWidth;
        var self = this;
        var x = self._basePoint.x + col*(width + GlobalPara.blockGap);
        var y = self._basePoint.y + row*(width + GlobalPara.blockGap);
        return cc.p(x,y);

    },


    getBlockContainingPoint : function (p) {



        var self = this;
        var allBlocks = self._pathFinder.getAllBlocks();
        
        var length = allBlocks.length;
        for (var i =0 ; i<length ;i++){
            if(cc.rectContainsPoint(allBlocks[i].getBoundingBox(),p)){


                return allBlocks[i];
            }
        }





    },

    handleTouch:function(event){


        var self = event.getCurrentTarget();

        var dat = event.getUserData();

        var p = dat.pt;

        var blk = self.getBlockContainingPoint(p);
        if(blk == null)
        {
            return;
        }

        if(dat.opt == 2)
        {
            if(self._pathFinder.blockIN != null)
            {
                self._pathFinder.blockIN.setTypeIndex(0);
            }
            self._pathFinder.blockIN = blk;
        }
        else if(dat.opt == 3)
        {
            if(self._pathFinder.blockOUT != null)
            {
                self._pathFinder.blockOUT.setTypeIndex(0);
            }
            self._pathFinder.blockOUT = blk;
        }
        blk.setTypeIndex(dat.opt);

    },

    handleStartFind:function(event){
        
        var self = event.getCurrentTarget();


        self._pathFinder.findPath();




    },
    
    handleReset:function(event)
    {
        var self = event.getCurrentTarget();
        self._pathFinder.clearPath();
    }



});



