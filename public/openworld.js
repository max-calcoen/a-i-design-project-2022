import * as PIXI from "pixi.js";
import { CompositeTilemap } from "@pixi/tilemap";

const renderer = PIXI.autoDetectRenderer({
    width: 800,
    height: 600
});
let stage=  PIXI.Container;
let tilemap = CompositeTilemap();

document.body.appendChild(renderer.view);
//Defines loaders
const loader = new PIXI.Loader();

/**
 * Builds tilemap
 * -- Adds grass/tough texture on each 32px by 32px square
 */
function buildTilemap() {
    // Clear everything, like a PIXI.Graphics
    tilemap.clear();

    const resources = loader.resources;
    const size = 32;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 5; j++) {
            tilemap.tile("grass.png", i * size, j * size);

            if (i % 2 === 1 && j % 2 === 1) {
                tilemap.tile("tough.png", i * size, j * size);
            }
        }
    }

}