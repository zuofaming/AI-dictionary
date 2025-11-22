import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { LANGUAGES } from '../utils/languages';
import { Globe, ArrowRight } from 'lucide-react';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setNativeLanguage, setTargetLanguage } = useStore();
  const [native, setNative] = useState('');
  const [target, setTarget] = useState('');

  const handleContinue = () => {
    if (native && target && native !== target) {
      setNativeLanguage(native);
      setTargetLanguage(target);
      navigate('/dictionary');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 zhuangzi-float">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Dictionary
          </h1>
          <p className="text-gray-600 text-lg">
            选择你的母语和目标语言，开始学习之旅
          </p>
        </motion.div>

        {/* Language Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Native Language */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              我的母语 🏠
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={`native-${lang.code}`}
                  onClick={() => setNative(lang.code)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    native === lang.code
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                  } ${target === lang.code ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={target === lang.code}
                >
                  <div className="text-3xl mb-2">{lang.flag}</div>
                  <div className="font-medium text-sm text-gray-800">
                    {lang.nativeName}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Target Language */}
          <motion.div variants={itemVariants} className="card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              学习语言 🎯
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={`target-${lang.code}`}
                  onClick={() => setTarget(lang.code)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    target === lang.code
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  } ${native === lang.code ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={native === lang.code}
                >
                  <div className="text-3xl mb-2">{lang.flag}</div>
                  <div className="font-medium text-sm text-gray-800">
                    {lang.nativeName}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div variants={itemVariants} className="text-center">
          <button
            onClick={handleContinue}
            disabled={!native || !target || native === target}
            className={`btn-primary inline-flex items-center gap-2 ${
              !native || !target || native === target
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            开始学习
            <ArrowRight className="w-5 h-5" />
          </button>
          {native === target && native && (
            <p className="text-red-500 mt-4 text-sm">
              母语和目标语言不能相同哦 😊
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LanguageSelection;
