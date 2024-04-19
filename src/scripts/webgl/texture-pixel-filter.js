/**
 * テクスチャをピクセル単位で取得するクラス
 */
export class TexturePixelFilter {
  constructor(_image, _width, _height, _ratio) {
    this.position = [];
    this.color = [];
    this.index = [];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = _width;
    canvas.height = _height;
    ctx.drawImage(_image, 0, 0);
    const originalPixel = ctx.getImageData(0, 0, _width, _height);

    for (let i = 0; i < originalPixel.data.length; i++) {
      if ((i + 1) % (4 * _ratio) === 0) {
        const colorR = originalPixel.data[i - 3] / 255;
        const colorG = originalPixel.data[i - 2] / 255;
        const colorB = originalPixel.data[i - 1] / 255;

        const count = (i + 1) / 4 - 1;

        const nx = count % _width;
        const ny = Math.floor(count / _width);
        const nz = 0;

        const x = nx - _width / 2;
        const y = -(ny - _height / 2);
        const z = 0.0;

        this.position.push(x, y, z);
        this.color.push(colorR, colorG, colorB);
        this.index.push(i / 4);
      }
    }
  }

  /**
   * INDEXを取得する
   */
  getIndex() {
    return this.index;
  }

   /**
   * ピクセル単位の位置を取得する
   */
  getPosition() {
    return this.position;
  }

  /**
   * ピクセル単位の色を取得する
   */
  getColor() {
    return this.color;
  }

  /**
   * 配列の長さを取得する
   */
  getArrayLength() {
    return (this.position.length / 3);
  }
}