"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const [currentSong, setCurrentSong] = useState("No Song Playing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = async (song: string, title: string, index: number) => {
    if (!audioRef.current) return;

    audioRef.current.src = song;

    try {
      await audioRef.current.play();
      setCurrentSong(title);
      setCurrentIndex(index);
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentIndex + 1) % playlists.length;

    playSong(
      playlists[nextIndex].song,
      playlists[nextIndex].title,
      nextIndex
    );
  };

  const previousSong = () => {
    const prevIndex =
      currentIndex === 0
        ? playlists.length - 1
        : currentIndex - 1;

    playSong(
      playlists[prevIndex].song,
      playlists[prevIndex].title,
      prevIndex
    );
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  });

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
                playSong("/songs/demo.mp3", "Top Hits", 0)
              }
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
            >
              Start Listening
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
                    playSong(item.song, item.title, index)
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
            {isPlaying ? "Now Playing" : "Paused"}
          </p>
        </div>

        <div className="flex gap-4 text-2xl">
          <button onClick={previousSong}>⏮️</button>

          <button onClick={togglePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button onClick={nextSong}>⏭️</button>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = Number(
                  e.target.value
                );
              }
            }}
            className="w-40"
          />

          <p className="text-xs mt-1">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </p>
        </div>
      </div>

      <audio ref={audioRef} />
    </>
  );
}