import Ball from "./Ball player";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class camera extends cc.Component {

    @property(cc.Node)
    Player_node: cc.Node = null;

    @property(cc.Node)
    Back_ground_1: cc.Node = null;

    @property (cc.Node)
    buttonGroup: cc.Node = null;

    @property (cc.Node)
    Ui: cc.Node = null;

    @property (cc.Node)
    Health: cc.Node = null;
   

    // LIFE-CYCLE CALLBACKS:

    
    start () {
        
    }

    update (dt) {
        let  target_position = this.Player_node.getPosition();
        
        // sua khung hinh gioi han tren duoi
        target_position.y = cc.misc.clampf(target_position.y,0,220);



        let current_position = this.node.getPosition();
        current_position.lerp( target_position, 0.5, current_position);
        
        this.node.setPosition(current_position);
        

        // this.node.addChild(this.Back_ground_1)
        this.Back_ground_1.setPosition(current_position.x, current_position.y)
        this.buttonGroup.setPosition(current_position.x, current_position.y)
        this.Ui.setPosition(current_position.x, current_position.y)
        this.Health.setPosition(current_position.x, current_position.y)


        
    }
}
