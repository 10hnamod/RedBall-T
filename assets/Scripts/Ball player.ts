import camera from "./Camera_control";
import GameManager from "./Main_game_control";
import Star from "./Star";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
enum SOUND {
    JUMP1,
    JUMP2,
    JUMP3,
    FINISH
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
    
    @property(cc.Node)
    Button_right: cc.Node = null;

    @property(cc.Node)
    Button_left: cc.Node = null;

    @property(cc.Node)
    Button_jump: cc.Node = null;

    @property(cc.Node)
    text: cc.Node = null;
    
    @property (cc.Node)
    layer: cc.Node = null;

    @property (cc.Node)
    hand: cc.Node = null;

    @property (cc.Node)
    ball: cc.Node = null;
    
    public static ins: Ball;
    
    Direction: number;
    Rigid_Body: cc.RigidBody;
    Vel_Max_X: number;
    Walk_Force: number;
    Jump_Force: number;
    On_The_Ground: boolean;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyReleased, this);

        this.Button_right.on('touchstart', this.onButton_rightClick, this);
        this.Button_left.on('touchstart', this.onButton_leftClick, this);
        this.Button_jump.on('touchstart', this.onButton_jumpClick, this);
            
        this.text.active = true;
        this.hand.active = true
        this.layer.scale = 10000;
        this.ball.active = true;
    
        this.Direction = 0; // start
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.Vel_Max_X = 500; // vận tốc max theo chiều x
        this.Walk_Force = 5000; // tự đi
        this.Jump_Force = 1000000; // nhảy
        this.On_The_Ground = false;

        Ball.ins = this;
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }
    playSound(soundId: number, loop: boolean = false, delay: number = 0){
        this.scheduleOnce(()=>{
            cc.audioEngine.playEffect(this.sounds[soundId], loop)
        },delay)
    }
    
    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.On_The_Ground = true;
        }
    }
    onCollisionEnter (other, self) {
        if (other.node.name === "finish") {
            this.node.getComponent(sp.Skeleton).setAnimation(0, "happy", true);

            this.node.getComponent(cc.CircleCollider).enabled = false;
            
            // if (window.playsound = true) {
            //     this.playSound(SOUND.FINISH, false)
            // }
            let Pos = GameManager.ins.node.getChildByName("finish").position;
            this.node.getComponent(cc.RigidBody).fixedRotation = true;
            this.node.angle = 0;
            cc.tween(self.node).to(1.5, {scale: self.node.scale - 0.3}, {easing: "smooth"}).start();
            cc.tween(self.node).to(1.5, {opacity: 0}, {easing: "smooth"}).start();
            cc.tween(self.node).to(1.5, {position: Pos}, {easing: "smooth"})
            .call(() => {
                // window.gameEnd && window.gameEnd();
                // window.openStore();
            })
            .start();
        }
        cc.log("deo chay vao ham a")
    }

    onButton_rightClick(){
        // cc.tween(this.node).call((=>
        //     ))
        this.Direction = 1
        cc.log("hang_right")
        this.text.active = false;
        this.layer.scale = 0;
        this.hand.active = false
    }
    onButton_leftClick(){
        this.Direction = -1
        cc.log("hang_left")
        this.text.active = false;
        this.layer.scale = 0;
        this.hand.active = false
    }
    onButton_jumpClick(){
        if(this.On_The_Ground){
            this.Rigid_Body.applyForceToCenter( cc.v2(0, this.Jump_Force), true)
            this.On_The_Ground = false;
            cc.log("jump")
            this.text.active = false;
            this.layer.scale = 0;
            this.hand.active = false
        }
    }

    onKeyPressed(event){
        let key_code = event.keyCode;

        switch(key_code){
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.Direction = -1;
                cc.log("left")
            break;
           
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.Direction = 1;
                cc.log("right")
            break;

            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                if(this.On_The_Ground){
                    this.Rigid_Body.applyForceToCenter( cc.v2(0, this.Jump_Force), true)
                    this.On_The_Ground = false;
                }
            break;
        }
    }

    onKeyReleased(event){
        let key_code = event.keyCode;

        switch(key_code){
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.Direction = 0;
            break;
        }
    }
    // win(){
    //     this.ball.active = true;
    //     cc.tween(this.ball).repeat(3,cc.tween(this.ball)
    //         .to(0, {opacity: 255})
    //         .to(0, {position: cc.v3(350, -900)}, {easing: "smooth"})
    //         .to(1.4, {position: colliderNode}, {easing: "smooth"})
    //         .to(0.25, {opacity: 0}, {easing: "fade"})
    //         .start()
    //     ).call(() => {
    //         this.hand.opacity = 0;
    //     }).start();
    // }

    start () {

    }

    update (dt) {
        if( (this.Direction > 0 && this.Rigid_Body.linearVelocity.x < this.Vel_Max_X) ||
            (this.Direction < 0 && this.Rigid_Body.linearVelocity.x > -this.Vel_Max_X)
        ){
            this.Rigid_Body.applyForceToCenter(cc.v2(this.Direction * this.Walk_Force,0), true);
        }
    }
}
