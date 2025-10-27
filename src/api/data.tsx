export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string; 
  running_time: string; 
  rt_score: string;     
  image?: string;       
  movie_banner?: string;
};

export type Song = {
  // Metadata unik dari database Anda
  _id: string; 
  pId: string; // Kemungkinan ID untuk Playlist/Parent
  
  // Identitas YouTube
  eId: string; // External ID, biasanya '/yt/VIDEO_ID'
  trackUrl: string; // URL ke video YouTube

  // Informasi Lagu
  name: string; // Nama Lagu/Track
  
  // Informasi Channel/Artis
  uId: string; // User/Channel ID 
  uNm: string; // User/Channel Name

  // Gambar/Thumbnail
  img?: string; // URL Thumbnail
  
  // Playlist terkait
  pl?: {
    id: number;
    name: string;
  };
  
  // Statistik/Rating (Opsional, tergantung kebutuhan)
  nbR?: number; // Number of Ratings/Reviews
  nbL?: number; // Number of Likes
  score?: number; // Total Score
};

export async function getFilms(): Promise<Film[]> {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}

export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch film');
  return res.json();
}

export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`https://openwhyd.org/hot/electro?format=json`);
  if (!res.ok) throw new Error('Failed to fetch songs')

  const data = await res.json()
  return data.tracks;
}

export async function getSongById(id: string): Promise<Song> {
  const res = await fetch(`https://openwhyd.org/c/${id}?format=json`);
  if (!res.ok) throw new Error('Failed to fetch film');

  const json = await res.json()
  return json.data;
}