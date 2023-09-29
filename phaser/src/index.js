import Phaser from 'phaser';

import HelloWorld from './hello-world';
import Part1 from './parts/part1';
import Part2 from './parts/part2';
import Part3 from './parts/part3';
import Part4 from './parts/part4';
import Part5 from './parts/part5';
import Part6 from './parts/part6';
import Part7 from './parts/part7';
import Part8 from './parts/part8';
import Part9 from './parts/part9';
import Part10 from './parts/part10';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: HelloWorld
};

const game = new Phaser.Game(config);
