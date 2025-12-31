import React, { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*_+~`:;?><,./-=";

    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, number, character]);

  const copyPasswordToClipboard = () => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-gray-500 rounded-lg">
      <h1 className="text-white text-center mb-4">Password Generator</h1>

      <div className="flex mb-4 bg-yellow-50">
        <input
          ref={passwordRef}
          value={password}
          readOnly
          className="w-full px-2"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-green-600 text-white px-3 py-1 hover:bg-green-700 transition">
          Copy
        </button>
      </div>

      <input
        type="range"
        min="8"
        max="20"
        value={length}
        onChange={(e) => {
          setLength(Number(e.target.value));
          passwordGenerator();
        }}
      />
      <p>Length: {length}</p>

   <div className="flex items-center gap-x-6">
  <label>
    <input
      type="checkbox"
      checked={number}
      onChange={() => {
        setNumber((p) => !p);
        passwordGenerator();
      }}
    />
    Numbers
  </label>

  <label>
    <input
      type="checkbox"
      checked={character}
      onChange={() => {
        setCharacter((p) => !p);
        passwordGenerator();
      }}
    />
    Symbols
  </label>
</div>


      <button
        onClick={passwordGenerator}
        className="block mt-4 bg-green-600 text-white px-4 py-1  hover:bg-green-700 transition"
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
