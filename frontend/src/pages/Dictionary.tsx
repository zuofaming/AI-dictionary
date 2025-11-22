import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, BookOpen, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { lookupWord } from '../services/api';
import WordResult from '../components/WordResult';
import { getLanguageName } from '../utils/languages';
import toast from 'react-hot-toast';

const Dictionary: React.FC = () => {
  const navigate = useNavigate();
  const { nativeLanguage, targetLanguage, setCurrentEntry, isLoading, setIsLoading } = useStore();
  const [searchText, setSearchText] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  if (!nativeLanguage || !targetLanguage) {
    navigate('/');
    return null;
  }

  const handleSearch = async () => {
    if (!searchText.trim()) {
      toast.error('请输入要查询的内容');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const entry = await lookupWord({
        text: searchText.trim(),
        targetLanguage,
        nativeLanguage,
      });
      setCurrentEntry(entry);
      toast.success('查询成功！');
    } catch (error) {
      console.error('Lookup error:', error);
      toast.error('查询失败，请稍后重试');
      setCurrentEntry(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AI Dictionary</h1>
                <p className="text-xs text-gray-500">
                  {getLanguageName(nativeLanguage, true)} → {getLanguageName(targetLanguage, true)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/notebook')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="我的笔记本"
              >
                <BookOpen className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="学习模式"
              >
                <GraduationCap className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="card">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入单词、短语或整句话..."
                className="input-field flex-1"
                disabled={isLoading}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading || !searchText.trim()}
                className="btn-primary px-8 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    查询中
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    查询
                  </>
                )}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">试试：</span>
              {['hello', 'beautiful', 'How are you?'].map((example) => (
                <button
                  key={example}
                  onClick={() => setSearchText(example)}
                  className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 zhuangzi-float">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <p className="text-gray-600">AI 正在分析中...</p>
              <div className="loading-dots mt-2 text-blue-500">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}

          {!isLoading && hasSearched && <WordResult />}

          {!isLoading && !hasSearched && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 zhuangzi-float">
                <Search className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                开始你的学习之旅
              </h3>
              <p className="text-gray-500">
                输入任何单词、短语或句子，让 AI 帮你深入理解
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dictionary;
