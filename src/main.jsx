import './index.css'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// TilesRenderer, controls and attribution imports
import {
  TilesPlugin,
  TilesRenderer,
  TilesAttributionOverlay,
  GlobeControls,
  CompassGizmo,
} from '3d-tiles-renderer/r3f';

// Plugins
import {
  TMSTilesPlugin,
  UpdateOnChangePlugin,
  TileCompressionPlugin,
  TilesFadePlugin,
} from '3d-tiles-renderer/plugins';

// R3F, DREI and LEVA imports
import { Canvas } from '@react-three/fiber';
import { TilesLoadingBar } from './TilesLoadingBar.jsx';

function App() {

  return (
    <Canvas
      frameloop='demand'
      camera={ {
        position: [ 0, 0.5 * 1e7, 1.5 * 1e7 ],
      } }
      style={ {
        width: '100%',
        height: '100%',
        position: 'absolute',
        margin: 0,
        left: 0,
        top: 0,
      } }
      flat
    >
      <color attach="background" args={ [ 0x111111 ] } />

      <TilesRenderer group={ { rotation: [ - Math.PI / 2, 0, 0 ] } } url="https://storage.googleapis.com/tms-mars/tilemapresource.xml">
        <TilesPlugin plugin={ TMSTilesPlugin } args={ { shape: 'ellipsoid' } } />
        <TilesPlugin plugin={ TileCompressionPlugin } />
        {/* <TilesPlugin plugin={ UpdateOnChangePlugin } /> */}
        <TilesPlugin plugin={ TilesFadePlugin } />

        {/* Controls */}
        <GlobeControls enableDamping={ true } />

        {/* Attributions */}
        <TilesAttributionOverlay />

        {/* Add compass gizmo */}
        <CompassGizmo />

        <TilesLoadingBar />
      </TilesRenderer>
    </Canvas>
  );

}

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

