
import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    try {
      const res = await axios.post('/api/generate', { title });
      setOutput(res.data.output);
    } catch (err) {
      console.error(err);
      setOutput('Error generating metadata.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fashion-meta-output.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportToAPI = () => {
    alert('Export to API feature coming soon.');
  };

  const theme = {
    container: darkMode ? 'bg-black text-white' : 'bg-white text-black',
    card: darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black',
    input: darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black',
    pre: darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-black'
  };

  return (
    <div className={`min-h-screen p-6 font-sans ${theme.container}`}>
      <Head>
        <title>Fashion MetaTag Generator</title>
      </Head>
      <div className={`max-w-xl mx-auto shadow-xl rounded-2xl p-6 ${theme.card}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img src="/logosamadjusted.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Fashion MetaTag Generator</h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="border px-3 py-1 rounded text-sm">
            {darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </button>
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 w-full" />
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mb-4 max-h-64 rounded" />}

        <input
          type="text"
          className={`w-full border p-2 mb-4 rounded ${theme.input}`}
          placeholder="Optional: Enter brand name or product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
          {output && (
            <>
              <button onClick={handleExport} className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                Export as Text
              </button>
              <button onClick={handleExportToAPI} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Export to API
              </button>
            </>
          )}
        </div>

        {output && <pre className={`whitespace-pre-wrap p-4 rounded border text-sm ${theme.pre}`}>{output}</pre>}
      </div>
    </div>
  );
}
