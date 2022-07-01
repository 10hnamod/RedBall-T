// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class star extends cc.Component {

    // @property(cc.Prefab)
    // star: cc.Prefab[] = []

    onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    // LIFE-CYCLE CALLBACKS:
 
    // onLoad () {}
    }
    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.getComponent("Ball player")){
            this.node.destroy();
            console.log("Sao bi huy");
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        cc.tween(this.node).repeatForever(
            cc.tween(this.node).to(0.75, {angle: 10}, {easing: "smooth"})
            .to(0.75, {angle: -10}, {easing: "smoth"})
        ).start()
    }

    // update (dt) {}
}
