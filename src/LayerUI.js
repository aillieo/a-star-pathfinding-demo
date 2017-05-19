/**
 * Created by aillieo on 16/9/6.
 */



var LayerUI = cc.Layer.extend({
    _status:null,
    _operation:0,
    _labelStatus:null,
    _labelOperation:null,
    _btnIn:null,
    _btnOut:null,
    _btnBlock:null,
    _btnEmpty:null,
    _btnFind:null,
    ctor:function () {

        this._super();

        var self = this;

        var size = cc.winSize;

        self._labelStatus = new cc.LabelTTF("STATUS", "Arial", 38);
        self._labelStatus.x = size.width/2;
        self._labelStatus.y = size.height * 0.8 - 30;
        self.addChild(self._labelStatus);

        self._labelOperation = new cc.LabelTTF("OPERATION", "Arial", 38);
        self._labelOperation.x = size.width/2;
        self._labelOperation.y = size.height * 0.8 + 20;
        self.addChild(self._labelOperation);

        var labelIn = new cc.LabelTTF("IN", "Arial", 38);
        self._btnIn = new cc.MenuItemLabel(labelIn,self.setOptIn,self);
        self._btnIn.x = size.width/2 + 100;
        self._btnIn.y = size.height * 0.8;

        var labelOut = new cc.LabelTTF("OUT", "Arial", 38);
        self._btnOut = new cc.MenuItemLabel(labelOut,self.setOptOut,self);
        self._btnOut.x = size.width/2 + 100;
        self._btnOut.y = size.height * 0.8;

        var labelBlock = new cc.LabelTTF("BLOCK", "Arial", 38);
        self._btnBlock = new cc.MenuItemLabel(labelBlock,self.setOptBlock,self);
        self._btnBlock.x = size.width/2 + 100;
        self._btnBlock.y = size.height * 0.8;

        var labelEmpty = new cc.LabelTTF("EMPTY", "Arial", 38);
        self._btnEmpty = new cc.MenuItemLabel(labelEmpty,self.setOptEmpty,self);
        self._btnEmpty.x = size.width/2 + 100;
        self._btnEmpty.y = size.height * 0.8;

        var labelFind = new cc.LabelTTF("FIND", "Arial", 38);
        self._btnFind = new cc.MenuItemLabel(labelFind,self.startFind,self);
        self._btnFind.x = size.width/2 + 100;
        self._btnFind.y = size.height * 0.8;


        var menu = new cc.Menu(self._btnIn,self._btnOut,self._btnBlock,self._btnEmpty,self._btnFind);
        menu.alignItemsVertically();
        this.addChild(menu);
        menu.x = size.width/2 + 200;
        menu.y = size.height * 0.8;


        var statusListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "STATUS",
            callback: self.updateStatus
        });
        cc.eventManager.addListener(statusListener,self);




        return true;
    },

    setOptIn : function(){

        var self = this;
        self._updateOperation(2);
        self._labelOperation.setString("setting In");
    },

    setOptOut : function(){

        var self = this;
        self._updateOperation(3);
        self._labelOperation.setString("setting Out");
    },

    setOptEmpty : function(){

        var self = this;
        self._updateOperation(0);
        self._labelOperation.setString("setting Empty");
    },

    setOptBlock : function(){

        var self = this;
        self._updateOperation(1);
        self._labelOperation.setString("setting Block");
    },

    startFind : function(){

        var self = this;
        self._labelStatus.setString("Finding...");
        cc.eventManager.dispatchCustomEvent("START_FIND");
    },

    
    _updateOperation : function (opt) {

        var dat = {
            operation : opt
        };
        cc.eventManager.dispatchCustomEvent("OPERATION",dat);

    },
    
    updateStatus : function(event){

        cc.log("updateStatus");
        var self = event.getCurrentTarget();
        var dat = event.getUserData();
        self._status = dat.status;
        self._labelStatus.setString(self._status.toString());
    }


});
