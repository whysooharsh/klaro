import { products } from '../data/products';

const calculateProductSimilarity = (product1, product2) => {
  if (!product1 || !product2) return 0;
  
  const commonTags = product1.tags?.filter(tag => product2.tags?.includes(tag)) || [];
  const categoryMatch = product1.category === product2.category ? 1 : 0;
  const priceRangeSimilarity = 1 - Math.abs((product1.price || 0) - (product2.price || 0)) / Math.max(product1.price || 1, product2.price || 1);
  
  return (commonTags.length * 0.4) + (categoryMatch * 0.3) + (priceRangeSimilarity * 0.3);
};

export const getSimilarProducts = (product, limit = 4) => {
  if (!product || !products) return [];
  
  const similarities = products
    .filter(p => p.id !== product.id)
    .map(p => ({
      ...p,
      similarity: calculateProductSimilarity(product, p)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  return similarities;
};

// User behavior tracking for personalization
const userBehaviorWeights = {
  view: 1,
  addToCart: 3,
  purchase: 5,
  addToWishlist: 2,
  timeSpent: 0.1 // per second
};

// Store user behavior data
let userPreferences = {
  categories: {},
  tags: {},
  priceRanges: {},
  styles: {}
};

export const updateUserPreferences = (product, action, duration = 0) => {
  if (!product) return;
  
  const weight = userBehaviorWeights[action] || 1;
 
  // Update category preference
  if (product.category) {
    userPreferences.categories[product.category] = 
      (userPreferences.categories[product.category] || 0) + weight;
  }
  
  // Update tag preferences
  if (product.tags) {
    product.tags.forEach(tag => {
      userPreferences.tags[tag] = (userPreferences.tags[tag] || 0) + weight;
    });
  }
  
  // Update price range preference
  const priceRange = getPriceRange(product.price);
  if (priceRange) {
    userPreferences.priceRanges[priceRange] = 
      (userPreferences.priceRanges[priceRange] || 0) + weight;
  }
  
  // Add time-based weight if provided
  if (duration > 0) {
    const timeWeight = duration * userBehaviorWeights.timeSpent;
    if (product.category) {
      userPreferences.categories[product.category] += timeWeight;
    }
    if (product.tags) {
      product.tags.forEach(tag => {
        userPreferences.tags[tag] += timeWeight;
      });
    }
  }
};

const getPriceRange = (price) => {
  if (!price) return 'unknown';
  if (price < 50) return 'budget';
  if (price < 100) return 'mid';
  return 'premium';
};

export const getPersonalizedRecommendations = (limit = 8) => {
  if (!products) return [];
  
  const scoredProducts = products.map(product => {
    let score = 0;
    
    // Add category preference score
    if (product.category) {
      score += userPreferences.categories[product.category] || 0;
    }
   
    // Add tag preference scores
    if (product.tags) {
      product.tags.forEach(tag => {
        score += userPreferences.tags[tag] || 0;
      });
    }
    
    // Add price range preference score
    const priceRange = getPriceRange(product.price);
    if (priceRange) {
      score += userPreferences.priceRanges[priceRange] || 0;
    }
    
    return { ...product, score };
  });
  
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getComplementaryProducts = (product, limit = 4) => {
  if (!product || !products) return [];
  
  const complementaryCategories = {
    'tops': ['bottoms', 'accessories'],
    'bottoms': ['tops', 'shoes'],
    'dresses': ['accessories', 'shoes'],
    'outerwear': ['tops', 'bottoms'],
    'accessories': ['dresses', 'tops', 'bottoms'],
    'shoes': ['bottoms', 'dresses']
  };
  
  const targetCategories = complementaryCategories[product.category?.toLowerCase()] || [];
  
  return products
    .filter(p => targetCategories.includes(p.category?.toLowerCase()))
    .map(p => ({
      ...p,
      matchScore: calculateProductSimilarity(product, p)
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

export const getTrendingProducts = (limit = 8) => {
  if (!products) return [];

  return products
    .map(product => ({
      ...product,
      trendScore: (
        (userPreferences.categories[product.category] || 0) +
        (product.tags?.reduce((sum, tag) => sum + (userPreferences.tags[tag] || 0), 0) || 0)
      ) * (Math.random() * 0.5 + 0.5) // Add some randomness for demo
    }))
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, limit);
};

export const getSizeRecommendation = (product, userProfile) => {
  if (!product || !userProfile) {
    return {
      recommendedSize: 'M',
      confidence: 0.7,
      fitNote: "Please provide your measurements for a more accurate recommendation.",
      sizingTips: [
        "If between sizes, size up for a more comfortable fit",
        "Check the size chart for exact measurements",
        "Consider your preferred fit (tight, regular, loose)"
      ]
    };
  }

  // In a real implementation, this would use machine learning based on:
  // 1. User's previous successful purchases
  // 2. Return history and reasons
  // 3. User's measurements
  // 4. Product specific fit data
  return {
    recommendedSize: userProfile?.preferredSize || 'M',
    confidence: 0.85,
    fitNote: "This item runs true to size. Order your usual size.",
    sizingTips: [
      "If between sizes, size up for a more comfortable fit",
      "This fabric has slight stretch",
      "Model is 5'9\" wearing size M"
    ]
  };
};

export const resetUserPreferences = () => {
  userPreferences = {
    categories: {},
    tags: {},
    priceRanges: {},
    styles: {}
  };
}; 