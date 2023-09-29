import skyImg from '../assets/sky.png';
import bombImg from '../assets/bomb.png';
import dudeImg from '../assets/dude.png';
import platformImg from '../assets/platform.png';
import starImg from '../assets/star.png';

export default class Part4 extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.plataforms = null;
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
        this.add.image(400, 300, 'sky');

        this.plataforms = this.physics.add.staticGroup();

        this.plataforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.plataforms.create(600, 400, 'ground');
        this.plataforms.create(50, 250, 'ground');
        this.plataforms.create(750, 220, 'ground');
    }

    update() 
    {

    }
}

