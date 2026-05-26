import {useRef} from 'react' 
import { GestureRecognizer, FilesetResolver} from '@mediapipe/tasks-vision';


function Canvas() {
  let gestureRecognizer: any;
  let lastVideoTime = -1;
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



    requestAnimationFrame(() => {
      renderLoop(lastVideoTime, gestureRecognizer);
    });
  }

  //___________ start webcam through ref/set canvas resolution/start loop __________________ 
  async function startWebcam(){
    if(ref.current===null) return
    try{
        const canvas: number | any = canvasRef.current
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight     

        const mediastream = await navigator.mediaDevices.getUserMedia({video:{width: 200, height: 200}})
        ref.current.srcObject = mediastream

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
    console.log(canvas.clientWidth)
    
    if(landmarks){
    // result.gestures
    console.log([landmarks[8].x,landmarks[8].y])
    
    // for(let i = 4; i<=20; i+=4){
      let x = ((landmarks[8].x*-1)+1)*canvas.clientWidth
      let y = landmarks[8].y*canvas.clientHeight
      draw(x,y,ctx)
    // }

    }
  }

  let coords: Array<Array<number>> = []

  function draw(x: number,y: number, ctx: any){
    coords.push([x,y])

    if(coords.length>1 && coords[0]!=coords[1])
    {
        ctx.beginPath()
        ctx.strokeStyle = "blue"
        ctx.moveTo(coords[0][0],coords[0][1] )
        ctx.lineTo(coords[1][0],coords[1][1])
        ctx.stroke()
        coords.shift()
    }
  }

  
  //______________________________ basic layout ________________________________________________
  return (
    <div className = 'grid grid-rows-2 w-full h-screen overflow-hidden'>
      <div className = 'flex flex-row cols-span-1 gap-5 relative overflow-hidden'>
        <button className = "p-2, bg-gray-500 w-20 h-20 cursor-pointer" onClick = {()=>{startWebcam()}}>Start Webcam</button>
        <video className =' ' ref = {ref} autoPlay></video>
      </div>
      <canvas ref = {canvasRef} className = "outline-2 outline-red-900 h-full w-full">Hello</canvas>
    </div>
  )
}

export default Canvas
