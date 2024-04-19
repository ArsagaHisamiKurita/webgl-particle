import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, AmbientLight, DirectionalLight, Color, GridHelper, AxesHelper, ACESFilmicToneMapping } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * jsの基本設定を行うクラス
 */
export class WebglBase {
  constructor(canvas) {
    this.renderParam = {
      canvas: canvas,
      alpha: true,
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
    };
    this.cameraParam = {
      fov: 60,
      near: 0.1,
      far: 2000,
      lookAt: new Vector3(0, 0, 0),
      x: 0,
      y: 0,
      z: 1,
    };

    this.dpr = 2.0;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.isInitialized = false;
    this.renderTarget = null;
    this.orbitcontrols = null;

    this._baseSetUp();
  }

  /**
   * セットアップする
   */
  _baseSetUp() {
    this._baseSetScene();
    this._baseSetRender();
    this._baseSetCamera();
    this._baseSetDev();
  }

  /**
   * デバッグ用の設定を行う
   */
  _baseSetDev() {
		this.scene.add(new GridHelper(5000, 100));
		this.scene.add(new AxesHelper(500));
		this.orbitcontrols = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);
	}

  /**
   * シーンを設定する
   */
  _baseSetScene() {
    this.scene = new Scene();
  }

  /**
   * レンダラーを設定する
   */
  _baseSetRender() {
    this.renderer = new WebGLRenderer({
      canvas: this.renderParam.canvas,
      alpha: this.renderParam.alpha,
      antialias: this.renderParam.antialias,
    });
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.renderParam.width, this.renderParam.height);
  }

   /**
   * カメラを設定する
   */
  _baseSetCamera() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 一度だけ初期化する
    if (!this.isInitialized) {
      this.camera = new PerspectiveCamera(this.cameraParam.fov, width / height, this.cameraParam.near, this.cameraParam.far);

      this.camera.position.set(this.cameraParam.x, this.cameraParam.y, this.cameraParam.z);
      this.camera.lookAt(this.cameraParam.lookAt);

      this.orbitcontrols = new OrbitControls(this.camera, this.renderer.domElement);
      this.orbitcontrols.enableDamping = true;

      this.isInitialized = true;
    }

    this.camera.position.z = 150;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * カメラの設定を更新する
   */
  onResize() {
    this._baseSetCamera();
  }
}