import { useGLTF, useScroll } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

useGLTF.preload('/robot_playground.glb');

function Models() {
    const group = useRef(null);
    const { nodes, materials, animations, scene } = useGLTF('/robot_playground.glb');
    const { actions } = useThree();
    const scroll = useScroll()
    useEffect(() => {
        if (actions && actions['expermints']) {
            actions['expermints'].play().paused = true;
        }
    }, [actions]);

    useFrame(() => {
        if (actions && actions['expermints']) {
            actions['expermints'].time = actions['expermints'].getClip().duration * scroll.offset / 3;
        }
    });

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    );
}

export default Models;
