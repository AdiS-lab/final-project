import {useRef, useState, useEffect, useMemo} from 'react'
import { GestureRecognizer, FilesetResolver, DrawingUtils} from '@mediapipe/tasks-vision';
import * as tf from '@tensorflow/tfjs'
import type { LayersModel } from '@tensorflow/tfjs'
import {Outlet} from 'react-router-dom'
import '../index.css'
import {normalizePoints} from '../HelperFunctions/helperFunctions.tsx'
import Sidebar from '../Components/Sidebar.tsx'
import { Stage, Layer, Image, Circle } from 'react-konva'
import Konva from 'konva';

function Canvas() {
  let classes = ["STOP", "CLOSE", "POINTER", "OK", "ERASE", "DRAW"]
  const [canvasSelected, setCanvasSelected] = useState<Boolean>(true)
  const [webcamSelected, setWebcamSelected] = useState<Boolean>(false)
  
  let  MODE = ""
  let requestId = useRef<number>(0)

  let gestureRecognizer: any //**** change this  type to proper type ***/
  let lastVideoTime = -1
  let model: LayersModel
  let overlay: DrawingUtils;

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const visualRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const container = useRef<HTMLDivElement>(null)
  let canvasOffScreen = useRef<HTMLCanvasElement | null>(null)

  let [w, setW] = useState<number>(1)
  let [h, setH] = useState<number>(1)

  var gridDots = [];
  var spacing = 40;
  var range = 2000;
  for (var gx = -range; gx <= range; gx += spacing) {
    for (var gy = -range; gy <= range; gy += spacing) {
      gridDots.push({ x: gx, y: gy });
    }
  }

  const [tool, setTool] = useState('brush')
  const isDrawing = useRef(false)
  const imageRef = useRef(null)
  const lastPos = useRef(null)


   useEffect(()=>{
    if(!container.current) return

    const width = container.current.getBoundingClientRect().width
    const height = container.current.getBoundingClientRect().height

    setW(container.current.getBoundingClientRect().width)
    setH(container.current.getBoundingClientRect().height)

    console.log(width)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    if(!canvas) return
    const context = canvas.getContext('2d')
    if(!context) return
    context.strokeStyle = '#df4b26'
    context.lineJoin = 'round'
    context.lineWidth = 5
    canvasOffScreen.current = canvas

 
  },[])



  console.log(canvasOffScreen)

  let scaleX = useRef<number>(0)

  // ___________________ intialize the CNN ________________________________________
  async function initializeGestureRecognizer() {
    // Create task for image file processing:
    const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm" 
    );
    
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task',
        delegate: 'GPU'
    },
    numHands: 2,
    runningMode: 'VIDEO'
    });

  }
  //_________________________ frame by frame tracking _____________________________
  function renderLoop(lastVideoTime: number, gestureRecognizer: any): void {
    if(videoRef.current===null) return
    const video: HTMLVideoElement = videoRef.current;
    const timeInMs = Date.now() 

    if (timeInMs !== lastVideoTime) {
      const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video, timeInMs);
      processResult(gestureRecognitionResult);
      lastVideoTime = (video.currentTime);
    }

    requestId.current = requestAnimationFrame(() => {
        renderLoop(lastVideoTime, gestureRecognizer);
      });
    
    console.log(requestId)
  }
  //___________ start webcam through ref/set canvas resolution/start loop __________________ 
  async function startWebcam(){
    if(!videoRef.current) return

    setWebcamSelected(true)

    try{
        const ctx = visualRef.current?.getContext("2d")!
        overlay = new DrawingUtils(ctx)

        const mediastream = await navigator.mediaDevices.getUserMedia({video:{width: 200, height: 200}})
        videoRef.current.srcObject = mediastream

        model = await tf.loadLayersModel('/tfjs_model_output (1)/model.json')
        await initializeGestureRecognizer()
        renderLoop(lastVideoTime, gestureRecognizer) 
    }
    catch(error){
      console.log(error)
    }
  }

  //_______________ func called in renderLoop to do stuff with landmarks, etc. _______________________
  function processResult(result: any){

    const canvasForVideo = visualRef.current!
    const ctxForVideo = canvasForVideo.getContext("2d")!

    if(!canvasOffScreen.current) return
    const context = canvasOffScreen.current.getContext("2d")!
    const image = imageRef.current
    
    ctxForVideo.clearRect(0,0,canvasForVideo.width, canvasForVideo.height)
    
    const landmarks = result.landmarks[0]
    const landmarksRight = result.landmarks[1]

     const stage = stageRef.current
    if(!stage) return

    const oldScale = stage.scaleX()

    const displayArr = []

    // ctx.clearRect(0,0,canvas.width,canvas.height)

   

    for(const handLandmark of result.landmarks){
      overlay.drawLandmarks(handLandmark, {color:'white', radius: 2} )
      overlay.drawConnectors(handLandmark, GestureRecognizer.HAND_CONNECTIONS, {color:'green'})

      context.beginPath()
      //flip the coordinate
      context.ellipse(((handLandmark[8].x*-1+1)*w) / oldScale, (handLandmark[8].y*h) / oldScale, 2 * Math.PI ,2 /oldScale,2/oldScale, 0, 2*Math.PI)
      context.stroke()

      image.getLayer().batchDraw();

      console.log([(handLandmark[8].x*-1+1)*w /oldScale, handLandmark[8].y*h])
      const readyData = normalizePoints(handLandmark)
      const prediction = model.predict(readyData)
      let gestureNum = prediction.argMax(1).dataSync()[0]
      displayArr.push(classes[gestureNum])
    }

    
    if(MODE == 'DRAW' && (landmarks || landmarksRight)){
        context.globalCompositeOperation = 'source-over'
        let x1 = ((landmarks[8].x*-1)+1)*canvasOffScreen.current.clientWidth
        let y1 = landmarks[8].y*canvasOffScreen.current.clientHeight
        draw(x1,y1,context)
    }
    if(MODE == 'STOP' && (landmarks || landmarksRight)){
        context.lineWidth = 20
        context.globalCompositeOperation = 'source-over'
    }
    if(MODE == 'ERASE' && (landmarks || landmarksRight)){
        context.globalCompositeOperation = 'destination-out'
        let x1 = ((landmarks[8].x*-1)+1)*canvasOffScreen.current.clientWidth
        let y1 = landmarks[8].y*canvasOffScreen.current.clientHeight
        draw(x1,y1,context)
    }

    //________________________GESTURE RECOGNITION______________________

 

    if(displayArr[0] === 'DRAW' && displayArr[1] === 'DRAW' ){
        MODE = 'DRAW'
    }
    if(displayArr[0] === 'STOP' && displayArr[1] === 'STOP'){
        MODE = 'STOP'
    }
    if(displayArr[0] === 'ERASE' && displayArr[1] === 'ERASE'){
        MODE = 'ERASE'
    }


    console.log(displayArr)

  }

  let coords: Array<Array<number>> = []


  function draw(x: number,y: number, ctx: any){

    coords.push([x,y])
    console.log(coords)
    if(coords.length>1){
      const point1 = coords[0]
      const point2 = coords[1]

      ctx.beginPath()
      ctx.moveTo(point1[0], point1[1])
      ctx.lineTo(point2[0], point2[1])
      ctx.stroke()
      coords.shift() 
    }
  }


  function switchOutCanvas(e: any){
    if(!webcamSelected){
    setCanvasSelected(!canvasSelected)
    }
    else{
      e.preventDefault()
    }
  }

  function stopWebcam(){


    console.log(scaleX)

    const canvasForVideo = visualRef.current!
    const ctxForVideo = canvasForVideo.getContext("2d")!
    ctxForVideo.clearRect(0,0,canvasForVideo.width, canvasForVideo.height )

    cancelAnimationFrame(requestId.current)
    gestureRecognizer?.close()

    if(videoRef.current?.srcObject){
      const source = videoRef.current.srcObject as MediaStream
      const tracks = source.getTracks()
      console.log(tracks)
      tracks.forEach((track)=>{
          track.stop()
      })
    }
    setWebcamSelected(false)
  }

  function clearAll(){

    console.log('made it')
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0,0,canvas.width, canvas.height)
  }

  function onWheel(e: any){
    const scaleBy = 1.03
    e.evt.preventDefault();
    const stage = stageRef.current
    if(!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()
    if(!pointer) return


    const mousePointTo = {
      x: (pointer.x - stage.x())/ oldScale,
      y: (pointer.y - stage.y()) / oldScale
    }
    // console.log('stagex: ' + stage.x())
    // console.log('stagey: ' + stage.y())


    const direction = e.evt.deltaY>0 ? -1 : 1
    const newScale = direction>0 ? oldScale * scaleBy : oldScale / scaleBy

    const scaleClamped = Math.max(0.3, Math.min(3, newScale))

    if (scaleClamped === oldScale) return

    stage.scale({ x: scaleClamped, y: scaleClamped })
    stage.position({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y  - mousePointTo.y * newScale
    })

    // console.log({'pointerx: ': pointer.x,
    //             'mousePointto: ': mousePointTo.x,
    //                 'newScale: ':  newScale})
  } 
  

  //______________________________ basic layout ________________________________________________
  return (
    <div className='grid grid-cols-[100px_1fr_200px] w-full h-screen overflow-hidden' style={{ background: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar onStart = {startWebcam} onStop = {stopWebcam} clearAll = {clearAll} switchCanvas = {switchOutCanvas} webcamActive = {webcamSelected}/>

      {canvasSelected ? 
      <>
        <div ref = {container} className = 'w-full h-full bg-white relative' >
          {w>1 && <Stage width = {w} height = {h} ref = {stageRef} onWheel = {(e)=>{onWheel(e)}}> 
              <Layer>
                   {gridDots.map(function(d, i) {
                      return <Circle key={'g'+i} x={d.x} y={d.y} radius={1} fill="#000000" listening={false} />;
                    })}
                    <Image image = {canvasOffScreen.current} x = {0} y = {0} ref = {imageRef}/>
                    <Circle x={200} y={200} radius = {20} fill='white' draggable shadowColor="rgba(0,0,0,0.15)" shadowBlur={10} shadowOffsetY={4} />

              </Layer>
          </Stage>}
        </div>

      </>
        : <Outlet />
      }
      <div style={{ background: 'white', borderLeft: '1px solid #1a1a1a', position: 'relative' }}>
          <video className='absolute right-0 top-0 w-full scale-x-[-1]' ref={videoRef} autoPlay />
          <canvas className ='w-50 h-50 absolute right-0 top-0 z-10 scale-x-[-1]' ref = {visualRef}></canvas>
      </div>
    </div>

  )
}

export default Canvas
