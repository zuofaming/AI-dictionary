import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, BookOpen, Sparkles, GraduationCap, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateStory } from '../services/api';
import toast from 'react-hot-toast';

const Notebook: React.FC = () => {
  const navigate = useNavigate();
  const { notebook, removeFromNotebook, nativeLanguage, targetLanguage, addStory } = useStore();
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  const handleGenerateStory = async () => {
    if (notebook.length < 3) {
      toast.error('至少需要 3 个词才能生成故事哦');
      return;
    }

    setIsGeneratingStory(true);
    try {
      const story = await generateStory({
        words: notebook.map((entry) => entry.word),
        targetLanguage,
        nativeLanguage,
      });
      setGeneratedStory(story.content);
      addStory(story);
      toast.success('故事生成成功！');
    } catch (error) {
      console.error('Story generation error:', error);
      toast.error('生成故事失败，请稍后重试');
    } finally {
      setIsGeneratingStory(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dictionary')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">我的笔记本</h1>
                <p className="text-xs text-gray-500">{notebook.length} 个词条</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="btn-primary flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              学习模式
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {notebook.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 zhuangzi-float">
              <BookOpen className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              笔记本还是空的
            </h3>
            <p className="text-gray-500 mb-6">
              去词典页面查询词语，然后保存到笔记本吧！
            </p>
            <button
              onClick={() => navigate('/dictionary')}
              className="btn-primary"
            >
              去查词
            </button>
          </motion.div>
        ) : (
          <>
            {/* Action Buttons */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 card"
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerateStory}
                  disabled={isGeneratingStory || notebook.length < 3}
                  className="btn-primary flex items-center gap-2"
                >
                  {isGeneratingStory ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      编故事
                    </>
                  )}
                </button>
                {notebook.length < 3 && (
                  <p className="text-sm text-gray-500 self-center">
                    至少需要 3 个词才能生成故事
                  </p>
                )}
              </div>
            </motion.div>

            {/* Generated Story */}
            <AnimatePresence>
              {generatedStory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 card bg-gradient-to-br from-purple-50 to-pink-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    AI 生成的故事
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {generatedStory}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Word List */}
            <div className="grid gap-4 md:grid-cols-2">
              <AnimatePresence>
                {notebook.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="card hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {entry.word}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {entry.explanation}
                        </p>
                        {entry.imageUrl && (
                          <img
                            src={entry.imageUrl}
                            alt={entry.word}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex flex-wrap gap-2">
                          {entry.examples.slice(0, 1).map((example, i) => (
                            <div
                              key={i}
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                            >
                              {example.text}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          removeFromNotebook(entry.id);
                          toast.success('已从笔记本移除');
                        }}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notebook;
