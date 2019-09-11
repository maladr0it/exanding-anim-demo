interface Dims {
  height: number;
  width: number;
}

const NUM_STEPS = 100;

export const createKeyframes = (collapsedDims: Dims, expandedDims: Dims) => {
  const expandedWidthRatio = expandedDims.width / collapsedDims.width;
  const expandedHeightRatio = expandedDims.height / collapsedDims.height;

  const keyframes = [
    {
      transform: `scale(${1}, ${1})`
    },
    {
      transform: `scale(${expandedWidthRatio}, ${expandedHeightRatio})`
    }
  ];

  const inverseKeyframes = [];
  for (let step = 0; step <= NUM_STEPS; step++) {
    const progress = step / NUM_STEPS;

    const xScale = 1 + (expandedWidthRatio - 1) * progress;
    const yScale = 1 + (expandedHeightRatio - 1) * progress;
    const inverseXScale = 1 / xScale;
    const inverseYScale = 1 / yScale;

    inverseKeyframes.push({
      transform: `scale(${inverseXScale}, ${inverseYScale})`
    });
  }

  return {
    keyframes,
    inverseKeyframes
  };
};
