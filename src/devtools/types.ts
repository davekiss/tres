import type { Mesh, Object3D, Scene } from 'three'

// Performance Devtools
export interface FPSState {
  value: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

export interface MemoryState {
  currentMem: number
  averageMem: number
  maxMemory: number
  allocatedMem: number
  accumulator: number[]
  lastLoggedTime: number
  logInterval: number
}

export interface RendererState {
  info: {
    render: {
      frame: number
      calls: number
      triangles: number
      points: number
      lines: number
    }
    memory: {
      geometries: number
      textures: number
    }
    programs: WebGLProgram[]
  }
}

export interface InternalState {
  selectedObject: Object3D | null
  prevInstance: Object3D | null
  highlightMesh: Mesh | null
}

export interface DevtoolsPerformancePayload {
  fps: FPSState
  memory: MemoryState
  renderer: RendererState
  internal: InternalState
}

// Context Devtools
export interface DevtoolsContextPayload {
  scene: Scene | undefined
  invalidate: (frames: number) => void
}

export interface DevtoolsEvent<T extends DevtoolsPerformancePayload | DevtoolsContextPayload> {
  id: string
  timestamp: number
  type: 'performance' | 'context'
  payload: T
}