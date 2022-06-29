import Ball from "./Ball player"
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Enemy extends cc.Component {


private direction: number = 1;
 
private stop: number = 1;

private isTouch: boolean = false;

private enemyDead: boolean = false;

private start_flag2: boolean = false;

@property({ type: cc.AudioClip })
stomp: cc.AudioClip = null;

// @property(Score_100)
// score_100: Score_100 = null;

onLoad() {
    cc.director.getPhysicsManager().enabled = true
}

update(dt) {
    if(this.start_flag2) {
        // this.enemyMovement(dt);
    }
}

start() {
    this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50, 0);
    this.scheduleOnce(function() {
        this.start_flag2 = true;
    }, 2);
}

// enemyMovement(dt) {
//     this.node.x += -75 * dt * this.direction * this.stop;
// }

onBeginContact(contact, self, other) {
   if(other.node.name == "character") {
        //console.log(parseInt(contact.getWorldManifold().normal.x), parseInt(contact.getWorldManifold().normal.y))
        if(contact.getWorldManifold().normal.y > 0){
            cc.log(contact.getWorldManifold().normal.x)
            if(this.isTouch == false) {
                this.enemyDead = true;
                // cc.audioEngine.playEffect(this.stomp,false);
                // this.score_100.playScore100();
                // this.score_100.addScore100();
                this.stop = 0;
                this.enemyDie();
                other.node.runAction(cc.moveBy(0.3, 0, 300).easing(cc.easeIn(1)));
                this.scheduleOnce(function() {
                    this.node.destroy();
                }, 0.5)
                this.isTouch = true;
            }
        } 
    }
}
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    public enemyDie() {
        this.node.destroy();
    }
}
