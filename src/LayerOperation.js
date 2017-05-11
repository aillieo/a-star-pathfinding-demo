/**
 * Created by aillieo on 16/9/5.
 */


var LayerOperation = cc.Layer.extend({
    _operation:0,
    ctor:function () {

        this._super();

        var self = this;

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target : self,
            onTouchBegan: self.onTouchBegan
        });
        cc.eventManager.addListener(touchListener,self);



        var changeOperationListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "OPERATION",
            callback: function (event) {
                var self = event.getCurrentTarget();
                var dat = event.getUserData();
                self._operation = dat.operation;
                cc.log("new opt " + self._operation.toString());
            }
        });
        cc.eventManager.addListener(changeOperationListener,self);




        return true;
    },

    onTouchBegan:function(touch , event){


        var self = event.getCurrentTarget();

        var touchX = touch.getLocation().x;
        var touchY = touch.getLocation().y;

        var dat = {
            pt : cc.p(touchX,touchY),
            opt : self._operation
        };
        //eve.setUserData(data);

        cc.eventManager.dispatchCustomEvent("TOUCH",dat);
        
        return true;

    }

});
