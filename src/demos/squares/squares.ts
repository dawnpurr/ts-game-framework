import { Entity } from '../../engine/entity';
import { Game } from '../../engine/game';
import { Scene } from '../../engine/scene';
import constants from '../../types/constants';
import { GameConfig } from '../../types/game-config';
import { Rect } from '../../types/rect';
import { RendererInterface } from '../../types/renderer/renderer-interface';
import { Vector2 } from '../../types/vector2';

// Define the default game configs
const config = new GameConfig(
    constants.CONTEXT_CANVAS,
    640,
    360
);

// Initalise the game and start the loop
const game = new Game(config);

class Wall extends Entity {
    update() {

    }

    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.position.x, this.position.y, this.collision_rect.width, this.collision_rect.height
        ), 'gray');
    }
}

class SquarePlayer extends Entity {
    speed: number = 2;

    update() {
        if (this.isColliding) {
            return;
        }

        const move = new Vector2(
            (Number(game.input.isKeyPressed('D')) - Number(game.input.isKeyPressed('A'))) * this.speed,
            (Number(game.input.isKeyPressed('S')) - Number(game.input.isKeyPressed('W'))) * this.speed
        );

        if (!this.test_collision(this.position.add(move))) {
            this.position.x += move.x;
            this.position.y += move.y;
        }
    }

    render(renderer: RendererInterface) {
        renderer.drawRect(new Rect(
            this.collision_rect.x, this.collision_rect.y, this.collision_rect.width, this.collision_rect.height
        ), 'orange');
    }
}

export default () => {
    const testScene = new Scene(true);

    testScene.addEntity(new Wall(new Vector2(100, 50), new Rect(0, 0, 512, 16)));
    testScene.addEntity(new Wall(new Vector2(100, 66), new Rect(0, 0, 16, 256)));

    testScene.addEntity(new SquarePlayer(new Vector2(200, 200), new Rect(0, 0, 32, 32)));
    game.scenes.push(testScene);

    game.run();
};
