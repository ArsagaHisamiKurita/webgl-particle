precision mediump float;

uniform float color_level_1;
uniform float color_level_2;
uniform float color_level_3;
uniform float color_level_4;
uniform float color_level_5;

varying vec3 v_color_1;
varying vec3 v_color_2;
varying vec3 v_color_3;
varying vec3 v_color_4;
varying vec3 v_color_5;

void main() {
    vec2 temp = gl_PointCoord - vec2(0.5);
    float f = dot(temp, temp);
    if (f > 0.25 ) {
        discard;
    }

    vec3 imageColor_1 = v_color_1 * color_level_1;
    vec3 imageColor_2 = v_color_2 * color_level_2;
    vec3 imageColor_3 = v_color_3 * color_level_3;
    vec3 imageColor_4 = v_color_4 * color_level_4;
    vec3 imageColor_5 = v_color_5 * color_level_5;
    vec3 imageColorAll = imageColor_1 + imageColor_2 + imageColor_3 + imageColor_4 + imageColor_5;

    vec3 greyEdge = vec3(0.21, 0.71, 0.07); // 閾値
    float grey = greyEdge.r * imageColorAll.r + greyEdge.g * imageColorAll.g + greyEdge.b * imageColorAll.b;
    vec3 finalColor = vec3(grey);

    vec3 darkEdge = vec3(0.3); // 閾値
    // 黒であるかどうかを判定し、黒であれば描画をスキップする
    if (all(lessThanEqual(finalColor, darkEdge))) {
        discard; // 黒の場合は描画をスキップ
    } else {
        gl_FragColor = vec4(finalColor, 1.0); // 黒でなければ通常通り描画
    }
}