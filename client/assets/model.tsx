 
import { GestureRecognizer, FilesetResolver} from '@mediapipe/tasks-vision';

export const initializeGestureRecognizer = async() =>{
    // Create task for image file processing:
    const vision = await FilesetResolver.forVisionTasks(
    // path/to/wasm/root
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm " // what exactly is WASM and how it applies
    );
    
    const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
        modelAssetPath: './assets/hand_landmarker.task',
        delegate: 'GPU'
    },
    numHands: 2,
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
    });
}

