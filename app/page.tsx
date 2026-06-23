"use client";

import { useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentSong, setCurrentSong] = useState("No Song Playing");
  const [isPlaying, setIsPlaying] = useState(false);

  const playlists = [
    {
      title: "Top Hits",
      image: "https://picsum.photos/300?1",
      song: "/songs/demo.mp3",
    },
    {
      title: "Chill Vibes",
      image: "https://picsum.photos/300?2",
      song: "/songs/chill.mp3",
    },
    {
      title: "Workout Mix",
      image: "https://picsum.photos/300?3",
      song: "/songs/workout.mp3",
    },
    {
      title: "Romantic",
      image: "https://picsum.photos/300?4",
      song: "/songs/romantic.mp3",
    },
  ];

  const playTrack = async (song: string, title: string) => {
    if (!audioRef.current) return;

    audioRef.current.src = song;

    try {
      await audioRef.current.play();
      setCurrentSong(title);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white flex pb-24">
        <aside className="w-64 bg-[#0A192F] p-6">
          <img
            src="/logo.png"
            alt="SubhZPlay Logo"
            className="w-40 mb-6"
          />

          <ul className="mt-10 space-y-4">
            <li>🏠 Home</li>
            <li>🔍 Search</li>
            <li>🎵 Library</li>
            <li>❤️ Favorites</li>
          </ul>
        </aside>

        <section className="flex-1 p-8">
          <div className="bg-gradient-to-r from-blue-900 to-black rounded-2xl p-8 mb-8">
            <h1 className="text-5xl font-bold">
              Welcome to SubhZPlay
            </h1>

            <p className="mt-4 text-gray-300">
              Stream your favorite music anytime, anywhere.
            </p>

            <button
              onClick={() =>
                playTrack("/songs/demo.mp3", "Demo Song")
              }
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
            >
              Play Featured Song
            </button>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg mb-4"
                />

                <h3 className="font-bold">{item.title}</h3>

                <button
                  onClick={() =>
                    playTrack(item.song, item.title)
                  }
                  className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0A192F] border-t border-gray-800 h-20 flex items-center justify-between px-6 text-white">
        <div>
          <p className="font-bold">{currentSong}</p>
          <p className="text-sm text-gray-400">
            {currentSong === "No Song Playing"
              ? "Select a track"
              : "Now Playing"}
          </p>
        </div>

        <div className="flex gap-4 text-2xl">
          <button>⏮️</button>

          <button onClick={togglePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button>⏭️</button>
        </div>

        <input type="range" className="w-40" />
      </div>

      <audio ref={audioRef} />
    </>
  );
}