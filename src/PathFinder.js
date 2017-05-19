/**
 * Created by yiyiran on 17/5/11.
 */



var PathFinder = cc.Node.extend({
    openList:null,
    closedList:null,
    blockIN:null,
    blockOUT:null,
    ctor:function () {


        this._super();

        this.openList = new Array(0);
        this.closedList = new Array(0);


        return true;
    }
    

});



