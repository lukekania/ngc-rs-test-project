/// <reference lib="webworker" />

addEventListener('message', ({ data }: MessageEvent<string>) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < data.length; i++) {
    h ^= data.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  postMessage({ input: data, hash: h.toString(16).padStart(8, '0') });
});
