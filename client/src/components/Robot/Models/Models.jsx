import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

useGLTF.preload('/models/robot_playground.glb');

function Models() {
    const group = useRef(null);
    const { scene, animations } = useGLTF('/models/robot_playground.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (animations && scene) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach((clip) => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });
        }
    }, [animations, scene]);

    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    return (
        <group ref={group} scale={[1.6, 1.6, 1.6]} position={[0, -1.5, 0]}>
            <primitive object={scene} />
        </group>
    );
}

export default Models;
