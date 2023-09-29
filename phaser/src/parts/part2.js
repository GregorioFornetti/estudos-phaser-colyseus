import skyImg from '../assets/sky.png';
import bombImg from '../assets/bomb.png';
import dudeImg from '../assets/dude.png';
import platformImg from '../assets/platform.png';
import starImg from '../assets/star.png';

export default class Part2 extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('sky', skyImg);
        this.load.image('ground', platformImg);
        this.load.image('star', starImg);
        this.load.image('bomb', bombImg);
        this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });
    }
      
    create ()
    {
        
    }

    update() 
    {

    }
}

