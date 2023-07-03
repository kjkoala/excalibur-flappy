import { Actor, SpriteSheet, Animation, range, Engine, CollisionType, vec, RotationType, Color, AnimationStrategy } from "excalibur";
import { resources } from "src/app/resources";
import { Main } from "src/scenes";
import { WindowResizeComponent } from "src/utlis/WindowResizeComponent";

const birdSprite = SpriteSheet.fromImageSource({
    image: resources.bird,
    grid: {
        rows: 1,
        columns: 3,
        spriteHeight: 24,
        spriteWidth: 34,
    }
})

const flyAnim = Animation.fromSpriteSheet(birdSprite, range(0, 3), 100, AnimationStrategy.PingPong)

export class ClassBird extends Actor {
    declare scene: Main
    vy = 0;
    weight = 0.5;
    maxAngle = Math.PI / 3;
    public base: number;
    constructor(game: Engine) {
        super({
            name: 'Bird',
            radius: 10,
            color: Color.Red,
            collisionType: CollisionType.Passive,
            z: 3,
        })
        this.base = game.drawHeight - 112;
        this.addComponent(new WindowResizeComponent(game))
    }

    onPostUpdate(): void {
        if (this.pos.y < this.base && this.scene.state.playing) {
            this.pos.y -= this.vy;
            this.vy -= this.weight;
        } else if (this.pos.y >= this.base && !this.scene.state.dead) {
            this.scene.emit('died', 'ground')
        }
    }

    onWindowResize(engine: Engine) {
        engine.removeScene('main')
        engine.addScene('main', new Main)
        engine.goToScene('main')
    }

    onInitialize(engine: Engine): void {
        this.graphics.use(flyAnim);
        this.pos = vec(50, engine.halfDrawHeight);
        const onFly = this.onFly.bind(this)
        engine.input.pointers.on('down', onFly);
        this.on('collisionstart', () => this.scene.emit('died', 'pipe'));
        
        this.scene.on('start', () => {
            this.onAlive(engine)
            onFly()
        })
        
        this.scene.on('restart', () => {
            this.onAlive(engine);
            engine.input.pointers.on('down', onFly);
        })

        this.scene.on('died', (reason: any) => {
            if (flyAnim.isPlaying) {
                flyAnim.pause();
                engine.input.pointers.off('down', onFly);
                resources.hit.play(0.5)
                new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
                    resources.swoosh.play(0.5);
                })
                if (reason === 'pipe') {
                    resources.die.play(0.5)
                }
            }
        })

    }

    onAlive(engine: Engine) {
        this.pos = vec(50, engine.halfDrawHeight);
        this.vy = 0;
        this.actions.clearActions();
        this.rotation = 0;
        if (!flyAnim.isPlaying) {
            flyAnim.play();
        }
    }

    
    onFly() {
        if (this.scene.state.playing) {
            this.vy = 7;
            resources.wing.play(0.5)
            this.actions.clearActions()
            this.actions.rotateTo(-this.maxAngle , Math.PI * 3, RotationType.CounterClockwise)
            .toPromise()
            .then(() => {
                this.actions.rotateTo(Math.PI / 2 , Math.PI, RotationType.Clockwise)
            })
        } else {
            this.scene.emit('start', undefined)
        }
    }
}