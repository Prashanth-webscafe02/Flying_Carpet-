import { useEffect, useRef } from 'react'

// Full-screen liquid gradient: domain-warped noise in brand colours, pulled toward the cursor.
const frag = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 aspect = vec2(uRes.x/uRes.y, 1.0);
  vec2 p = uv * aspect * 2.2;
  float t = uTime * 0.06;

  vec2 m = uMouse * aspect * 2.2;
  float md = length(p - m);
  vec2 pull = (m - p) * 0.35 * exp(-md * 1.6);

  vec2 q = vec2(fbm(p + t + pull), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.5*q + vec2(1.7, 9.2) + 0.15*t + uScroll*0.3), fbm(p + 3.5*q + vec2(8.3, 2.8) - 0.12*t));
  float f = fbm(p + 3.0*r);

  vec3 deep   = vec3(0.02, 0.016, 0.12);
  vec3 navy   = vec3(0.043, 0.035, 0.27);
  vec3 violet = vec3(0.28, 0.16, 0.55);
  vec3 orange = vec3(0.91, 0.40, 0.15);

  vec3 col = mix(deep, navy, clamp(f*1.6, 0.0, 1.0));
  col = mix(col, violet, smoothstep(0.35, 1.1, length(q)) * 0.8);
  col = mix(col, orange, smoothstep(0.55, 0.9, r.x) * 0.5);
  col += orange * 0.3 * exp(-md * 2.2);
  col *= 0.85 + 0.25 * f;
  col *= 1.0 - 0.35 * length(uv - 0.5);
  gl_FragColor = vec4(col, 1.0);
}`

const vert = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`

export default function FluidBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn('[fluid]', gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uScroll = gl.getUniformLocation(prog, 'uScroll')

    // Render at half resolution — the shader is soft, so this is invisible and much cheaper.
    const scale = 0.5
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * scale)
      canvas.height = Math.floor(window.innerHeight * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const target = { x: 0.5, y: 0.5 }
    const cur = { x: 0.5, y: 0.5 }
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('pointermove', onMove)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const start = performance.now()
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.05
      cur.y += (target.y - cur.y) * 0.05
      gl.uniform1f(uTime, reduce ? 0 : (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, cur.x, cur.y)
      gl.uniform1f(uScroll, window.scrollY / window.innerHeight)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-brand" />
}
