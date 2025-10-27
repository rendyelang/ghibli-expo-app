import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Song } from '../api/data';

type Props = {
  song: Song;
  onPress: () => void;
};

export default function SongCard({ song, onPress }: Props) {
    // Ambil data yang diperlukan
  const artistName = song.uNm; // User Name (uNm) digunakan sebagai nama artis
  const playlistName = song.pl?.name || 'Unknown Playlist'; // Nama Playlist

  // Teks Play Button (untuk styling, kita asumsikan ada ikon di sini)
  const PlayButton = (
    <View style={styles.playButton}>
      {/* Di sini biasanya ada ikon 'Play', tapi kita pakai View untuk styling */}
      <View style={styles.playIcon} /> 
    </View>
  );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* 1. Image/Poster */}
      {song.img ? (
        <Image source={{ uri: song.img }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.posterFallback]}>
          <Text style={styles.posterFallbackText}>No Image</Text>
        </View>
      )}

      {/* 2. Info Text */}
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {song.name}
        </Text>
        {/* Nama Artis */}
        <Text style={styles.artistName}>{artistName}</Text> 
        {/* Nama Playlist */}
        <Text style={styles.playlistName}>{playlistName}</Text>
        {/* Score */}
        {song.score !== undefined && ( // Pastikan score ada sebelum ditampilkan
          <Text style={styles.scoreText}>Score: {song.score}</Text>
        )}
      </View>
      
      {/* 3. Play Button */}
      {PlayButton}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    // Menambahkan shadow agar terlihat 'mengambang'
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Gaya untuk Poster Album
  poster: { 
    width: 70, 
    height: 70, // Poster di gambar berbentuk persegi
    borderRadius: 8, 
    backgroundColor: '#1f2937',
  },
  posterFallback: { justifyContent: 'center', alignItems: 'center' },
  posterFallbackText: { color: '#9CA3AF', fontSize: 10 },
  
  // Gaya untuk Informasi Lagu
  info: { 
    flex: 1, 
    justifyContent: 'center',
  },
  title: { 
    color: '#000000', // Warna teks hitam
    fontSize: 16, 
    fontWeight: '700', // Dibuat lebih tebal untuk judul
  },
  artistName: { 
    color: '#555555', // Warna abu-abu gelap untuk nama artis
    fontSize: 14, 
    marginTop: 2, 
  },
  playlistName: { 
    color: '#999999', // Warna abu-abu lebih terang untuk playlist
    fontSize: 12, 
    marginTop: 2, 
  },
  scoreText: { 
    color: '#00bfa5', // Warna hijau cerah untuk Score
    fontSize: 14, 
    fontWeight: '600',
    marginTop: 4, 
  },
  
  // Gaya untuk Play Button (Lingkaran Hitam)
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Membuat lingkaran sempurna
    backgroundColor: '#1c2536', // Warna lingkaran hitam/gelap
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Ikon segitiga 'Play' (Opsional: ini hanya simulasi ikon)
  playIcon: { 
    width: 0, 
    height: 0, 
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: '#ffffff', // Warna putih untuk segitiga
    marginLeft: 3, // Sedikit geser agar terlihat di tengah
  }
});
