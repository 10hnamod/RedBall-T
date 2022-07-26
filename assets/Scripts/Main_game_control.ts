// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Prefab)
    star: cc.Prefab = null;

    @property(cc.Node)
    UI: cc.Node = null;

    @property([cc.AudioClip])
    sounds: cc.AudioClip[] = [];

    public static ins: GameManager;
    public numberStar: number = 0;

    onLoad () {
        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0,-2000)
        
        GameManager.ins = this;
    }
    initStar(Node: cc.Node) {        
        var star = cc.instantiate(this.star);
        Node.addChild(star);
    }
    sumStar(){
        if(this.numberStar === 0 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 0;
            this.UI.getChildByName("icon_star_active").active = false;
            this.UI.getChildByName("icon_star_active copy 1").active = false;
            this.UI.getChildByName("icon_star_active copy 2").active = false;
        }
        if(this.numberStar === 1 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 0.2;
            this.UI.getChildByName("icon_star_active").active = true;
        }
        if(this.numberStar === 2 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 0.4;
            this.UI.getChildByName("icon_star_active").active = true;
        }
        if(this.numberStar === 3 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 0.6;
            this.UI.getChildByName("icon_star_active copy 1").active = true;
        }
        if(this.numberStar === 4 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 0.8;
        }
        if(this.numberStar === 5 ){
            this.UI.getChildByName("star_bar_progress").getComponent(cc.ProgressBar).progress = 1;
            this.UI.getChildByName("icon_star_active copy 2").active = true;
        }
    }
    clickStore () {
        window.gameEnd && window.gameEnd();
        if (window.playsound = true) {
            this.playSound(SOUND.CLICK, false);
        }
        window.openStore();
    }

    start () {

    }

    update (dt) {
        this.sumStar();
    }
}
