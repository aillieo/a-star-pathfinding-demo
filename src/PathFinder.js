/**
 * Created by yiyiran on 17/5/11.
 */



var PathFinder = cc.Node.extend({
    _openList:[],
    _closedList:[],
    blockIN:null,
    blockOUT:null,
    ctor:function () {


        this._super();

        this._openList = new Array(0);
        this._closedList = new Array(0);


        return true;
    }
    

});



