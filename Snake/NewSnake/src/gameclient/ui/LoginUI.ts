module gameclient.engine{
    export class LoginUI extends egret.DisplayObjectContainer{
        private connectBtn: eui.Button = null;
        
        public constructor(){
            super();

            let connectBtn = this.connectBtn;
            if(connectBtn == null) {
                connectBtn = new eui.Button();
                connectBtn.label = "连接websocket";
                this.addChild(connectBtn);
                connectBtn.x = 250;
                connectBtn.y = 250;
                this.connectBtn = connectBtn;
            }

            
        }

        public addConnectBtnEventListener(eventName:string, eventFun: Function, eventObject: any): void{
            this.connectBtn.addEventListener(eventName, eventFun, eventObject);
        }

       
    }
}