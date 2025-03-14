interface Rating {
  userId: string;
  productId: string;
  rating: number;
}

export const matrixFactorization = (
  ratings: Rating[],
  numFactors: number = 10,
  learningRate: number = 0.005,
  iterations: number = 50
) => {
  // Create user-product rating matrix
  const users = Array.from(new Set(ratings.map((r) => r.userId)));
  const products = Array.from(new Set(ratings.map((r) => r.productId)));

  // Initialize user and product feature matrices randomly
  const userFeatures = new Map(
    users.map((u) => [
      u,
      Array(numFactors)
        .fill(0)
        .map(() => Math.random()),
    ])
  );
  const productFeatures = new Map(
    products.map((p) => [
      p,
      Array(numFactors)
        .fill(0)
        .map(() => Math.random()),
    ])
  );

  // Training
  for (let iter = 0; iter < iterations; iter++) {
    for (const { userId, productId, rating } of ratings) {
      const userFactors = userFeatures.get(userId)!;
      const productFactors = productFeatures.get(productId)!;

      // Calculate prediction error
      const prediction = dotProduct(userFactors, productFactors);
      const error = rating - prediction;

      // Update features
      for (let f = 0; f < numFactors; f++) {
        userFactors[f] += learningRate * (error * productFactors[f]);
        productFactors[f] += learningRate * (error * userFactors[f]);
      }
    }
  }

  return {
    getSimilarProducts: (productId: string, n: number = 5) => {
      const targetFeatures = productFeatures.get(productId);
      if (!targetFeatures) return [];

      const similarities = Array.from(productFeatures.entries())
        .filter(([id]) => id !== productId)
        .map(([id, features]) => ({
          productId: id,
          similarity: cosineSimilarity(targetFeatures, features),
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, n);

      return similarities.map((s) => s.productId);
    },
  };
};

const dotProduct = (a: number[], b: number[]) =>
  a.reduce((sum, val, i) => sum + val * b[i], 0);

const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = dotProduct(a, b);
  const normA = Math.sqrt(dotProduct(a, a));
  const normB = Math.sqrt(dotProduct(b, b));
  return dot / (normA * normB);
};
