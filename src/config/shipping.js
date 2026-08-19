export const shippingEstimates = {
  westMalaysia: 7.5,
  eastMalaysia: 15,
}

export function formatShippingAmount(amount) {
  return `RM${amount.toFixed(2)}`
}

export function getShippingEstimateText(language) {
  const west = formatShippingAmount(shippingEstimates.westMalaysia)
  const east = formatShippingAmount(shippingEstimates.eastMalaysia)

  if (language === 'zh') {
    return `预计：西马 ${west} / 东马 ${east}`
  }

  return `Estimated: West Malaysia ${west} / East Malaysia ${east}`
}