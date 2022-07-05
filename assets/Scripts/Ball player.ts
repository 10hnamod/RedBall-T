import camera from "./Camera_control";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
    
    @property(cc.Prefab)
    star: cc.Prefab = null;

    public static ins: Ball;
    
    Direction: number;
    Rigid_Body: cc.RigidBody;
    Vel_Max_X: number;
    Walk_Force: number;
    Jump_Force: number;
    On_The_Ground: boolean;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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
        this.Vel_Max_X = 300; // vận tốc max theo chiều x
        this.Walk_Force = 5000; // tự đi
        this.Jump_Force = 1100000; // nhảy
        this.On_The_Ground = false;

        Ball.ins = this;
    }
    
    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.On_The_Ground = true;
        }
    }
    initStar(FxPosition, node) {        
        var star = cc.instantiate(this.star);
        node.addChild(star);
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
    }
    onButton_jumpClick(){
        if(this.On_The_Ground){
            this.Rigid_Body.applyForceToCenter( cc.v2(0, this.Jump_Force), true)
            this.On_The_Ground = false;
            cc.log("jump")
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
