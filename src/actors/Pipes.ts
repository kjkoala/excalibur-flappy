import { Actor, CollisionType, Vector, vec, Random, Engine, type ActorArgs } from "excalibur";
import { resources } from "src/app/resources";
import { Main } from "src/scenes";

const pipe = resources.pipe.toSprite();
const pipeRotate = resources.pipeRotate.toSprite();

const constructorProps = {
    width: 52,
    height: 320,
    anchor: Vector.Zero,
    collisionType: CollisionType.Active,
    z: 1
}

const space = 90;
const rand = new Random()

export class Pipe extends Actor {
    declare scene: Main;
    declare pipeRotate: Actor
    space = space;
    playerAtPipe = false;
    constructor(config?: ActorArgs | undefined) {
        super(config || constructorProps)
    }
    
    onInitialize(game: Engine): void {
        const vel = vec(-125, 0)
        const rnd = rand.integer(-112, 0)
        this.pipeRotate = new PipeRotate(vel, rnd)

        game.add(this.pipeRotate)
        this.graphics.use(pipe);
        this.vel = vel
        this.pos = vec(game.drawWidth, rnd + constructorProps.height + space)
        this.scene.on('died', this.onVelocityStop.bind(this))
        this.scene.on('restart', () => {
            this.scene.actors.forEach((actor) => {
                if (actor instanceof Pipe) {
                    actor.kill()
                }
            })
        })
        this.on('exitviewport', () => {
                this.kill()
                this.pipeRotate.kill()
        })
    }

    onPreUpdate(): void {
        if (!this.playerAtPipe && (this.pos.x + this.width) < this.scene.player.pos.x) {
            this.playerAtPipe = true;
            this.scene.emit('score', undefined);
        } else if (this.pos.x < this.scene.player.pos.x && this.scene.player.pos.y < 0) {
            this.scene.emit('died', 'pipe')
        }
    }

    onVelocityStop() {
        this.vel = Vector.Zero
        this.pipeRotate.vel = Vector.Zero
    }
}

class PipeRotate extends Pipe {
    public velocvelocity: Vector;
    public random: number;
    constructor(velocvelocity: Vector, random: number) {
        super(constructorProps)
        this.velocvelocity = velocvelocity
        this.random = random
    }

    onInitialize(engine: Engine): void {
        this.graphics.use(pipeRotate);
        this.vel = this.velocvelocity;
        this.pos = vec(engine.drawWidth, this.random)
    }
    // Не баг а фича, чтоб не отрабатывал onPreUpdate еще раз и не считался score два раза
    onPreUpdate(): void {}
}