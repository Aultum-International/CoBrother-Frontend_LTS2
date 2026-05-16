/**
 * Opens Razorpay checkout using server-computed amountSmallest (do NOT multiply again).
 */
export function getRazorpayAmount(orderData) {
  if (orderData?.amountSmallest != null) {
    return Number(orderData.amountSmallest);
  }
  // Backward compatibility for older backends
  return Math.round(Number(orderData?.amount || 0) * 100);
}

export function buildRazorpayPrefill(user, orderData = {}) {
  const email =
    user?.email ||
    orderData.buyerEmail ||
    orderData.email ||
    '';
  const contact =
    user?.phoneNumber ||
    user?.phone ||
    orderData.buyerPhone ||
    '';
  return { email, contact };
}

export function openRazorpayCheckout({
  orderData,
  user,
  description,
  onSuccess,
  onFailure,
  onDismiss,
  themeColor = '#c8a96e',
}) {
  if (!window.Razorpay) {
    throw new Error('Razorpay SDK not loaded');
  }

  const options = {
    key: orderData.keyId,
    amount: getRazorpayAmount(orderData),
    currency: orderData.currency || 'INR',
    name: 'CoBrother',
    description,
    order_id: orderData.orderId,
    handler: onSuccess,
    prefill: buildRazorpayPrefill(user, orderData),
    modal: { ondismiss: onDismiss },
    theme: { color: themeColor },
  };

  const rzp = new window.Razorpay(options);
  if (onFailure) {
    rzp.on('payment.failed', onFailure);
  }
  rzp.open();
  return rzp;
}
