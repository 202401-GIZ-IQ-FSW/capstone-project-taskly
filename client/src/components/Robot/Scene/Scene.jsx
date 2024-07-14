import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Models from '../Models/Models';

const Scene = () => {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <Canvas style={{ height: '600px', width: '600px' }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 2]} color="gray" intensity={3} />
        <Suspense fallback={null}>
          <Models />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
