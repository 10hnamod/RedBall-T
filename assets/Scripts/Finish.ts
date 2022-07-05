// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   

    @property(cc.Node)
    finish: cc.Node = null;

    @property(cc.Node)
    ball: cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true
        this.ball.active = true;
    }


    onBeginContact(contact, self, other) {
        if(other.node.name == "character") {
            this.ball.active = false;
        } 
     }
 
    // LIFE-CYCLE CALLBACKS:
    // onEnable(): void {
    //     // this.finish.position = cc.v3(0, -222);
    // }
 
    // start () {
    //     cc.tween(this.node).repeatForever(
    //         cc.tween(this.node).to(1, {position: cc.v3(0, -222)}, {easing: "smooth"})
    //         .delay(0).to(1, {position: cc.v3(0, 210.204)}, {easing: "smooth"})
    //     ).start()
    //     // let angle1 = this.saw.angle;
    //     // cc.tween(this.saw).parallel(
    //     //     cc.tween(this.node).repeatForever(
    //     //         cc.tween(this.node).to(2, {position: cc.v3(0, 176)}, {easing: "smooth"})
    //     //         .delay(0.25).to(2, {position: cc.v3(0, -214)}, {easing: "smooth"})
    //     //     ).start(),
    //     //     cc.tween(this.node).repeatForever(
    //     //         cc.tween(this.node).to(0.5, {angle: angle1}, {easing: "smooth"})
    //     //         // .to(0.5, {angle: 360}, {easing: "smooth"})
    //     //     ).start()
    //     // ).start()
    // }
 
    update (dt) {
        this.finish.angle += 2;
        // cc.log(this.finish.angle);
        let angle1 = this.finish.angle;
        // cc.tween(this.saw)
            cc.tween(this.node).repeatForever(
                cc.tween(this.node).to(0.5, {angle: angle1}, {easing: "smooth"})
                // .to(0.5, {angle: 360}, {easing: "smooth"})
            ).start()
        // .start()
    }
}