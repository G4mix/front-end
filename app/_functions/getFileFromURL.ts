export async function getFileFromURL(url: string, fileName: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    return new File([], fileName, {});
  }
}
