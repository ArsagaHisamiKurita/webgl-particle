import { Points, BufferGeometry, RawShaderMaterial, BufferAttribute, Vector2 } from 'three';
import { WebglBase } from "./webgl-base";
import { TexturePixelFilter } from "./texture-pixel-filter";
import { gsap } from 'gsap/gsap-core';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

export class Plane extends WebglBase {
  constructor(canvas) {
    super(canvas);

    this.textures = [];
    this.mesh = null;
  }

  /**
   * 初期化する
   */
  async init() {
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => {
        const texture = new Image();
        texture.width = 320;
        texture.height = 180;
        texture.src = `public/images/sample-0${i + 1}.png`;
        texture.ratio = 1;
  
        texture.addEventListener('load', () => {
          this.textures[i] = new TexturePixelFilter(texture, texture.width, texture.height, texture.ratio);
          resolve();
        });
      });
    }

    this.setup();
  }

  /**
   * セットアップする
   */
  setup() {
    console.log(this.textures);

    // ポジションは全てのテクスチャで同じ
    const position = this.textures[0].getPosition();
    // カラーは全てのテクスチャで異なるので、それぞれ取得する
    const color_1 = this.textures[0].getColor();
    const color_2 = this.textures[1].getColor();
    const color_3 = this.textures[2].getColor();
    const color_4 = this.textures[3].getColor();
    const color_5 = this.textures[4].getColor();
    // テクスチャのカラーからサイズを変更するための値を取得する
    const p_index = this.textures[0].getIndex();

    const positions = new BufferAttribute(new Float32Array(position), 3);
    const colors_1 = new BufferAttribute(new Float32Array(color_1), 3);
    const colors_2 = new BufferAttribute(new Float32Array(color_2), 3);
    const colors_3 = new BufferAttribute(new Float32Array(color_3), 3);
    const colors_4 = new BufferAttribute(new Float32Array(color_4), 3);
    const colors_5 = new BufferAttribute(new Float32Array(color_5), 3);
    const p_indecies = new BufferAttribute(new Float32Array(p_index), 1);

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', positions);
    geometry.setAttribute('color_1', colors_1);
    geometry.setAttribute('color_2', colors_2);
    geometry.setAttribute('color_3', colors_3);
    geometry.setAttribute('color_4', colors_4);
    geometry.setAttribute('color_5', colors_5);
    geometry.setAttribute('p_indecies', p_indecies);

    const material = new RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: false,
      uniforms: {
        color_level_1: { type: 'f', value: 0.0 },
        color_level_2: { type: 'f', value: 0.0 },
        color_level_3: { type: 'f', value: 0.0 },
        color_level_4: { type: 'f', value: 0.0 },
        color_level_5: { type: 'f', value: 0.0 },
        time: { type: 'f', value: 0.0 },
        // distortionLevel: { type: 'f', value: 0.0 },
        // distortionRange: { type: 'f', value: this.distortionRange },
        // time: { type: 'f', value: 0.0 },
      }
    });

    this.mesh = new Points(geometry, material);
    this.scene.add(this.mesh);
  }

  onFadeOut() {
    gsap.to(this.mesh.material.uniforms.color_level_1, {
      value: 0.0,
      ease: 'power2.inOut',
      duration: 1.0,
    });
  }

  onOpenning() {
    gsap.to(this.mesh.material.uniforms.color_level_1, {
      value: 1.0,
      ease: 'power2.inOut',
      duration: 1.0,
    });
  }

  /**
   * リサイズする
   */
  onResize() {
    super.onResize();
  }

  /**
   * レンダリングする
   */
  onRaf() {
    // base
    if (this.orbitcontrols) this.orbitcontrols.update();
    this.renderer.render(this.scene, this.camera);

    if(this.mesh) this.mesh.material.uniforms.time.value += 0.01;
  }
}