// 语音合成工具类
export class SpeechService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();

    // 监听语音列表加载
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  // 根据语言代码获取最佳语音
  private getVoiceForLanguage(languageCode: string): SpeechSynthesisVoice | null {
    // 等待语音加载
    if (this.voices.length === 0) {
      this.loadVoices();
    }

    // 语言代码映射
    const langMap: Record<string, string[]> = {
      'en': ['en-US', 'en-GB', 'en'],
      'zh': ['zh-CN', 'zh-TW', 'zh'],
      'es': ['es-ES', 'es-MX', 'es'],
      'hi': ['hi-IN', 'hi'],
      'ar': ['ar-SA', 'ar'],
      'fr': ['fr-FR', 'fr'],
      'ru': ['ru-RU', 'ru'],
      'pt': ['pt-BR', 'pt-PT', 'pt'],
      'de': ['de-DE', 'de'],
      'ja': ['ja-JP', 'ja'],
    };

    const targetLangs = langMap[languageCode] || [languageCode];

    // 优先选择匹配的本地语音
    for (const targetLang of targetLangs) {
      const voice = this.voices.find(v =>
        v.lang.startsWith(targetLang) && v.localService
      );
      if (voice) return voice;
    }

    // 退而求其次，选择匹配的任何语音
    for (const targetLang of targetLangs) {
      const voice = this.voices.find(v => v.lang.startsWith(targetLang));
      if (voice) return voice;
    }

    return null;
  }

  // 朗读文本
  speak(text: string, languageCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // 停止当前朗读
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getVoiceForLanguage(languageCode);

      if (voice) {
        utterance.voice = voice;
      } else {
        // 如果没有找到匹配的语音，设置语言代码
        utterance.lang = languageCode;
      }

      utterance.rate = 0.9; // 稍微慢一点
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error);
        reject(error);
      };

      this.synth.speak(utterance);
    });
  }

  // 停止朗读
  stop() {
    this.synth.cancel();
  }

  // 暂停朗读
  pause() {
    this.synth.pause();
  }

  // 继续朗读
  resume() {
    this.synth.resume();
  }

  // 检查是否支持语音合成
  static isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

// 导出单例
export const speechService = new SpeechService();
