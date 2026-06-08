import {useRef, useState, useEffect,} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { GestureRecognizer, FilesetResolver, DrawingUtils} from '@mediapipe/tasks-vision';
import * as tf from '@tensorflow/tfjs'
import type { LayersModel } from '@tensorflow/tfjs'
import {normalizePoints} from '../HelperFunctions/helperFunctions'
import { Stage, Layer, Image, Circle } from 'react-konva'
import Konva from 'konva'
import axios from 'axios'
import Sidebar from '../Components/CanvasSidebar.tsx'
import {useUserSession} from '../FrontendAuth/globalState'

function Canvas() {
  let classes = ["STOP", "CLOSE", "POINTER", "OK", "ERASE", "DRAW", "ZOOM IN", "ZOOM OUT"]
  const [webcamSelected, setWebcamSelected] = useState<Boolean>(false)
  const {userSession} = useUserSession((state)=>state)
  let accessToken =  userSession.accessToken

  let [w, setW] = useState<number>(1)
  let [h, setH] = useState<number>(1)
  const [loading, setLoading] = useState<Boolean>(false)
  

  let gestureRecognizer: any //**** change this  type to proper type ***/
  let lastVideoTime = -1
  let model: LayersModel
  let overlay: DrawingUtils;
  let  MODE = ""

  let requestId = useRef<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visualRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<Konva.Stage>(null)
  const container = useRef<HTMLDivElement>(null)
  let canvasOffScreen = useRef<HTMLCanvasElement>(undefined)
  let scale = useRef<number>(1)

  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  

  const imageRef = useRef<Konva.Image>(null)
  const overlayRef = useRef<Konva.Layer>(null)
  const modesRef = useRef<HTMLDivElement>(null)


  //________________________________ this is used to intialize the offscreen canvas drawing on when first loading _______________________
   useEffect(()=>{
    if(!container.current) return

    const width = container.current.getBoundingClientRect().width
    const height = container.current.getBoundingClientRect().height

    setW(container.current.getBoundingClientRect().width)
    setH(container.current.getBoundingClientRect().height)

    console.log(width)

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width / 0.3)
    canvas.height = Math.round(height / 0.3)
    if(!canvas) return
    const context = canvas.getContext('2d')
    if(!context) return
    context.strokeStyle = '#df4b26'
    context.lineJoin = 'round'
    context.lineWidth = 5
    canvasOffScreen.current = canvas

 
  },[])

//   useEffect(()=>{
//     async function getName(){
//       try{
//         const canvasData = await axios.get('/canvasData')
//       }
//       catch(error){console.log(error)}
//     }
// }, [])


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

    if (video.currentTime !== lastVideoTime) {
      const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video, timeInMs);
      processResult(gestureRecognitionResult);
      lastVideoTime = (video.currentTime);
    }

    requestId.current = requestAnimationFrame(() => {
        renderLoop(lastVideoTime, gestureRecognizer);
      });
    
  }
  //___________ start webcam through ref/set canvas resolution/start loop __________________ 
  async function startWebcam(){
    if(!videoRef.current) return

    setWebcamSelected(true)

    try{
        const ctx = visualRef.current?.getContext("2d")!
        overlay = new DrawingUtils(ctx)

        const mediastream = await navigator.mediaDevices.getUserMedia({video:{width: 200, height: 200, frameRate: {ideal:60}}})
        videoRef.current.srcObject = mediastream

        model = await tf.loadLayersModel('/tfjs_model_for_web/model.json')
        await initializeGestureRecognizer()
        renderLoop(lastVideoTime, gestureRecognizer) 
    }
    catch(error){
      console.log(error)
    }
  }

  //_______________ BIGGEST FUNC. used to process landmarks and do all cool functions _______________________
  //____________________________________________________
  function processResult(result: any){

    const canvasForVideo = visualRef.current!
    const ctxForVideo = canvasForVideo.getContext("2d")!

    if(!canvasOffScreen.current) return
    const context = canvasOffScreen.current.getContext("2d")!
    const image = imageRef.current

    const overlayTrack = overlayRef.current
    overlayTrack?.destroyChildren()
    
    ctxForVideo.clearRect(0,0,canvasForVideo.width, canvasForVideo.height)
    
    const landmarks = result.landmarks[0]
    const landmarksRight = result.landmarks[1]

    let xTrue = 0
    let yTrue = 0

    let zoom: boolean = false
    

    const stage = stageRef.current
    if(!stage) return

    const oldScale = stage.scaleX()

    const displayArr = []
    //________________________________ THIS IS USED TO DRAW ON VIDEO + DISPLAY GESTURE_______________________________________________

    for(const handLandmark of result.landmarks){
      overlay.drawLandmarks(handLandmark, {color:'white', radius: 2} )
      overlay.drawConnectors(handLandmark, GestureRecognizer.HAND_CONNECTIONS, {color:'green'})
      console.log(oldScale)
      xTrue = (((handLandmark[8].x*-1+1)*window.innerWidth) - stage.x()) / oldScale
      yTrue =  ((handLandmark[8].y*window.innerHeight) -stage.y()) / oldScale

      overlayTrack?.add(new Konva.Circle({
          x: xTrue,
          y: yTrue,
          radius: 5,
          fill: 'green',
      }))

      console.log(overlayTrack)
      overlayTrack?.batchDraw()

      image?.getLayer()?.batchDraw();

      const readyData = normalizePoints(handLandmark)
      const prediction = model.predict(readyData) as tf.Tensor
      let gestureNum = prediction.argMax(1).dataSync()[0]
      displayArr.push(classes[gestureNum])
    }

    const SCALE = 100
    if(MODE == 'draw' && (landmarks || landmarksRight)){

        context.globalCompositeOperation = 'source-over'
        context.lineWidth = 5
        let x1 = xTrue
        let y1 = yTrue
        draw(x1,y1,context)
    }
    if(MODE === 'stop' && (landmarks || landmarksRight)){
        context.lineWidth = 5
        context.globalCompositeOperation = 'source-over'
    }
    if(MODE === 'erase' && (landmarks || landmarksRight)){
        context.globalCompositeOperation = 'destination-out'
        context.lineWidth = 50
        let x1 = xTrue
        let y1 = yTrue
        draw(x1,y1,context)
    }
    if(MODE === 'zoom out' && (landmarks || landmarksRight)){
      context.lineWidth = 5
      const distance = Math.sqrt((landmarks[8].x - landmarks[4].x)**2 + (landmarks[8].y - landmarks[4].y)**2)
      zoom = false
      controlZoom(distance*SCALE, zoom)
    }
    
     if(MODE === 'zoom in' && (landmarks || landmarksRight)){
      context.lineWidth = 5
      const distance = Math.sqrt((landmarks[8].x - landmarks[4].x)**2 + (landmarks[8].y - landmarks[4].y)**2)
      zoom = true
      controlZoom(distance*SCALE, zoom)
    }

    //________________________GESTURE RECOGNITION______________________

 

    if(displayArr[0] === 'DRAW' && displayArr[1] === 'DRAW') MODE = 'draw'
    if(displayArr[0] === 'STOP' && displayArr[1] === 'STOP') MODE = 'stop'
    if(displayArr[0] === 'ERASE' && displayArr[1] === 'ERASE') MODE = 'erase'
    if(displayArr[0] === 'ZOOM OUT' && displayArr[1] === 'ZOOM OUT') MODE = 'zoom out'
    if(displayArr[0] === 'ZOOM IN' && displayArr[1] === 'ZOOM IN') MODE = 'zoom in'

    if(modesRef.current){
      Array.from(modesRef.current.children).forEach((child: any) => {
        const active = child.dataset.mode === MODE
        child.style.color = active ? '#d0d0d0' : '#555555'
        child.style.background = active ? '#2a2a2a' : '#858585'
      })
    }
      


    console.log(displayArr)

  }

  let coords: Array<Array<number>> = []

  //_____________________ helper funcs moreso, much smaller in scale _______________________________________

  function draw(x: number,y: number, ctx: any){
    coords.push([x,y])

    if(coords.length>1){
      const point1 = coords[0]
      const point2 = coords[1]
      const dx = point2[0] - point1[0]
      const dy = point2[1] - point1[1]
      const distance = Math.sqrt(dx**2 + dy**2)
      console.log(distance)
      // if(distance>60){
      //   coords.splice(1,1)
      //   return
      // }
      ctx.beginPath()
      ctx.moveTo(point1[0], point1[1])
      ctx.quadraticCurveTo(point1[0], point1[1], point2[0], point2[1])
      ctx.stroke()
      coords.shift() 
    }
  }
  
  let distanceArr: Array<number> = []
  function controlZoom(distance: number, zoom: boolean){

      const scaleBy = 1.05
      const oldScale = scale.current
      const stage = stageRef.current
      if(!stage) return
      const THRESHOLD = !zoom ?  -0.8 : 1

      distanceArr.push(distance)
      if(distanceArr.length>1){
        const DISTBOOL = !zoom ? (distanceArr[1] - distanceArr[0]) < THRESHOLD : (distanceArr[1] - distanceArr[0]) > THRESHOLD
        if(DISTBOOL){
          let newScale = !zoom ? oldScale / scaleBy : oldScale * scaleBy
          let scaleClamped = Math.max(0.3, Math.min(3, newScale))
          if (scaleClamped === oldScale) return
          scale.current = scaleClamped
          stage.scale({x: scaleClamped, y: scaleClamped})
          
        }

        distanceArr.shift()

      }
  }

  async function switchOutCanvas(e: any){
    if(webcamSelected){
      console.log(webcamSelected)
      e.preventdefault()
    }
    try{
        setLoading(true)
        console.log('making it')
        if(!stageRef.current) return 
        const imgUrl = stageRef.current.toDataURL()
        const blob = b64toBlob(imgUrl)
        const formData = new FormData()
        formData.append('image', blob)
        console.log('making it past')

        const header = {headers: {Authorization: `Bearer ${accessToken}`}}

        const blobResponse = await axios.post(`/uploadBlob/${id}`, formData, header)
        const publicUrl = blobResponse.data

        await axios.put(`/canvas/${id}`, {publicUrl}, {withCredentials:true})
        console.log(publicUrl)

        
        navigate('/dashboard', {replace:true})
    }
    catch(error){console.log(error)}
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
    const canvas = canvasOffScreen.current                                                            
    if (!canvas) return                                                                             
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    imageRef.current?.getLayer()?.batchDraw()
  }


  
//_______________ ORIGINAL WAY TO ACTUALLY CHANGE CANVAS 
  function onWheel(e: any){
    const scaleBy = 1.03
    e.evt.preventDefault();
    const stage = stageRef.current
    if(!stage) return
    if(!imageRef.current) return

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

    scale.current = scaleClamped


    const canvasWidth = w / 0.3
    const canvasHeight = h / 0.3

    const newX = pointer.x - mousePointTo.x * newScale
    const newY = pointer.y - mousePointTo.y * newScale

    stage.scale({ x: scaleClamped, y: scaleClamped })
    stage.position({
      x: Math.min(0, Math.max(w - canvasWidth * scaleClamped, newX)),
      y: Math.min(0, Math.max(h - canvasHeight * scaleClamped, newY))
    })
  } 

//_____________________________ place holder button to remove _____________________________________

  function b64toBlob(url: string){
    const [data, base64] = url.split(',')
    console.log(data)

    const chars = atob(base64) // converts base64 data into chars that represnt a byte
    const byteNumbers = new Array(chars.length)

    for (let i = 0; i < chars.length; i++) {
    byteNumbers[i] = chars.charCodeAt(i) // goes through each char, and turns into a byte
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray],{type: 'image/png'}) 

    return blob

  }



  console.log('STOPHERE__________________')
  console.log(w/scale.current)
  

  //______________________________ basic layout ________________________________________________
  return (
    <div className='flex flex-row w-full h-screen overflow-hidden' style={{ background: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar onStart = {startWebcam} onStop = {stopWebcam} clearAll = {clearAll} switchCanvas = {switchOutCanvas} webcamActive = {webcamSelected}loading = {loading}/>
        <div className = 'grid grid-cols-[1fr_200px] w-full'>
          <div ref = {container} className = 'h-full relative overflow-hidden' style={{ background: '#f5f5f0' }}>
            <div ref={modesRef} className='absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-2'>
              {['draw', 'erase', 'stop', 'zoom in', 'zoom out'].map(m => (
                <p key={m} data-mode={m} className='text-xs font-medium px-3 py-1 rounded-full' style={{ background:'#858585', color: '#555555', letterSpacing: '0.08em' }}>{m}</p>
              ))}
            </div>
            {w>1 && <Stage width = {w} height = {h} ref = {stageRef} onWheel = {(e)=>{onWheel(e)}}>
                <Layer>
                      <Image image = {canvasOffScreen.current} x = {0} y = {0} ref = {imageRef}/>
                      <Circle x={200} y={200} radius = {20} fill='white' draggable shadowColor="rgba(0,0,0,0.15)" shadowBlur={10} shadowOffsetY={4} />
                </Layer>
                <Layer ref = {overlayRef}>

                </Layer>
            </Stage>}
          </div>
          <div className='relative border-l border-[#1a1a1a]' style={{ background: '#111111' }}>
            <video className='absolute right-0 top-0 w-full scale-x-[-1]' ref={videoRef} autoPlay />
            <canvas className ='w-50 h-50 absolute right-0 top-0 z-10 scale-x-[-1]' ref = {visualRef}></canvas>
          </div>
        </div>
    </div>

  )
}

export default Canvas
