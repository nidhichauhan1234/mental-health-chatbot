import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Brain, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import BreathingModal from '../components/BreathingModal';

const ExercisesPage = () => {
  const [showBreathing, setShowBreathing] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [maxStepTime, setMaxStepTime] = useState(45);

  const exercises = [
    {
      id: 'breathing-4-4-6',
      title: '4-4-6 Breathing',
      description: 'Calm your nervous system with this simple breathing pattern',
      duration: '5 minutes',
      category: 'breathing',
      icon: <Heart className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Find a comfortable seated position with your back straight',
        'Place one hand on your chest, one on your belly',
        'Close your eyes and take a moment to settle in',
        'Inhale slowly through your nose for 4 counts',
        'Hold your breath gently for 4 counts',
        'Exhale slowly through your mouth for 6 counts',
        'Continue this rhythm, letting your body relax with each breath',
        'Notice how your breathing naturally becomes deeper and calmer',
        'When ready, take three normal breaths and gently open your eyes',
      ],
    },
    {
      id: 'grounding-5-4-3-2-1',
      title: '5-4-3-2-1 Grounding',
      description: 'Ground yourself in the present moment using your five senses',
      duration: '3-5 minutes',
      category: 'grounding',
      icon: <Leaf className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Take a few deep breaths and look around you',
        'Look around and name 5 things you can see in detail',
        'Notice and name 4 things you can physically touch',
        'Listen carefully and identify 3 different sounds you can hear',
        'Focus and name 2 things you can smell right now',
        'Notice and name 1 thing you can taste',
        'Take three more deep breaths and feel yourself grounded in this moment',
        'Notice how much more present and calm you feel now',
      ],
    },
    {
      id: 'body-scan',
      title: 'Progressive Body Scan',
      description: 'Release tension by mindfully scanning your entire body',
      duration: '10-15 minutes',
      category: 'mindfulness',
      icon: <Brain className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Lie down comfortably or sit in a supportive chair',
        'Close your eyes and take three slow, deep breaths',
        'Start at the top of your head, notice any sensations without judgment',
        'Slowly move your attention down to your forehead, eyes, and jaw',
        'Continue down through your neck and shoulders, releasing any tension',
        'Scan your arms, hands, and fingers, letting them feel heavy and relaxed',
        'Move through your chest and back, breathing into any tight areas',
        'Scan your stomach and lower back, allowing them to soften',
        'Move through your hips, thighs, and knees with gentle awareness',
        'Finish with your calves, ankles, and feet, feeling completely relaxed',
        'Take a moment to feel your whole body as one peaceful unit',
        'Slowly wiggle your fingers and toes, then gently open your eyes',
      ],
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Navy SEAL technique for stress management and focus',
      duration: '5-10 minutes',
      category: 'breathing',
      icon: <Heart className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Sit upright with feet flat on the floor and hands relaxed',
        'Exhale completely through your mouth to empty your lungs',
        'Inhale slowly through your nose for exactly 4 counts',
        'Hold your breath comfortably for 4 counts',
        'Exhale slowly through your mouth for 4 counts',
        "Hold empty (don't breathe) for 4 counts",
        'Continue this square pattern, maintaining steady rhythm',
        'Focus on the equal timing of each phase',
        'Complete 8-12 full cycles, then return to natural breathing',
      ],
    },
    {
      id: 'mindful-observation',
      title: 'Mindful Observation',
      description: 'Practice present-moment awareness by observing an object',
      duration: '5-10 minutes',
      category: 'mindfulness',
      icon: <Brain className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Choose a natural object like a flower, leaf, stone, or piece of fruit',
        'Hold it in your hands and really look at it as if seeing it for the first time',
        'Notice its colors, textures, patterns, and unique characteristics',
        'Feel its weight, temperature, and surface texture in your hands',
        'If it has a scent, breathe it in mindfully',
        'Observe without judging, labeling, or comparing to anything else',
        'When your mind wanders to thoughts, gently return focus to the object',
        'Spend a few moments appreciating this simple act of mindful attention',
        'End by setting the object down and taking three grateful breaths',
      ],
    },
    {
      id: 'loving-kindness',
      title: 'Loving-Kindness Practice',
      description: 'Cultivate compassion for yourself and others',
      duration: '10-15 minutes',
      category: 'mindfulness',
      icon: <Heart className="text-[#A78BFA] dark:text-[#C4B5FD]" size={24} />,
      steps: [
        'Sit comfortably and close your eyes, placing hands on your heart',
        'Begin with yourself: silently repeat "May I be happy and healthy"',
        'Continue: "May I be at peace and free from suffering"',
        'Feel genuine warmth and kindness toward yourself',
        'Think of someone you love deeply, visualize them clearly',
        'Send them the same wishes: "May you be happy and healthy"',
        'Think of a neutral person (acquaintance), extend the same loving kindness',
        'Think of someone difficult, try to send them peace and wellbeing',
        'Extend these wishes to all living beings everywhere',
        'Return to yourself and rest in this feeling of universal loving-kindness',
        "Take a moment to appreciate the love you've cultivated and shared",
      ],
    },
  ];

  const categoryColors = {
    breathing: 'bg-[#F5F3FF] dark:bg-[#2C2542] border-[#DDD6FE] dark:border-[#5B4F79]',
    mindfulness: 'bg-[#F3E8FF] dark:bg-[#3B305C] border-[#D8B4FE] dark:border-[#6B4AB1]',
    grounding: 'bg-[#EDE9FE] dark:bg-[#2C2542] border-[#C4B5FD] dark:border-[#6E56A6]',
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStepTimer(prev => {
        if (prev >= maxStepTime) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, maxStepTime]);

  useEffect(() => {
    if (stepTimer >= maxStepTime && isPlaying) {
      nextStep();
    }
  }, [stepTimer, maxStepTime, isPlaying]);

  const startExercise = (id) => {
    if (id === 'breathing-4-4-6' || id === 'box-breathing') {
      setShowBreathing(true);
      return;
    }
    setSelectedExercise(id);
    setCurrentStep(0);
    setStepTimer(0);
    setMaxStepTime(id === 'grounding-5-4-3-2-1' ? 30 : id === 'body-scan' ? 60 : 45);
  };

  const playExercise = () => setIsPlaying(true);
  const pauseExercise = () => setIsPlaying(false);
  const resetExercise = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setStepTimer(0);
  };
  const nextStep = () => {
    const exercise = exercises.find(e => e.id === selectedExercise);
    if (exercise && currentStep < exercise.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStepTimer(0);
    } else {
      setIsPlaying(false);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setStepTimer(0);
    }
  };
  const stopExercise = () => {
    setSelectedExercise(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setStepTimer(0);
  };

   return (
  <div className="min-h-screen bg-[#FDFCF9] dark:bg-[#1E1B2E] transition-colors duration-300">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2E2E2E] dark:text-[#EDE9FE] mb-4">Mindfulness Exercises</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Guided practices to help you find calm and clarity
        </p>
      </div>

      {selectedExercise ? (
        // paste the full Exercise Player JSX here
        <div>...</div>
      ) : (
        // Exercise Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exercises.map(exercise => (
            <div
              key={exercise.id}
              className={`${categoryColors[exercise.category]} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                  {exercise.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2E2E2E] dark:text-[#EDE9FE] mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {exercise.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-white dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 rounded-full shadow-sm">
                    {exercise.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={() => startExercise(exercise.id)}
                className="w-full bg-[#A78BFA] hover:bg-[#9333EA] dark:bg-[#C4B5FD] dark:hover:bg-[#A78BFA] text-white dark:text-[#1E1B2E] py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play size={18} />
                <span>Start Exercise</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    <BreathingModal isOpen={showBreathing} onClose={() => setShowBreathing(false)} />
  </div>
);

};

export default ExercisesPage;
