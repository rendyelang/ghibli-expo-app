import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Asumsi Anda menggunakan expo-router atau react-navigation untuk navigasi
import { getSongById, Song } from '@/src/api/data';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import YoutubePlayer from "react-native-youtube-iframe";

// Komponen Pembantu untuk Baris Informasi
const InfoRow = ({ title, value }: { title: string, value: string | number }) => (
    <View style={infoRowStyles.row}>
        <Text style={infoRowStyles.title}>{title}:</Text>
        <Text style={infoRowStyles.value}>{value}</Text>
    </View>
);

export default function SongDetailScreen() {
    const { id } = useLocalSearchParams()

    const { song: songParam } = useLocalSearchParams();
    const initialSong = songParam ? JSON.parse(songParam as string) : null;

    const [song, setSong] = useState<Song | null>(initialSong);
    const [loading, setLoading] = useState(!initialSong);
    const [error, setError] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false)
    const videoId = song?.eId?.includes("/yt/")
    ? song.eId.split("/yt/")[1]
    : song?.eId;

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video selesai diputar");
        } else if (state === "paused") {
            setPlaying(false);
        } else if (state === "playing") {
            setPlaying(true);
        }
    }, []);

    const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

    const router = useRouter();

    useEffect(() => {
        if (!id || Array.isArray(id)) return;
    
        (async () => {
          try {
            setError(null);
            const data = await getSongById(id);
            // Gabungkan hasil fetch dengan data awal agar field yang hilang tidak terhapus
            setSong((prev) => ({ ...prev, ...data }));
          } catch (e: any) {
            setError(e.message || 'Failed to load detail');
          } finally {
            setLoading(false);
          }
        })();
      }, [id]);
    
      if (loading) {
        return (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text style={styles.muted}>Loading detail…</Text>
          </View>
        );
      }
    
      if (error || !song) {
        return (
          <View style={styles.center}>
            <Text style={styles.error}>Error: {error ?? 'Not found'}</Text>
          </View>
        );
      }

    // Karena menggunakan Expo Router, kita bisa mengkostumisasi header
    return (
        <ScrollView style={styles.container}>
            {/* 1. Kustomisasi Header (Gunakan Stack.Screen jika di Expo Router) */}
            {/* <Stack screenOptions={{ headerShown: true }}> */}
                <Stack.Screen
                    options={{
                        headerTitle: `${song.name}`,
                        headerStyle: { backgroundColor: '#fff' }, // Background abu-abu muda
                        headerTintColor: '#000', // Warna teks hitam
                        headerShadowVisible: false, // Hapus garis bawah header
                    }}
                />
            {/* </Stack> */}

            {/* 2. Song Header Card */}
            <View style={styles.headerCard}>
                <Image source={{ uri: song.img }} style={styles.albumArt} />
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>{song.name}</Text>
                    <Text style={styles.headerArtist}>{song.uNm}</Text>
                    <Text style={styles.headerPlaylist}>{song.pl?.name ?? 'Unkown Playlist'}</Text>
                    <Text style={styles.headerScore}>Score: {song.score}</Text>
                </View>
            </View>

            {/* YouTube Video Player */}
            <View style={styles.videoPlayerContainer}>
                {videoId ? (
                <YoutubePlayer
                    key={videoId}
                    height={200}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                    />
                ) : (
                    <Text style={styles.error}>Video ID tidak valid</Text>
                )}

                {/* Tombol Pause/Play */}
                <TouchableOpacity
                    style={styles.pauseButton}
                    onPress={togglePlaying}
                >
                    <Text style={styles.pauseButtonText}>
                    {playing ? "Pause" : "Play"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* 4. Song Information */}
            <View style={styles.infoSection}>
                <Text style={styles.infoSectionTitle}>Song Information</Text>
                <View style={styles.infoContent}>
                    <InfoRow title="Title" value={song.name} />
                    <InfoRow title="Artist" value={song.uNm} />
                    <InfoRow title="Playlist" value={song.pl?.name ?? 'Unkown Playlist'} />
                    <InfoRow title="Score" value={song.score ?? 'Undefined'} />
                    {/* Tambahkan InfoRow lainnya sesuai kebutuhan data Film/Song */}
                </View>
            </View>
        </ScrollView>
    );
}

// --- Stylesheet for InfoRow component ---
const infoRowStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    title: {
        fontWeight: '600',
        color: '#4b5563', // Warna abu-abu gelap
        marginRight: 5,
        minWidth: 80, // Agar judul sejajar
    },
    value: {
        flex: 1,
        color: '#1f2937', // Warna teks utama
    },
});
// ----------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb', // Background abu-abu muda
    },
    
    // --- 2. Song Header Card ---
    headerCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        alignItems: 'center',
    },
    albumArt: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
    },
    headerArtist: {
        fontSize: 14,
        color: '#4b5563',
        marginTop: 2,
    },
    headerPlaylist: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 2,
    },
    headerScore: {
        fontSize: 16,
        fontWeight: '600',
        color: '#10b981', // Hijau
        marginTop: 4,
    },

    // --- 3. Video Player ---
    videoPlayerContainer: {
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    videoPlaceholder: {
        width: '100%',
        height: 200, // Tinggi video placeholder
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Sedikit gelap di atas untuk teks
    },
    adTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    adText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        // Tambahan styling untuk ikon info kecil jika diperlukan
    },
    pauseButton: {
        width: '100%',
        backgroundColor: '#1f2937', // Warna gelap
        paddingVertical: 15,
        alignItems: 'center',
    },
    pauseButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    // --- 4. Song Information Section ---
    infoSection: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    infoSectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        color: '#1f2937',
    },
    infoContent: {
        // Konten info diatur oleh InfoRow
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    muted: { color: '#6B7280', marginTop: 8 },
    error: { color: '#ef4444', fontWeight: '600' },
});