import {useRef, useState} from 'react'
import { GestureRecognizer, FilesetResolver} from '@mediapipe/tasks-vision';
import * as tf from '@tensorflow/tfjs'
import {Link, Outlet} from 'react-router-dom'
import '../index.css'

function Canvas() {
  let classes = ["STOP", "CLOSE", "POINTER", "OK", "ERASE", "DRAW"]
  const [canvasSelected, setCanvasSelected] = useState<Boolean>(true)
  const [webcamSelected, setWebcamSelected] = useState<Boolean>(false)
  const [renderRunning, setRenderRunning] = useState<Boolean>(true)
  let  MODE = ""
  let running = true;  
  let requestId = useRef<number>(0)


  let gestureRecognizer: any
  let lastVideoTime = -1
  let model
  // mediaPipe = FRAMEWORK that utilizes WebAssembly to allow

  // WASM = filetype that pre-compiles C++ into machine code, which serves as a runtime for the C++ code
  //.task = zip file that contains all weights of neural network (usually stored in tlite)
  const ref = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    if(ref.current===null) return
    const video: HTMLVideoElement = ref.current;
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
    if(ref.current===null) return

    setWebcamSelected(true)

    try{
        const canvas: number | any = canvasRef.current
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight     

        const mediastream = await navigator.mediaDevices.getUserMedia({video:{width: 200, height: 200}})
        ref.current.srcObject = mediastream

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
    const canvas: number | any= canvasRef.current
    const ctx = canvas.getContext("2d")

    const landmarks = result.landmarks[0]
    const landmarksRight = result.landmarks[1]

    const xScale = window.innerWidth - 5 - 200
    const yScale = 5
    const displayArr = []

     if(MODE == 'DRAW' && (landmarks || landmarksRight)){
        console.log([landmarks[8].x, landmarks[8].y])
        ctx.globalCompositeOperation = 'source-over'
        let x1 = ((landmarks[8].x*-1)+1)*canvas.clientWidth
        let y1 = landmarks[8].y*canvas.clientHeight
        draw(x1,y1,ctx)
    }
    if(MODE == 'STOP' && (landmarks || landmarksRight)){
        ctx.lineWidth = 20
        ctx.globalCompositeOperation = 'source-over'
    }
    if(MODE == 'ERASE' && (landmarks || landmarksRight)){
        ctx.globalCompositeOperation = 'destination-out'
        let x1 = ((landmarks[8].x*-1)+1)*canvas.clientWidth
        let y1 = landmarks[8].y*canvas.clientHeight
        
        draw(x1,y1,ctx)
    }


    if(landmarks){
      // window.innerWidth - 5 - 200 
      //+5
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
      const prediction = model.predict(myData)
      let gestureNum = prediction.argMax(1).dataSync()[0]
      const displayLeft = classes[gestureNum]
      displayArr.push(displayLeft)

      // let x1 = ((landmarks[8].x*-1)+1)*canvas.clientWidth
      // let y1 = landmarks[8].y*canvas.clientHeight
      // draw(x1,y1,ctx)

    }

    if(landmarksRight){
      // window.innerWidth - 5 - 200 
      //+5
      let x = landmarksRight[0].x*200 + xScale
      let y = landmarksRight[0].y*200 + yScale

      let arrOfData: Array<number> = []
      let maxCoord = 0;

      for(let i=0; i<21; i++){
        let x_temp = landmarksRight[i].x*200+xScale - x
        let y_temp = landmarksRight[i].y*200+yScale - y
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
      const prediction = model.predict(myData)
      let gestureNum = prediction.argMax(1).dataSync()[0]
      const displayRight = classes[gestureNum]
      displayArr.push(displayRight)

    } 

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
  


    // ctx.restore()
    // console.log(ctx)
    // ctx.beginPath()
    // ctx.ellipse(x, y, 1, 1, 2 * Math.PI, 0, 2 * Math.PI)
    // ctx.save()
    // ctx.stroke()
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
    console.log(requestId)
    cancelAnimationFrame(requestId.current)
    console.log(running)
    gestureRecognizer?.close()
    if(ref.current?.srcObject){
      const source = ref.current.srcObject as MediaStream
      const tracks = source.getTracks()
      console.log(tracks)
      tracks.forEach((track)=>{
          track.stop()
      })
    }
    console.log('HELLLOOOOOOOOJIWFOWEFOIEWNFOEWOF')
    console.log(ref.current)
    setWebcamSelected(false)
  }
  //______________________________ basic layout ________________________________________________
  return (
    <div className='grid grid-cols-[100px_1fr_200px] w-full h-screen overflow-hidden' style={{ background: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif' }}>

      <div className='flex flex-col items-center justify-center gap-4' style={{
        background: '#111111',
        borderRight: '1px solid #1a1a1a',
      }}>
        <Link
          onClick={(e) => { switchOutCanvas(e) }}
          to='/canvas/gallery'
          className='flex items-center justify-center text-xs font-medium cursor-pointer'
          style={{
            width: '60px',
            height: '60px',
            color: '#888888',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
          }}
        >
          Gallery
        </Link>

        { !webcamSelected ? 
          <button
          onClick={() => {startWebcam()}}
          className='flex items-center justify-center text-xs font-medium cursor-pointer'
          style={{
            width: '60px',
            height: '60px',
            color: '#d0d0d0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
          }}
        >
          Start
        </button>
        :<button onClick = {()=>{stopWebcam()}}className='flex items-center justify-center text-xs font-medium cursor-pointer'
          style={{
            width: '60px',
            height: '60px',
            color: '#d0d0d0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid #2a2a2a',
            borderRadius: '6px',
          }}>STOP</button>
      }
      </div>

      {canvasSelected
        ? <canvas ref={canvasRef} className='h-full w-full' style={{
            background: '#ffffff',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          
        : <Outlet />
      }
      
      <div style={{ background: '#111111', borderLeft: '1px solid #1a1a1a', position: 'relative' }}>
        <video className='absolute right-0 top-0 w-full' ref={ref} autoPlay />
      </div>
    </div>
  )
}

export default Canvas
