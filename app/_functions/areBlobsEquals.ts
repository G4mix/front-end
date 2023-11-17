export function areBlobsEqual(blob1: Blob, blob2: Blob): boolean | Promise<boolean> {
  if (blob1.size !== blob2.size) {
    return false;
  }

  const reader1 = new FileReader();
  const reader2 = new FileReader();

  return new Promise((resolve, reject) => {
    reader1.onload = () => {
      reader2.onload = () => {
        const result1 = reader1.result as ArrayBuffer;
        const result2 = reader2.result as ArrayBuffer;

        resolve(arrayBuffersEqual(result1, result2));
      };
      reader2.onerror = reject;

      reader2.readAsArrayBuffer(blob2);
    };
    reader1.onerror = reject;

    reader1.readAsArrayBuffer(blob1);
  });
}

function arrayBuffersEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  const view1 = new DataView(buf1);
  const view2 = new DataView(buf2);

  if (view1.byteLength !== view2.byteLength) {
    return false;
  }

  for (let i = 0; i < view1.byteLength; i++) {
    if (view1.getUint8(i) !== view2.getUint8(i)) {
      return false;
    }
  }

  return true;
}