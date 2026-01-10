function ExtractYouTubeVideoId(url: string) {
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}
