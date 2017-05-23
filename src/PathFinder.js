/**
 * Created by yiyiran on 17/5/11.
 */



var PathFinder = cc.Node.extend({
    openList:null,
    closedList:null,
    blockIN:null,
    blockOUT:null,
    _allBlocks:null,
    ctor:function () {


        this._super();

        this.openList = new Array(0);
        this.closedList = new Array(0);



        return true;
    },

    arrayContainsBlock:function(arr,blk)
    {
            for (var i=0; i<arr.length; i++) {
                if (arr[i] == blk) return true;
            }
            return false;
    },




    getNeighborBlock :function(blockRef,deltaRow,deltaCol){

        var self = this;

        var r = blockRef.getRow();
        var c = blockRef.getCol();
        r = r + deltaRow;
        c = c + deltaCol;
        if(c>= 0 && c< GlobalPara.columns && r>=0 && r < GlobalPara.rows){
            return self._allBlocks[r * GlobalPara.columns + c];

        }
        return null;


    },

    getEstimatedDistance: function(block1, block2){

        if(block1 == null || block2 == null)
        {
            return NaN;
        }
        return Math.abs(block1.getCol() - block2.getCol()) + Math.abs(block1.getRow() - block2.getRow())

    },

    setAllBlocks: function(blocks)
    {
        var self = this;
        self._allBlocks = blocks;
    },
    
    getAllBlocks: function()
    {
        return this._allBlocks;
    },

    findPath:function()
    {

        var self = this;
        if(self.blockIN == null ||
            self.blockOUT == null ||
            self.blockIN == self.blockOUT)
        {
            cc.log("in/out error");
            return false;
        }

        cc.log("start find");

        // self.scheduleUpdate();
        self.schedule(self.update,1.0);

        var _open = self.openList;
        var _closed = self.closedList;
        _open.splice(0,_open.length);
        _closed.splice(0,_closed.length);

        var _in = self.blockIN;
        _open.push(_in);
        
        return true;

    },
    
    checkBlock:function(block)
    {
        var self = this;
        if(null == block)
        {
            return false;
        }
        if(block.getTypeIndex() != 0 &&
           block.getTypeIndex() != 3)
        {
            return false;
        }
        if(self.arrayContainsBlock(self.closedList,block))
        {
            return false;
        }
        
        return true;
    },
    
    update:function(delta)
    {
        cc.log("finding...");
        
        var self = this;
        
        var _open = self.openList;
        var _closed = self.closedList;

        var _in = self.blockIN;
        var _out = self.blockOUT;
        
        
        // 1. update G H F
        for(var i = 0 ; i < _open.length; i++ )
        {
            _open[i].setG(_closed.length +1);
            _open[i].setH(self.getEstimatedDistance(_open[i],_out));
        }
        
        
        // 2. select one in OPEN
        var best = _open[0];
        for(var i = 0 ; i < _open.length; i++ )
        {
            if(best.getF() > _open[i].getF())
            {
                best = _open[i];
            }
        }


        // 3. move to CLOSED
        _closed.push(best);
        best.setClosed();


        // 4. clear OPEN
        _open.splice(0,_open.length);


        // 5. find and insert to OPEN
        var bUp = self.getNeighborBlock(best,0,1);
        if(self.checkBlock(bUp))
        {
             _open.push(bUp);
        }
        var bDown = self.getNeighborBlock(best,0,-1);
        if(self.checkBlock(bDown))
        {
             _open.push(bDown);
        }
        var bLeft = self.getNeighborBlock(best,-1,0);
        if(self.checkBlock(bLeft))
        {
             _open.push(bLeft);
        }
        var bRight = self.getNeighborBlock(best,1,0);
        if(self.checkBlock(bRight))
        {
             _open.push(bRight);
        }
        
        
        // 6. check end
        if(self.arrayContainsBlock(_closed,_out))
        {
            // end : found
            cc.log("end : found");
            self.unschedule(self.update);
        }
        else if(_open.length == 0)
        {
            // end : not found
            cc.log("end : not found");
            self.unschedule(self.update);
        }
        
    }

});



