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
            for (i in arr) {
                if (this[i] === blk) return true;
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
        var _out = self.blockOUT;

        _open.push(_in);

        do
        {

            // break;

            // 1. update G H F


            // 2. select one in OPEN
            var best = _open[0];
            for(var i = 0 ; i < _open.length ; i++)
            {
                //if()
            }

            // 3. move to CLOSED


            // 4. clear OPEN


            // 5. find and insert to OPEN

            break;

        }
        while(!arrayContainsBlock(_closed,_out) && _open.length>0);


        return true;

    },
    
    update:function(delta)
    {
        cc.log("finding");
    }

});



