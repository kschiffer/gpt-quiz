import React, { useState } from 'react';

function TextInput({ onSubmit, autoFocus, disabled, topic }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-input flex items-center justify-between p-2"
    >
      <div className="w-10 h-10 mr-3"></div>
      <input
        type="text"
        value={topic || inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Cheese, cats and dogs, ..."
        className="flex-1 mr-2 ml-6 py-4 text-2xl outline-0 ring-0"
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <button
        type="submit"
        className={`${disabled ? 'bg-gray-300' : 'bg-blue-500'} text-white px-4 py-2 rounded-lg`}
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}

export default TextInput;