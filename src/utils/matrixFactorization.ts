interface Rating {
  userId: string;
  productId: string;
  rating: number;
}

export const matrixFactorization = (
  matrix: number[][],
  numFactors: number = 10,
  iterations: number = 50,
  learningRate: number = 0.005,
  regularization: number = 0.02,
  ratings?: Rating[]
) => {
  // If ratings are provided, perform collaborative filtering
  if (ratings) {
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
          userFactors[f] +=
            learningRate *
            (error * productFactors[f] - regularization * userFactors[f]);
          productFactors[f] +=
            learningRate *
            (error * userFactors[f] - regularization * productFactors[f]);
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
  } else {
    // If no ratings are provided, use the similarity matrix directly
    // Extract product IDs (represented by indices in the matrix)
    const productIds = Array.from({ length: matrix.length }, (_, i) =>
      i.toString()
    );

    return {
      getSimilarProducts: (productId: string, n: number = 5) => {
        const productIndex = productIds.indexOf(productId);
        if (productIndex === -1) return [];

        // Get similarity scores for this product from the matrix
        const similarities = matrix[productIndex]
          .map((score, index) => ({
            productId: productIds[index],
            similarity: score,
          }))
          .filter((item) => item.productId !== productId) // Remove self
          .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
          .slice(0, n); // Take top n

        return similarities.map((item) => item.productId);
      },
    };
  }
};

const dotProduct = (a: number[], b: number[]) =>
  a.reduce((sum, val, i) => sum + val * b[i], 0);

const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = dotProduct(a, b);
  const normA = Math.sqrt(dotProduct(a, a));
  const normB = Math.sqrt(dotProduct(b, b));
  return dot / (normA * normB);
};
