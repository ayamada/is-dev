// NB: IS_DEV も IS_PROD も定義されていない場合は isDev が真になる
const _isDev = (typeof IS_DEV !== "undefined") ? IS_DEV : undefined;
const _isProd = (typeof IS_PROD !== "undefined") ? IS_PROD : undefined;
export const isDev = _isDev ?? ((_isProd !== undefined) ? !_isProd : !0);
export const isProd = !isDev;


// NB: 以下の assert および assertOnlyValidParams は、
//     prod版でcode eliminationによってinvalids関連含め丸ごと除去される前提の為、
//     外部から任意のパラメータがやってくるAPI等には使わない事！

const _assertDev = (isOk, msg="assertion failed") => {
  if (!isOk) { throw new Error(msg) }
};
const _assertProd = (isOk, _=undefined) => {};
export const assert = (isDev ? _assertDev : _assertProd);

// jsではほぼ必須級であるにも関わらず標準提供されていない、「パラメータ指定等を行うobjectに不正/間違ったキーが混入していないか」のチェック機能を提供する。
// これはprod版では際に完全に簡約されてcode eliminationされる必要がある(そうでないとGC発生源になる)。
// 以下のように使う。
// import { assertOnlyValidParams } from "./assert-invalid-params.mjs";
// const { foo, bar, ... invalids } = params || {}; // fooとbarは実際に参照したいパラメータ
// assertOnlyValidParams(invalids); // もしinvalidsが空でない(つまりparamsに規定以外のパラメータが含まれていた)なら、これは例外を起こす
// TODO: 上記のコードをもっと簡潔に記述できるようにしたい。しかしlispマクロ的手法を用いないと無理では？
const _assertOnlyValidParamsDev = (mayContainsInvalidEntriesObject) => {
  if (Object.keys(mayContainsInvalidEntriesObject).length) {
    const msg = 'found invalid parameters';
    console.log(msg, mayContainsInvalidEntriesObject);
    throw new Error(msg);
  }
};
const _assertOnlyValidParamsProd = (_) => {};
export const assertOnlyValidParams = (isDev ? _assertOnlyValidParamsDev : _assertOnlyValidParamsProd);


