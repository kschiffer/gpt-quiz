import React, { useEffect, setState } from 'react';
import './chat-message.css';

function ChatMessage({ message, icon, withLoading, fullSize }) {
  const profileImage = `/mouse-${icon}.png`
  const hasIcon = Boolean(icon)

  return (
    <div className={`flex items-start ${fullSize ? 'w-full' : ''}`}>
        { hasIcon && (
            <img
                src={profileImage}
                alt={`${message.type} profile`}
                className="w-10 h-10 object-cover rounded-full mr-3"
            />
        )}
        {!hasIcon && (
            <div className="w-10 h-10 mr-3"></div>
        )}
      <div
        className={`chat-message ${message.type} ml-8 p-2 ${fullSize ? 'w-full' : ''} rounded-lg ${hasIcon ? 'pointer' : ''}`}
      >
        <p className="text-left">{message.content}</p>
        { withLoading && (
            <div class="typing mt-4">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;