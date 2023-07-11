# Importar y usar modelos

> Todos los modelos usado en esta guía son de [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c)

Los modelos 3D son disponible en cientos de formatos de archivo, cada uno con propósitos diferentes, características distintos, y complexidad variable.

En esta guía, vamos a enfocarnos en cargando glTF (GL Transmission Format) modelos, que son el formato más común de modelos 3D en el web.

<StackBlitzEmbed projectId="tresjs-gltf-load-model" />

Hay algunas maneras para cargar modelos en TresJS:

## usando `useLoader`

Para cargar el recurso, el `useLoader` composable te permite pasar cualquier tipo de Three.js cargador y un URL. Devuelve un `Promise` con el recurso cargado.

Por una explanación detallada de como usar `useLoader`, ve la documentación de [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Entonces, puedes pasar la escena de modelo a un componente `primitive`:

```html{3}
<TresCanvas>
  <Suspense>
    <primitive :object="scene" />
  </Suspense>
</TresCanvas>
```

> The `<primitive />` component is not a standalone component in the Tres source code. Instead, it's a part of the Tres core functionality. When you use `<primitive>`, it is translated to a `createElement` call, which creates the appropriate Three.js object based on the provided "object" prop.

Nota que en el ejemplo arriba que usamos el componente `Suspense` para 'wrap' el componente `TresCanvas`. Eso es por `useLoader` devuelve un `Promise` y necesitamos esperarlo resolver antes de renderizar la escena.

## Usando `useGLTF`

Una manera más conveniente de cargar modelos es usando el `useGLTF` composable disponible de [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) paquete.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Una ventaja de usar `useGLTF`es que puedes pasar un `draco` prop para habilitar [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) por el modelo. Eso reducirá el tamaño del modelo y mejorar el rendimiento.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternativamente puedes fácilmente seleccionas los objetos dentro de tu modelo usando la propiedad `nodes`

```vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <primitive :object="nodes.MyModel" />
    </Suspense>
  </TresCanvas>
</template>
```

## Usando `GLTFModel`

El componente `GLTFModel` es un 'wrapper' alrededor de `useGLTF` que es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <GLTFModel path="/models/AkuAku.gltf" draco />
    </Suspense>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```

Esta estrategia en particular es más directo pero te da menos control sobre el modelo.

## useFBX

El composable `useFBX` es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Entonces, es tan directo como añadir el modelo a tu escena:

```html{3}
<TresCanvas shadows alpha>
  <Suspense>
    <primitive :object="model.scene" />
  </Suspense>
</TresCanvas>
```

## FBXModel

El componente `FBXModel` es un 'wrapper' alrededor de `useFBX` que es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Tiene uso similar al `GLTFModel`:

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
      <Suspense>
        <FBXModel path="/models/AkuAku.fbx" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```