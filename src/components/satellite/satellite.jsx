import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { Suspense } from 'react';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';
import styled from 'styled-components';

import { GlitchMode } from 'postprocessing';
const Controls = OrbitControls;

const SceneryLayout = styled.div`
  height: 500px;
`;

function CameraAnimate() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = Math.sin(clock.getElapsedTime()) * 2 + 7;
    camera.position.x = Math.cos(clock.getElapsedTime()) * 2 + 2;
  });

  return null;
}

export const Satellite = () => {
  const gltf = useLoader(GLTFLoader, '/untitled.gltf');

  return (
    <SceneryLayout>
      <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
        <ambientLight intensity={0.2} />
        <directionalLight />
        <pointLight intensity={0.2} color="white" />
        <spotLight
          intensity={0.2}
          position={[70, 70, 70]}
          penumbra={1}
          color="lightblue"
        />
        <primitive object={gltf.scene} />
        <Controls />
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />

          <Glitch
            delay={[1.5, 3.5]} // min and max glitch delay
            duration={[0.6, 1.0]} // min and max glitch duration
            strength={[0.3, 1.0]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
        </EffectComposer>
        <CameraAnimate />
      </Canvas>
    </SceneryLayout>
  );
};
