import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MovieCard from '@/src/components/MovieCard';
import { useRouter } from 'expo-router';
import { Film, getFilms } from '../../../src/api/data';
// import type { RootStackParamList } from '../../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'MovieList'>;

export default function MovieListScreen() {
    const router = useRouter()

  const [data, setData] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setError(null);
      const films = await getFilms();
      films.sort((a, b) => Number(b.rt_score) - Number(a.rt_score));
      setData(films);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading movies…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
        <Text style={styles.muted}>Pull to retry.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingVertical: 8 }}
      data={data}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <MovieCard
          film={item}
          onPress={() => router.push({pathname: "/movie/[id]", params: {id: item.id}})}
        />
      )}
      ListHeaderComponent={
        <Text style={styles.header}>Top Movies</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  muted: { color: '#6B7280', marginTop: 8 },
  error: { color: '#ef4444', fontWeight: '600' },
  header: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
