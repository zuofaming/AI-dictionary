import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { speechService } from '../utils/speech';
import toast from 'react-hot-toast';

const LearnMode: React.FC = () => {
  const navigate = useNavigate();
  const { notebook, targetLanguage } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledNotebook, setShuffledNotebook] = useState(notebook);

  useEffect(() => {
    // 洗牌
    const shuffled = [...notebook].sort(() => Math.random() - 0.5);
    setShuffledNotebook(shuffled);
  }, [notebook]);

  if (notebook.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCw className="w-12 h-12 text-purple-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            还没有学习内容
          </h3>
          <p className="text-gray-500 mb-6">
            先去笔记本添加一些词语吧！
          </p>
          <button
            onClick={() => navigate('/notebook')}
            className="btn-primary"
          >
            去笔记本
          </button>
        </div>
      </div>
    );
  }

  const currentCard = shuffledNotebook[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledNotebook.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) =>
      prev === 0 ? shuffledNotebook.length - 1 : prev - 1
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const shuffled = [...notebook].sort(() => Math.random() - 0.5);
    setShuffledNotebook(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    toast.success('已重新洗牌！');
  };

  const handleSpeak = async (text: string) => {
    try {
      await speechService.speak(text, targetLanguage);
    } catch (error) {
      console.error('Speech error:', error);
      toast.error('朗读失败');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/notebook')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">学习模式</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {shuffledNotebook.length}
              </span>
              <button
                onClick={handleShuffle}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCw className="w-4 h-4" />
                洗牌
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Flashcard Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentIndex + 1) / shuffledNotebook.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
              >
                <div className="flashcard-inner">
                  {/* Front */}
                  <div className="flashcard-front bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.word);
                      }}
                      className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <Volume2 className="w-6 h-6 text-white" />
                    </button>
                    <h2 className="text-5xl font-bold text-white mb-4">
                      {currentCard.word}
                    </h2>
                    {currentCard.imageUrl && (
                      <div className="w-48 h-48 rounded-xl overflow-hidden mt-4">
                        <img
                          src={currentCard.imageUrl}
                          alt={currentCard.word}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <p className="text-white/80 mt-6 text-sm">
                      点击查看解释 👆
                    </p>
                  </div>

                  {/* Back */}
                  <div className="flashcard-back bg-white">
                    <div className="h-full overflow-y-auto">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {currentCard.word}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            解释
                          </h4>
                          <p className="text-gray-700">
                            {currentCard.explanation}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            例句
                          </h4>
                          <div className="space-y-2">
                            {currentCard.examples.map((example, i) => (
                              <div
                                key={i}
                                className="text-sm bg-gray-50 p-2 rounded"
                              >
                                <p className="text-gray-800 font-medium">
                                  {example.text}
                                </p>
                                <p className="text-gray-600 mt-1">
                                  {example.translation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="btn-secondary flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              上一张
            </button>
            <button
              onClick={handleFlip}
              className="btn-primary flex items-center gap-2"
            >
              <RotateCw className="w-5 h-5" />
              翻转
            </button>
            <button
              onClick={handleNext}
              className="btn-secondary flex items-center gap-2"
            >
              下一张
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMode;
