import React, { useState } from 'react';
import { fetchChatbotResponse } from '../apis/chatService';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleSendMessage = async () => {
    if (!userMessage) return;

    setLoading(true);
    setChatHistory((prev) => [...prev, `You: ${userMessage}`]);

    try {
      const botMessage = await fetchChatbotResponse(userMessage);
      setChatHistory((prev) => [...prev, `Bot: ${botMessage}`]);
      setUserMessage('');
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        'Error: 챗봇 응답을 가져오지 못했습니다.',
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true); // 모달 열기
  const closeModal = () => setIsModalOpen(false); // 모달 닫기

  return (
    <div>
      {/* 아이콘을 클릭하면 모달을 여는 버튼 */}
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        <i className="fas fa-comment-alt">
          <img style={{ width: '50px' }} src="icons/chatbot.svg"></img>
        </i>{' '}
        {/* 여기 아이콘을 넣을 수 있습니다. */}
      </button>

      {/* 모달이 열릴 때만 보이도록 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-h-86 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">AI 헬스 챗봇</h2>
            <div className="chat-history bg-white p-4 mb-4 rounded-lg h-64 overflow-y-scroll">
              {chatHistory.map((msg, index) => (
                <p key={index} className="mb-2">
                  {msg}
                </p>
              ))}
            </div>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="w-full border p-2 rounded mb-4"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Send'}
            </button>

            {/* 모달 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="mt-4 text-red-500 w-full py-2 rounded bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
