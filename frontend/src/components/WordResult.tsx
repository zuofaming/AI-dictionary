import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, BookmarkPlus, BookmarkCheck, MessageCircle, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { speechService } from '../utils/speech';
import ChatDialog from './ChatDialog';
import toast from 'react-hot-toast';

const WordResult: React.FC = () => {
  const { currentEntry, targetLanguage, addToNotebook, isInNotebook } = useStore();
  const [showChat, setShowChat] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  if (!currentEntry) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <p className="text-gray-500">没有找到结果</p>
      </motion.div>
    );
  }

  const inNotebook = isInNotebook(currentEntry.id);

  const handleSpeak = async (text: string, index?: number) => {
    if (index !== undefined) setSpeakingIndex(index);

    try {
      await speechService.speak(text, targetLanguage);
    } catch (error) {
      console.error('Speech error:', error);
      toast.error('朗读失败，请检查浏览器设置');
    } finally {
      setSpeakingIndex(null);
    }
  };

  const handleSaveToNotebook = () => {
    addToNotebook(currentEntry);
    toast.success('已保存到笔记本！');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Word Header */}
        <div className="card">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-bold text-gray-800">
                  {currentEntry.word}
                </h2>
                <button
                  onClick={() => handleSpeak(currentEntry.word, -1)}
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors group"
                  title="发音"
                >
                  <Volume2
                    className={`w-6 h-6 ${
                      speakingIndex === -1
                        ? 'text-blue-600 animate-pulse'
                        : 'text-blue-500 group-hover:scale-110 transition-transform'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveToNotebook}
                disabled={inNotebook}
                className={`p-3 rounded-xl transition-all ${
                  inNotebook
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={inNotebook ? '已在笔记本中' : '保存到笔记本'}
              >
                {inNotebook ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <BookmarkPlus className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="p-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                title="开启对话"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">解释</h3>
            <p className="text-gray-800 leading-relaxed">{currentEntry.explanation}</p>
          </div>
        </div>

        {/* AI Generated Image */}
        {currentEntry.imageUrl && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📸 概念图</h3>
            <div className="rounded-xl overflow-hidden">
              <img
                src={currentEntry.imageUrl}
                alt={currentEntry.word}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Examples */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 例句</h3>
          <div className="space-y-4">
            {currentEntry.examples.map((example, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <button
                    onClick={() => handleSpeak(example.text, index)}
                    className="mt-1 p-1.5 rounded-full hover:bg-white transition-colors flex-shrink-0"
                  >
                    <Volume2
                      className={`w-4 h-4 ${
                        speakingIndex === index
                          ? 'text-blue-600 animate-pulse'
                          : 'text-blue-500'
                      }`}
                    />
                  </button>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-1">{example.text}</p>
                    <p className="text-gray-600 text-sm">{example.translation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card bg-gradient-to-br from-yellow-50 to-orange-50"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 用法说明</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentEntry.usage}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Chat Dialog */}
      {showChat && (
        <ChatDialog
          wordEntry={currentEntry}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default WordResult;
