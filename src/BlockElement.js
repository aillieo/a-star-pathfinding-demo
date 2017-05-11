/**
 * Created by aillieo on 16/9/3.
 */


var BlockElement = cc.Sprite.extend({
    _pos_col:0,
    _pos_row:0,
    _typeIndex:0,
    _valueG:0,
    _valueH:0,
    _valueF:0,
    _labelG:null,
    _labelH:null,
    _labelF:null,
    ctor:function () {

        this._super();

        var self = this;
        self.setCascadeOpacityEnabled(true);
        self.setTexture(res.blank);
        self.setColor(cc.color(98,98,98));
        var wid = GlobalPara.blockWidth;
        self.setTextureRect(cc.rect(0,0,wid,wid));


        self._indexLabel = new cc.LabelTTF("", "Arial", 38);
        self._indexLabel.x = self.getContentSize().width/2;
        self._indexLabel.y = self.getContentSize().height/2;
        self.addChild(self._indexLabel, 5);

        
        self._valueG = 0;
        self._valueH = 0;
        self._valueF = 0;
        
        var size = self.getContentSize();
        
        self._labelG = new cc.LabelTTF(self._valueG.toString(), "Arial", 18);
        self._labelG.x = size.width * 0.25;
        self._labelG.y = size.height * 0.25;
        self.addChild(self._labelG);
        
        self._labelH = new cc.LabelTTF(self._valueH.toString(), "Arial", 18);
        self._labelH.x = size.width * 0.75;
        self._labelH.y = size.height * 0.25;
        self.addChild(self._labelH);
        
        self._labelF = new cc.LabelTTF(self._valueF.toString(), "Arial", 18);
        self._labelF.x = size.width * 0.25;
        self._labelF.y = size.height * 0.75;
        self.addChild(self._labelF);
        
        return true;
    },
    
    setTypeIndex:function(typeIndex){

        this._typeIndex = typeIndex;
        var self = this;

        var text = "";
        switch (typeIndex)
        {
            case 0:
                text = "";
                break;
            case 1:
                text = "x";
                break;
            case 2:
                text = "IN";
                break;
            case 3:
                text = "OUT";
                break;
        }
        self._indexLabel.setString(text);




        // var rgbR = (GlobalPara.blockTypes - this._typeIndex) * 255/ GlobalPara.blockTypes;
        // var rgbB = this._typeIndex * 255/ GlobalPara.blockTypes;
        // var rgbG = 255- Math.abs(rgbR - rgbB);
        // self.setColor(cc.color(rgbR, rgbG, rgbB));
    },

    getCol : function () {

        return this._pos_col;
    },

    getRow : function () {

        return this._pos_row;

    },

    getTypeIndex:function () {

        return this._typeIndex;
    },

    setRow : function (row) {

        this._pos_row = row;
    },

    setCol : function (col) {

        this._pos_col = col;
    }

    


});
