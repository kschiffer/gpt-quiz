import React from 'react';

function OptionsInput({ key = 'default', options, onSelectOption, selectedOption, fullSize }) {
  return (
    <div className="options-input flex gap-2 w-full justify-start">
        <div className="w-10 h-10 mr-3"></div>
        <div className={`ml-6 flex gap-3 ${fullSize ? 'flex-col w-full' : ''}`}>
          {options.map((option, index) => (
            <button
              key={key + index}
              className={`button-choice px-4 py-2 rounded-lg hover:border-purple-600 transition-all ${option.className} ${selectedOption === option.value ? 'bg-purple-500 text-white' : Boolean(selectedOption) ? 'border-2 text-gray-200' : 'border-2 text-black'}`}
              onClick={() => onSelectOption(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
    </div>
  );
}

export default OptionsInput;