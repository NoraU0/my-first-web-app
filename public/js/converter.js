// ここからコードを書いてください
export function setupConverter() {
  // 必要なHTML要素を取得する
  const converterForm = document.querySelector(".converter-form");
  const inputVaule = document.querySelector(".converter-input");
  const fromUnit = document.querySelector(".converter-from");
  const toUnit = document.querySelector(".converter-to");
  const result = document.querySelector(".converter-result");

  // ここに単位のデータを定義する
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // fromUnitとtoUnitのセレクトボックスに単位の選択肢を追加する
  fromUnit.innerHTML = ""; // 既存の選択肢を一度クリア
  toUnit.innerHTML = "";

  for (const unit of lengthUnit) {
    // 単位ごとに新しい<option>要素を作り、追加していく
    fromUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
    toUnit.innerHTML += `<option value="${unit.base}">${unit.name}</option>`;
  }

  // 最初のオプションを選択して初期値を設定する
  if (fromUnit.options.length > 0) {
    fromUnit.selectedIndex = 0;
  }
  if (toUnit.options.length > 0) {
    toUnit.selectedIndex = 1;
  }

  // 変換を実行する関数を定義する
  function convert() {
    // 1.入力値を取得し、数値に変換する
    const value = parseFloat(inputVaule.value);

    // 2.有効な数値でなければエラーメッセージを表示して処理を終える
    if (isNaN(value)) {
      result.textContent = "Please enter a valid number";
      return;
    }

    // 3.選択された単位の基準値を取得する
    const fromBase = fromUnit.value;
    const toBase = toUnit.value;

    // 4.計算式: (入力値 × 変換元の基準値) ÷ 変換先の基準値
    const converted = (value * fromBase) / toBase;

    // 5.結果を整形して表示する
    // toFixed(3)で小数点以下3桁に丸める
    result.textContent = `${value} ${
      lengthUnit[fromUnit.selectedIndex].name
    } = ${converted.toFixed(3)} ${lengthUnit[toUnit.selectedIndex].name}`;
  }

  // フォームの入力内容が変わるたびに`convert`関数を実行する
  converterForm.addEventListener("input", convert);

  // ページ読み込み時に一度だけ初期変換を実行する
  convert();
}
