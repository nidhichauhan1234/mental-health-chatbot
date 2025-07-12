import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the YouMatter AI chatbot support mental health?",
      answer: "YouMatter uses AI to offer supportive, non-judgmental conversations tailored to how you're feeling. Whether you just want a friendly chat, need someone to listen, or want guidance, our chatbot is designed to understand and respond in real time—day or night. While it's not a therapist, it's here to help you reflect, feel heard, and find calming strategies when you need them most."
    },
    {
      question: "Can the chatbot replace a licensed therapist?",
      answer: "No. YouMatter is not a substitute for therapy or clinical care. While it's designed using emotional support principles like CBT (Cognitive Behavioral Therapy) and active listening, it doesn't offer medical advice or diagnoses. Think of it as a companion to help between therapy sessions, or when human support isn't immediately available."
    },
    {
      question: "Does the chatbot diagnose mental health conditions?",
      answer: "No, YouMatter does not diagnose any mental health disorders. It simply offers conversation, reflection prompts, and emotional wellness tips based on your inputs. For any clinical concerns or emergencies, we strongly recommend reaching out to mental health professionals or crisis helplines."
    },
    {
      question: "What mental health challenges can YouMatter help with?",
      answer: "Our AI chatbot supports emotional wellness in areas like anxiety, overthinking, loneliness, motivation, stress, self-talk, and burnout. It can also guide you through breathing exercises, mood tracking, and simple calming techniques."
    },
    {
      question: "Is my personal data safe and private?",
      answer: "Yes. YouMatter prioritizes your privacy and emotional safety. We do not store any personally identifiable information unless you choose to create an account or journal entries. All data exchanged is handled securely, and anonymous usage is always available."
    },
    {
      question: "Can I use YouMatter when I just want someone to talk to?",
      answer: "Absolutely. YouMatter isn't just for when you're feeling low. Sometimes we just need a kind voice or a thoughtful chat. That's why we've included three modes—Friend, Listener, and Advice—so you can talk to the chatbot in a way that fits your mood."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <footer className="bg-[#FDFCF9] dark:bg-[#1E1B2E] border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#EDE9FE] mb-6">About YouMatter</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
        At YouMatter, we believe that every thought, feeling, and moment you experience deserves to be heard—without judgment.

This platform was created to support you through the ups and downs of life, whether you're feeling overwhelmed, simply need a friend to talk to, or want gentle guidance when everything feels too much. Our AI-powered chatbot is built to be a safe space—always available, emotionally aware, and respectful of your privacy.

Unlike traditional therapy apps, YouMatter is not here to replace human connection, but to offer meaningful support in the in-between moments. It's a companion for those late nights, quiet mornings, and everything in between. 🌙✨

Whether you're talking, listening, breathing, or just reading—you are never alone here.

Because at YouMatter, you truly do matter.
            </p>
            <div className="text-center lg:text-left">
              <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center lg:justify-start space-x-2">
                <span>Made with</span>
                <Heart size={20} className="text-[#A78BFA] dark:text-[#C4B5FD] fill-current animate-pulse" />
                <span>for your peace</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#EDE9FE] mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-4 text-left bg-white dark:bg-[#2C2542] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-[#2E2E2E] dark:text-[#EDE9FE] pr-4">
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <ChevronUp size={20} className="text-[#A78BFA] dark:text-[#C4B5FD] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-[#A78BFA] dark:text-[#C4B5FD] flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;