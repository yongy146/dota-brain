/**
 * Converts time in seconds to string in dota time
 * @param t time in seconds
 * @returns
 */
export function convertToDotaTime(t: number): string {
  const min = Math.floor(Math.abs(t) / 60);
  const sec = Math.abs(t) % 60;
  return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

/**
 * Convert time in seconds to string in dota time, rounded to 10 seconds
 * @param t time in seconds
 * @returns
 */
export function convertToCeiledDotaTime(t: number): string {
  let min = Math.floor(Math.abs(t) / 60);
  let sec = Math.abs(t) % 60;
  sec = 10 * Math.ceil(sec / 10);
  if (sec == 60) {
    sec = 0;
    min++;
  }
  return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

/**
 * Convert time in seconds to string in dota time, rounded to 10 seconds
 * @param t time in seconds
 * @returns
 */
export function convertToFlooredDotaTime(t: number): string {
  const min = Math.floor(Math.abs(t) / 60);
  let sec = Math.abs(t) % 60;
  sec = 10 * Math.floor(sec / 10);
  return (t < 0 ? "-" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}
