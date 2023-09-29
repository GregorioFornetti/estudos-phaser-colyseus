import skyImg from '../assets/sky.png';
import bombImg from '../assets/bomb.png';
import dudeImg from '../assets/dude.png';
import platformImg from '../assets/platform.png';
import starImg from '../assets/star.png';

export default class Part6 extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.plataforms = null;
        this.player = null;
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

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.plataforms);
    }

    update() 
    {

    }
}

