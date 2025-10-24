export interface Question {
  id: string;
  question: string;
  type: 'select' | 'multiselect' | 'text' | 'number';
  options?: string[];
  placeholder?: string;
}

export interface CategoryQuestionnaire {
  category: string;
  icon: string;
  description: string;
  questions: Question[];
}

export const questionnaires: CategoryQuestionnaire[] = [
  {
    category: 'Health Supplements',
    icon: '💊',
    description: 'Personalized vitamin and supplement recommendations',
    questions: [
      {
        id: 'age',
        question: 'What is your age range?',
        type: 'select',
        options: ['18-25', '26-35', '36-45', '46-55', '56+']
      },
      {
        id: 'gender',
        question: 'What is your gender?',
        type: 'select',
        options: ['Male', 'Female', 'Other', 'Prefer not to say']
      },
      {
        id: 'health_goals',
        question: 'What are your primary health goals?',
        type: 'select',
        options: [
          'Weight Management',
          'Energy & Vitality',
          'Immune Support',
          'Better Sleep',
          'Stress Management',
          'Joint Health',
          'Heart Health',
          'Other'
        ]
      },
      {
        id: 'dietary_restrictions',
        question: 'Do you have any dietary restrictions?',
        type: 'select',
        options: [
          'None',
          'Vegetarian',
          'Vegan',
          'Gluten-Free',
          'Dairy-Free',
          'Kosher',
          'Halal',
          'Other'
        ]
      },
      {
        id: 'current_supplements',
        question: 'Are you currently taking any supplements? (Please list)',
        type: 'text',
        placeholder: 'e.g., Vitamin D, Omega-3...'
      },
      {
        id: 'health_concerns',
        question: 'Any specific health concerns?',
        type: 'text',
        placeholder: 'Optional: List any health issues or concerns...'
      },
      {
        id: 'activity_level',
        question: 'How would you describe your activity level?',
        type: 'select',
        options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extremely active']
      },
      {
        id: 'sleep_quality',
        question: 'How would you rate your sleep quality?',
        type: 'select',
        options: ['Poor', 'Fair', 'Good', 'Excellent']
      }
    ]
  },
  {
    category: 'Skincare',
    icon: '✨',
    description: 'Customized skincare routine for your skin type',
    questions: [
      {
        id: 'age',
        question: 'What is your age range?',
        type: 'select',
        options: ['Under 18', '18-25', '26-35', '36-45', '46-55', '56+']
      },
      {
        id: 'gender',
        question: 'What is your gender?',
        type: 'select',
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
      },
      {
        id: 'skin_type',
        question: 'What is your skin type?',
        type: 'select',
        options: ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'Not sure']
      },
      {
        id: 'skin_concerns',
        question: 'What are your primary skin concerns?',
        type: 'multiselect',
        options: [
          'Acne',
          'Fine lines & wrinkles',
          'Dark spots',
          'Dullness',
          'Large pores',
          'Redness',
          'Uneven texture',
          'Dehydration'
        ]
      },
      {
        id: 'current_routine',
        question: 'What does your current skincare routine include?',
        type: 'multiselect',
        options: ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Exfoliator', 'Eye cream', 'None']
      },
      {
        id: 'allergies',
        question: 'Do you have any known skincare allergies or sensitivities?',
        type: 'text',
        placeholder: 'e.g., Fragrance, retinol, alcohol...'
      },
      {
        id: 'climate',
        question: 'What type of climate do you live in?',
        type: 'select',
        options: ['Humid', 'Dry', 'Temperate', 'Cold', 'Hot']
      },
      {
        id: 'sun_exposure',
        question: 'How much sun exposure do you get daily?',
        type: 'select',
        options: ['Minimal (indoor)', 'Moderate', 'High (outdoor work/activities)']
      }
    ]
  },
  {
    category: 'Haircare',
    icon: '💇',
    description: 'Tailored haircare products for healthy hair',
    questions: [
      {
        id: 'hair_type',
        question: 'What is your hair type?',
        type: 'select',
        options: ['Straight', 'Wavy', 'Curly', 'Coily/Kinky']
      },
      {
        id: 'hair_texture',
        question: 'What is your hair texture?',
        type: 'select',
        options: ['Fine', 'Medium', 'Thick']
      },
      {
        id: 'scalp_type',
        question: 'How would you describe your scalp?',
        type: 'select',
        options: ['Dry', 'Oily', 'Normal', 'Sensitive', 'Dandruff-prone']
      },
      {
        id: 'hair_concerns',
        question: 'What are your main hair concerns?',
        type: 'multiselect',
        options: [
          'Damage/breakage',
          'Frizz',
          'Thinning/hair loss',
          'Dryness',
          'Lack of volume',
          'Split ends',
          'Color fading',
          'Dullness'
        ]
      },
      {
        id: 'chemical_treatments',
        question: 'Have you had any chemical treatments?',
        type: 'multiselect',
        options: ['Hair color', 'Highlights', 'Perm', 'Keratin treatment', 'Relaxer', 'None']
      },
      {
        id: 'styling_routine',
        question: 'What styling tools do you use regularly?',
        type: 'multiselect',
        options: ['Hair dryer', 'Flat iron', 'Curling iron', 'None']
      },
      {
        id: 'wash_frequency',
        question: 'How often do you wash your hair?',
        type: 'select',
        options: ['Daily', 'Every other day', '2-3 times a week', 'Once a week', 'Less than once a week']
      },
      {
        id: 'hair_goals',
        question: 'What are your hair goals?',
        type: 'multiselect',
        options: [
          'Repair damage',
          'Add moisture',
          'Increase volume',
          'Enhance shine',
          'Promote growth',
          'Control frizz',
          'Maintain color'
        ]
      }
    ]
  }
];