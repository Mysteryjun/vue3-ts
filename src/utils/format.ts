export function converSize(size: number) {
  if (size < 1024) {
    return Math.floor(size * 100) / 100 + "B/s";
  } else if (size >= 1024 && size < 1024 * 1024) {
    return Math.floor((size / 1024) * 100) / 100 + "KB/s";
  } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
    return Math.floor((size / (1024 * 1024)) * 100) / 100 + "MB/s";
  } else if (size >= 1024 * 1024 * 1024 && size < 1024 * 1024 * 1024 * 1024) {
    return Math.floor((size / (1024 * 1024 * 1024)) * 100) / 100 + "GB/s";
  } else if (size >= 1024 * 1024 * 1024 * 1024) {
    return Math.floor((size / (1024 * 1024 * 1024 * 1024)) * 100) / 100 + "TB/s";
  }
}