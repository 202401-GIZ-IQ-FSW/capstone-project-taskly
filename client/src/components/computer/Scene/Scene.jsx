import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Plane } from '@react-three/drei';

const Scene = () => {
    return (
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} color="purple" intensity={1.2} />
          <Stars radius={100} depth={50} count={10000} factor={7} saturation={1} fade speed={2} />
        </Canvas>
      );
    };
export default Scene;
