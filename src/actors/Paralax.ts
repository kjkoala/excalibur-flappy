import { vec, TileMap, Engine, Vector } from 'excalibur';
import { resources } from 'src/app/resources';
import { Main } from 'src/scenes';
import { WindowResizeComponent } from 'src/utlis/WindowResizeComponent';

export class TilemapBackground extends TileMap {
    scene!: Main
    constructor(game: Engine) {
        super({
            name: 'background',
            tileWidth: 288,
            tileHeight: 512,
            rows: 1,
            columns: Math.ceil(game.drawWidth / 228) + 1,
        })
    }
    
    onInitialize(): void {
        const Background = resources.background.toSprite();
        this.tiles.forEach(t => t.addGraphic(Background))
        this.onRestart()
        this.scene.on('died', this.onVelocityStop.bind(this))
        this.scene.on('restart', this.onRestart.bind(this))
    }

    onRestart() {
        this.pos = vec(0, 0)
        this.vel = vec(-60, 0)
    }

    onPostUpdate(): void {
        if (Math.abs(this.x) >this.tileWidth) {
            this.pos.x = 0
        }
    }

    onVelocityStop() {
        this.vel = vec(0, 0)
    }
}

export class TilemapBase extends TileMap {
    scene!: Main
    public baseY: number;
    constructor(game: Engine) {
        super({
            name: 'base',
            tileWidth: 336,
            tileHeight: 112,
            rows: 1,
            columns: Math.ceil(game.drawWidth / 336) + 1,
        })
        this.baseY = game.drawHeight - this.tileHeight
    }
    
    onInitialize(): void {
        const Base = resources.base.toSprite();
        this.tiles.forEach(t => t.addGraphic(Base))
        this.onRestart()
        this.z = 2

        this.scene.on('died', this.onVelocityStop.bind(this))
        this.scene.on('restart', this.onRestart.bind(this))
    }

    onPostUpdate(): void {
        if (Math.abs(this.x) > this.tileWidth) {
            this.pos.x = 0
        }
    }

    onRestart() {
        this.pos = vec(0, this.baseY)
        this.vel = vec(-125, 0)
    }

    onVelocityStop() {
        this.vel = Vector.Zero
    }
}
