/**
 * Created by aillieo on 16/9/3.
 */



var LayerBlocks = cc.Layer.extend({
    _basePoint:null,
    _blocks:[],
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


        self.initMatrix();


        self._pathFinder = new PathFinder();
        self.addChild(self._pathFinder);



        var operationListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "TOUCH",
            callback: self.handleTouch
        });
        cc.eventManager.addListener(operationListener,self);

        
        //self.scheduleUpdate();


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

        for(var r = 0; r<GlobalPara.rows; r++) {

            for(var c = 0; c<GlobalPara.columns; c++){

                var block = new BlockElement();

                block.setTypeIndex(0);

                block.setRow(r);
                block.setCol(c);

                block.setPosition(self.getPositionByDim(r,c));

                self.addChild(block);

                self._blocks[r * GlobalPara.columns + c] = block;


            }

        }



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

        var length = self._blocks.length;
        for (var i =0 ; i<length ;i++){
            if(cc.rectContainsPoint(this._blocks[i].getBoundingBox(),p)){


                return this._blocks[i];
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

        //cc.log(p.x.toString() + ", " + p.y.toString() + ", " + dat.opt.toString());

        //self._blockSource = self.getBlockContainingPoint(p);
        //self._blockTarget = self.getNeighborBlock(self._blockSource,dtRow,dtCol);

        //cc.log(dir);

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



