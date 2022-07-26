// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./Main_game_control";

const {ccclass, property} = cc._decorator;
enum SOUND {
    STAR
}

@ccclass
export default class star extends cc.Component {

    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];

    

    public static ins: star;

    onLoad(){

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        star.ins = this;
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
    onBeginContact(contact, selfCollider, otherCollider){
        if(otherCollider.node.getComponent("Ball player")){
            GameManager.ins.initStar(selfCollider.node);
            cc.tween(selfCollider.node).to(0.5, {scale: 0}, {easing: "smooth"})
            .start();
            ++GameManager.ins.numberStar;
            this.scheduleOnce(() => {
                selfCollider.node.destroy();
            }, 0.5)
            cc.log("sao sao sao")
        }
        if (window.playsound = true) {
            this.playSound(SOUND.STAR, false)
        }
        cc.log("qsfsadsadsa")
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
