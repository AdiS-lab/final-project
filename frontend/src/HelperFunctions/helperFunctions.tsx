
import * as tf from '@tensorflow/tfjs'

type landmarkType = {x: number, y:number}[]


export function normalizePoints(landmarks: landmarkType){

    const xScale = window.innerWidth - 5 - 200
    const yScale = 5 // find the relative coords of video 

    let x = landmarks[0].x*200 + xScale
    let y = landmarks[0].y*200 + yScale

    let arrOfData: Array<number> = []
    let maxCoord = 0;

    for(let i=0; i<21; i++){
    let x_temp = landmarks[i].x*200+xScale - x
    let y_temp = landmarks[i].y*200+yScale - y
    if(Math.abs(x_temp)>maxCoord){
        maxCoord  = Math.abs(x_temp) 
    }
    if(Math.abs(y_temp)>maxCoord){
        maxCoord = Math.abs(y_temp)
    }
    arrOfData.push(x_temp,y_temp)
    }      
    const normalizedData = arrOfData.map((pos)=>{
        return pos = pos/maxCoord
    })
    
    const myData = tf.tensor2d(normalizedData, [1,42])
    return myData
}