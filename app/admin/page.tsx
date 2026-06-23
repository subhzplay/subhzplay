export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">
        SubhZPlay Admin Dashboard
      </h1>

      <div className="bg-gray-900 p-6 rounded-xl max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          Upload Song
        </h2>

        <input
          type="text"
          placeholder="Song Name"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />

        <input
          type="text"
          placeholder="Artist Name"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />

        <input
          type="file"
          className="w-full p-3 mb-3 rounded bg-gray-800"
        />

        <button className="bg-blue-600 px-6 py-3 rounded-lg">
          Upload Song
        </button>
      </div>
    </div>
  );
}