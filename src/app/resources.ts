import { ImageSource, Sound } from "excalibur";
import Background from 'public/background-day.png';
import base from 'public/base.png';
import bird from 'public/yellowbird.png';
import pipe from 'public/pipe-green.png';
import pipeRotate from 'public/pipe-green-rotate.png';
import message from 'public/message.png';
import bronze from 'public/medals/bronze.png';
import silver from 'public/medals/silver.png';
import gold from 'public/medals/gold.png';
import platinum from 'public/medals/platinum.png';
import gameover from 'public/gameover.png';
import wing from 'public/audio/audio_wing.ogg'
import point from 'public/audio/audio_point.ogg'
import die from 'public/audio/audio_die.ogg'
import hit from 'public/audio/audio_hit.ogg'
import swooshing from 'public/audio/audio_swooshing.mp3';

export const resources = {
    background: new ImageSource(Background),
    base: new ImageSource(base),
    bird: new ImageSource(bird),
    pipe: new ImageSource(pipe),
    message: new ImageSource(message),
    wing: new Sound(wing),
    point: new Sound(point),
    die: new Sound(die),
    hit: new Sound(hit),
    swoosh: new Sound(swooshing),
    gameover: new ImageSource(gameover),
    bronze: new ImageSource(bronze),
    silver: new ImageSource(silver),
    gold: new ImageSource(gold),
    platinum: new ImageSource(platinum),
    pipeRotate: new ImageSource(pipeRotate),
}