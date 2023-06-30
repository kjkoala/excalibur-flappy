import { Actor, CollisionType, Engine, vec } from "excalibur";
import { resources } from "src/app/resources";

const message = resources.message.toSprite();

export class Message extends Actor {
    constructor() {
        super({
            collisionType: CollisionType.PreventCollision
        })
    }

    onInitialize(engine: Engine): void {
        this.pos = vec(engine.halfDrawWidth, engine.halfDrawHeight)
        this.graphics.use(message)
        this.scene.on('restart', () => {
            this.graphics.opacity = 1
        })
        this.scene.on('start', () => {
            this.actions.fade(0, 1000)
        })
    }
}