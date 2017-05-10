/**
 * Created by aillieo on 16/9/3.
 */



var LayerBlocks = cc.Layer.extend({
    _blockCreator:null,
    _chainFinder:null,
    _basePoint:null,
    _blockSource:null,
    _blockTarget:null,
    _blocks:[],
    _hasBlockAnimation:true,
    _needSwapAgain:false,
    _needFillWithNewBlocks:false,
    _layerOperationEnabled:false,
    _needCheckDeath:true,
    upperDisplayBound:0,
    _offsetY:-120,
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


        self.initMatrix();


        var operationListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "OPERATION",
            callback: self.handleOperation
        });
        cc.eventManager.addListener(operationListener,self);




        self.scheduleUpdate();








        return true;
    },


    initMatrix:function(){


        var self = this;

        var size = cc.winSize;
        var itemWidth = GlobalPara.blockWidth;



        var px = 0.5* (size.width - GlobalPara.columns * itemWidth - (GlobalPara.columns - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        var py = 0.5* (size.height - GlobalPara.rows * itemWidth - (GlobalPara.rows - 1)* GlobalPara.blockGap) + 0.5*itemWidth + self._offsetY;
        self._basePoint = cc.p(px,py);


        var matrixHeight = (itemWidth+GlobalPara.blockGap)*GlobalPara.rows;
        self._upperDisplayBound = py + matrixHeight + 0*itemWidth;

        self._blocks = new Array(GlobalPara.columns * GlobalPara.rows);
        self._blocksToRemove = [];

        for(var r = 0; r<GlobalPara.rows; r++) {

            for(var c = 0; c<GlobalPara.columns; c++){

                self.createAndDropBlock(r,c,matrixHeight);

            }

        }



    },

    createAndDropBlock:function(row,col,dropHeight) {

        var self = this;

        var block = new BlockElement();

        block.setTypeIndex(0);

        block.setRow(row);
        block.setCol(col);

        block.setPosition(self.getPositionByDim(row,col));

    },

    getPositionByDim:function(row,col) {

        var width = GlobalPara.blockWidth;
        var self = this;
        var x = self._basePoint.x + col*(width + GlobalPara.blockGap);
        var y = self._basePoint.y + row*(width + GlobalPara.blockGap);
        return cc.p(x,y);

    },

    update : function (delta) {

        //cc.log(delta);

        var self = this;
        

        //



    },




    getBlockContainingPoint : function (p) {



        var self = this;

        var length = self._blocks.length;
        for (var i =0 ; i<length ;i++){
            if(cc.rectContainsPoint(this._blocks[i].getBoundingBox(),p)){


                return this._blocks[i];
            }
        }





    },

    handleOperation:function(event){


        var self = event.getCurrentTarget();

        var dat = event.getUserData();

        var p = dat.pt;
        var dir = dat.dir;

        self._blockSource = self.getBlockContainingPoint(p);




        var dtRow = 0;
        var dtCol = 0;


        if(dir == "up"){
            dtRow = 1;
        }
        else if(dir == "down"){
            dtRow = -1;
        }
        else if(dir == "left"){
            dtCol = -1;
        }
        else if(dir == "right"){
            dtCol = 1;
        }


        self._blockTarget = self.getNeighborBlock(self._blockSource,dtRow,dtCol);

        //cc.log(dir);

        //self._blockSource.setScale(0.5);
        //self._blockTarget.setScale(0.5);
        self.swapBlockPos(self._blockTarget, self._blockSource);
        self._needSwapAgain = true;

    },

    getNeighborBlock :function(blockRef,deltaRow,deltaCol){

        var self = this;

        var r = blockRef.getRow();
        var c = blockRef.getCol();
        r = r + deltaRow;
        c = c + deltaCol;
        if(c>= 0 && c< GlobalPara.columns && r>=0 && r < GlobalPara.rows){
            return self._blocks[r * GlobalPara.columns + c];

        }


    }




});



