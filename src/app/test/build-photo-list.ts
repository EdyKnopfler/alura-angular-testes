import { Photo } from "../shared/components/photo-board/photo";

export function buildPhotoList(): Photo[] {
  const photos = [];
  for (let i = 0; i < 8; i++) {
    photos.push({id: i + 1, description: `photo ${i}`, url: `http://foto.com/${i}`});
  }
  return photos;
}
