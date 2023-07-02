import { Engine, GameEvent, Scene, Timer } from "excalibur";
import { ClassBird } from "src/actors/Bird";
import { Message } from "src/actors/Message";
import { TilemapBackground, TilemapBase } from "src/actors/Paralax";
import { Pipe } from "src/actors/Pipes";
import { resources } from "src/app/resources";

import UI from "src/ui/UI.svelte";

export class Main extends Scene {
    //  on(eventName: 'died', handler: (event: GameEvent<any>) => void): void;
    // on(eventName: 'restart', handler: (event: GameEvent<any>) => void): void;
    // on(eventName: 'start', handler: (event: GameEvent<any>) => void): void;
    // on(eventName: 'score', handler: (event: GameEvent<any>) => void): void;
    player!: ClassBird
    timer!: Timer
    state = {
        score: 0,
        playing: false,
        dead: false,
    }
    

    onInitialize(engine: Engine): void {
        this.timer = new Timer({
            fcn: () => engine.add(new Pipe),
            repeats: true,
            interval: 1800
          });
          this.player = new ClassBird(engine)
          engine.add(this.timer)
          engine.add(new TilemapBackground(engine))
          engine.add(new Message)
          engine.add(new TilemapBase(engine))
          engine.add(this.player)

          this.on('score', this.onScore.bind(this))
          this.on('start', this.onStart.bind(this))
          this.on('restart', this.onRestart.bind(this))
          this.on('died', this.onPlayerDied.bind(this))

          new UI({
            target: document.querySelector('#root')!,
            props: {
                scene: this
            }
          })
    }

    onScore() {
        this.state.score += 1
        resources.point.play(0.5)
    }

    onRestart() {
        this.state.playing = false;
        this.state.dead = false;
        this.state.score = 0;
    }

    onStart() {
        this.state.playing = true;
        this.state.dead = false;
        this.state.score = 0;
        this.timer.start();
    }

    onPlayerDied() {
        this.state.dead = true;
        this.timer.stop();
    }
}