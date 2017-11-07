/// <reference path="../node_modules/excalibur/dist/excalibur.d.ts" />

const canvasWidth: number = 800;
const canvasHeight: number = 600;
const mapRows: number = 200;

// change this to 200 to see example
const mapColumns: number = 50;

const topWallIndex: number = 108;
const bottomWallIndex: number = 76;
const leftWallIndex: number = 93;
const rightWallIndex: number = 91;
const topLeftWallIndex: number = 78;
const topRightWallIndex: number = 79;
const bottomLeftWallIndex: number = 94;
const bottomRightWallIndex: number = 95;
const floorIndex: number = 0;

const spriteSheetName: string = "spriteSheet";
const mapName: string = "map";

var caveMap: ex.Texture = new ex.Texture("./src/assets/cave.png");

var loader = new ex.Loader();
loader.addResource(caveMap);

var spriteSheet = new ex.SpriteSheet(
    caveMap,
    16,
    10,
    16,
    16
);

var tileMap = new ex.TileMap(
    -400, 
    -300, 
    16, 
    16, 
    mapRows, 
    mapColumns);

tileMap.registerSpriteSheet(
    spriteSheetName,
    spriteSheet);

for (let i = 0; i < mapRows; i++) {
    
    for( let j = 0; j < mapColumns; j++) {

        let tileSprite: ex.TileSprite;

        if (i == 0) {
            if (j == 0) {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    topLeftWallIndex);
            } else if(j == mapColumns - 1) {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    topRightWallIndex);
            } else {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    topWallIndex);
            }
        }
        else if (i == mapRows - 1){ 
            if (j == 0) {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    bottomLeftWallIndex);
            } else if(j == mapColumns - 1) {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    bottomRightWallIndex);
            } else {
                tileSprite = new ex.TileSprite(
                    spriteSheetName,
                    bottomWallIndex);
            }
        }
        else if (j == 0) {
            tileSprite = new ex.TileSprite(
                spriteSheetName,
                leftWallIndex);
        }
        else if (j == mapColumns - 1) {
            tileSprite = new ex.TileSprite(
                spriteSheetName,
                rightWallIndex);
        } else {
            tileSprite = new ex.TileSprite(
                spriteSheetName,
                floorIndex);
        }

        let cellIndex = j + (i * mapColumns);

        tileMap.getCellByIndex(cellIndex).pushSprite(tileSprite);
        console.log("loading" + cellIndex);
    }
}

var scene = new ex.Scene();
scene.add(tileMap);

var game = new ex.Engine({ 
    width: canvasWidth,
    height: canvasHeight
});

game.addScene(
    "scene", 
    scene);

game.goToScene("scene");

game.start(loader).then(() => {
    console.log("Game loaded");
});